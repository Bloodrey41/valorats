import { invoke } from '@tauri-apps/api'
import React, { useEffect, useState } from 'react'
import Filters from './components/filters'
import Table from './components/table'
import useEventStore from './hooks/use-event-store'
import { IData } from './models'

const Main: React.FC = () => {
    const { selectedEvent, setSelectedEvent } = useEventStore(state => state)

    const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedEvent(e.target.value)

    return (
	<div className='bg-neutral-500 rounded m-5 p-4'>
	    <h1 className='uppercase text-center text-2xl text-red-700'>Valorant stats</h1>
	    <hr className='m-2.5 border border-solid border-neutral-600' />
	    <input
		onChange={handleEventChange}
		value={selectedEvent}
		type='url'
		className='m-2.5 p-3 rounded bg-neutral-400 border-2 border-solid border-neutral-400 text-lg text-red-600 w-[calc(100%-50px)]'
		placeholder='thespike.gg event stats URL'
	    />
	    <Content />
	</div>
    )
}

export default Main

const Content: React.FC = () => {
    const data = useData()

    if (!data)
	return <>Loading...</>

    const maps = Object.keys(data[0].maps).map(map => map)

    const agents = data.map(row => row.agent.name)
    console.log(data)

    return (
	<>
	    <Filters
		maps={maps}
		agents={agents}
	    />
	    <hr />
	    <Table
		data={data}
		headers={maps}
	    />
	</>
    )
}

const useData = () => {
    const { selectedEvent } = useEventStore(state => state)

    const [data, setData] = useState<Array<IData> | null>(null)

    useEffect(() => {
	const getData = async () => {
	    const data = await invoke<Array<IData>>('get_data', { url: selectedEvent })
	    return data
	}
	getData().then(data => setData(data))
    }, [selectedEvent])

    return data
}
