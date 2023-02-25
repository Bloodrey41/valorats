import { useMemo } from 'react'
import useMapStore from '../../hooks/use-map-store'
import useAgentStore from '../../hooks/use-agent-store'
import useRoleStore from '../../hooks/use-role-store'

const ROLES = ['Controller', 'Initiator', 'Duelist', 'Sentinel']

type Props = {
    maps: Array<string>
    agents: Array<string>
}

const Filters: React.FC<Props> = ({ maps, agents }) => {
    const { selectedMap, setSelectedMap } = useMapStore(state => state)
    const { selectedAgent, setSelectedAgent } = useAgentStore(state => state)
    const { selectedRole, setSelectedRole } = useRoleStore(state => state)

    const selectsWidth = useMemo(() => selectedAgent ? 50 : 33.3, [selectedAgent])

    const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMap(e.target.value)

    const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAgent(e.target.value)

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRole(e.target.value)

    return (
	<div className='filters'>
	    {/*@ts-ignore*/}
	    <Select onChange={handleMapChange}
		value={selectedMap}
		label='Map'
		options={maps}
		width={selectsWidth}
	    />
	    {/*@ts-ignore*/}
	    {!selectedAgent ? <Select onChange={handleRoleChange}
		value={selectedRole}
		label='Role'
		options={ROLES}
		width={selectsWidth}
	    /> : null}
	    {/*@ts-ignore*/}
	    <Select onChange={handleAgentChange}
		value={selectedAgent} 
		label='Agent' 
		options={agents} 
		width={selectsWidth}
	    />
	</div>
    )
}

export default Filters

type SelectProps = {
    label: string
    options: string[]
    width: number
}

const Select: React.FC<SelectProps> = ({ label, width, options, ...props }) => {
    console.log(width)
    return (
	<select 
	    className='p-3 m-2.5 bg-neutral-600 border-2 border-solid border-neutral-600 rounded text-base text-red-600' 
	    style={{ width: `calc(${width}% - 20px)` }} 
	    {...props}
	>
	    <option value=''>{label}</option>
	    {options.map(option => (
		<option key={option} value={option}>
		    {option.charAt(0).toUpperCase() + option.slice(1)}
		</option>
	    ))}
	</select>
    )
}
