import useMapStore from '../../hooks/use-map-store'
import useAgentStore from '../../hooks/use-agent-store'
import useRoleStore from '../../hooks/use-role-store'
import { IData } from '../../models'

type Props = {
    data: Array<IData>
    headers: Array<string>
}

const Table: React.FC<Props> = ({ data, headers }) => {
    const { selectedMap } = useMapStore(state => state)
    const { selectedAgent } = useAgentStore(state => state)
    const { selectedRole } = useRoleStore(state => state)

    const sort = (a: IData, b: IData) => {
	const key = selectedMap ? selectedMap : 'all'

	const aValue = Number(a.maps[key])

	const bValue = Number(b.maps[key])

	if (aValue > bValue) return -1

	if (aValue < bValue) return 1

	return 0
    }

    return (
	<table className='w-[calc(100%-20px)] m-2.5'>
	    <thead className='capitalize'>
		<tr>
		    <th className='border border-solid border border-neutral-500 p-2.5 m-0 text-center'>Agent</th>
		    {headers.filter(h => h.includes(selectedMap)).map(header => (
			<th key={header} className='border border-solid border border-neutral-500 p-2.5 m-0 text-center'>
			    {header}
			</th>
		    ))}
		</tr>
	    </thead>
	    <tbody>
		{data
		    .filter(r => selectedAgent ? r.agent.name.includes(selectedAgent) : r.agent.role.includes(selectedRole))
		    .sort(sort)
		    .map(row => (
		    <tr key={row.agent.name}>
			<td className='border border-solid border border-neutral-500 p-2.5 m-0 text-center'>
			    {/*
			      *<img 
			      *    src={row.agent.picture}
			      *    alt={row.agent.name}
			      *    className='border border-solid border-neutral-500 rounded-full w-11 h-11'
			      *>
			      */}
			    {row.agent.name}
			</td>
			{headers.filter(h => h.includes(selectedMap)).map(header => (
			    <td key={row.agent.name + header} className='border border-solid border border-neutral-500 p-2.5 m-0 text-center'>
				{row.maps[(header)]}%
				</td>
			))}
		    </tr>
		))}
	    </tbody>
	</table>
    )
}

export default Table
