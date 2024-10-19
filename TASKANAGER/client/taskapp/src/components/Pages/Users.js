import React, { useState ,useEffect} from 'react'
import useAuth from '../../hooks/useAuth'
import useAI2 from '../../hooks/useAI2'
import { NavLink } from 'react-router-dom'

const Users = () => {

 const auth = useAuth()
 const AI2 = useAI2()
 const [users,setUsers] = useState([])

 async function getUsersData(){
    try {
        const res = await AI2.get('/users/')
        if( res.status == 200 ){
            setUsers( res.data )
        }
    } catch(e) {
        console.log(e)
    }
}
useEffect( ()=>{ getUsersData() } , [] )

  return (

    <div className="p-3 mt-2">
 
			<div className="p-2">
			
				<table className="table table-bordered table-striped text-center">	
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5">Users</th>
						</tr>
						<tr key='row-2'>
							<th>id</th>
							<th>Username</th>
							<th>Email</th>
							<th>is_active</th>
							<th>is_admin</th>
							<th>FirstName</th>
							<th>LastName</th>
							<th>date_joined</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map( e =>
								<tr key={e.id}>
									<td>{e.id}</td>
									<td>{e.username}</td>
									<td>{e.email}</td>
									<td>{e.is_active? <i class="bi bi-check-circle-fill"></i> :  <i class="bi bi-x-circle-fill"></i> }</td>
									<td>{e.is_superuser? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i> }</td>
									<td>{e?.first_name ? e.first_name : '-'}</td>
									<td>{e?.last_name ? e.last_name : '-'}</td>
									<td>{e.date_joined}</td>
									<td>
										{ (auth.user.role==="manager" || auth.user.role==="team_leader") ?
										<NavLink to={`/user/tasks/${e.id}/`}>Tasks</NavLink> : null
										}
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
				
			</div>
		</div>
  )
}

export default Users