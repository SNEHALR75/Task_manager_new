import React, { useState ,useEffect} from 'react'
import Person from "../../node_modules/bootstrap-icons/icons/person.svg"
import useAuth from '../hooks/useAuth'
import useAI2 from '../hooks/useAI2'

const Tasks = () => {

    const auth = useAuth()
    const AI2 = useAI2()
    const [tasks,setTasks] = useState([])

    async function getTasksData(){
		try {
			let task_url = (auth.user.role==='manager'||auth.user.role==='team_leader') ? '/tasks/' : '/tasks/assigned/'
			const res = await AI2.get( task_url )
			if( res.status == 200 ){
				console.log(res)
				setTasks( res.data )
			}
		} catch(e) {
			console.log(e)
		}
	}

    async function deleteTasksData(id){
		if ( window.confirm(`Do you wants to delete ${id} record ?`) ){
			try {
				const res = await AI2.delete(`/tasks/delete/${id}/`)
				if( res.status == 204 ){
					console.log('deleted')
					await getTasksData()
				}
			} catch(e) {
				console.log(e)
				alert("Something went wrong.!")
			}
		}
	}

    async function updateTasksData(event,id){
		let task_status = event.target.value
		try {
			const res = await AI2.patch(`/tasks/update/${id}/`,{ task_status:task_status })
			if( res.status == 200 ){
				console.log('updated')
				await getTasksData()
				event.target.value = ``
			}
		} catch(e) {
			console.log(e)
			alert("Something went wrong.!")
		}
	}

    useEffect( ()=>{ getTasksData() } , [] )

  return (
    <div className="p-3 mt-2">
			<div className="p-2">
				<table className="table table-bordered table-striped text-center">	
					<thead>
						<tr className="table-secondary" key="row-1">
							<th colSpan="9" className="text-center fs-5">Tasks</th>
						</tr>
						<tr key='row-2'>
							<th>task_name</th>
							<th>task_description</th>
							<th>task_assigned_by</th>
							<th>task_assigned_to</th>
							<th>task_assigned_date</th>
							<th>task_status</th>
							<th>task_completed_date</th>
							<th>task_deadline</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>

						{
							tasks.map( e =>
								<tr key={e.id} style={{verticalAlign:'middle'}}>
									<td>{e.task_name}</td>
									<td>{e.task_description}</td>
									<td>
										<img src={
											e.task_assigned_by.profile_pic ? `http://127.0.0.1:8000${e.task_assigned_by.profile_pic}` : Person
										} className="profile-icon me-1"
										style={{width: '50px',height: '50px',
											objectFit: 'cover',
											   objectPosition: 'center',borderRadius:'180px'
										}}
										/>
										{e.task_assigned_by.username}
									</td>
									<td>
										<img src={
											e.task_assigned_to.profile_pic ? `http://127.0.0.1:8000${e.task_assigned_to.profile_pic}` : Person
										} className="profile-icon me-1"
										style={{width: '50px',height: '50px',
											objectFit: 'cover',
											   objectPosition: 'center',borderRadius:'180px'
										}}
										/>
										{e.task_assigned_to.username}
									</td>
									<td>{e.task_assigned_date}</td>
									<td>{e.task_status}</td>
									<td>{e.task_completed_date}</td>
									<td>{e.task_deadline}</td>
									<td>
										
										{
											(auth.loggedIn && auth.user.username===e.task_assigned_to.username) ?
												<select className="form-select text-info" onChange={(event)=>{ updateTasksData( event,e.id ) }}>
													<option value="" selected>--select--</option>
													<option disabled >pending</option>
													<option disabled={ (e.task_status==='in_progress'||e.task_status==='completed')? true : false }>in_progress</option>
													<option disabled={ e.task_status==='completed'? true : false }>completed</option>
												</select>
											: null									

										}


										{
											(auth.loggedIn && auth.user.role==='manager') ?
											<button className="btn btn-outline-danger ms-2"
											 onClick={ ()=>{deleteTasksData( e.id )} } type='button'>
											 	Delete
											</button>
											: null
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

export default Tasks