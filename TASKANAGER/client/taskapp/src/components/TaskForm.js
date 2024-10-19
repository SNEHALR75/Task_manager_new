import React, { useState ,useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import useAI2 from '../hooks/useAI2'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const TaskForm = () => {

    const auth = useAuth()
    const AI2 = useAI2()
    const nav = useNavigate()
    const [usersData,setUsersData] = useState([])
    const {register,handleSubmit} = useForm()

	async function saveTasksData(data){
		try {
			const res = await AI2.post('/tasks/',data)
			if( res.status == 201 ){
				nav('/tasks/')
			}
		}
		catch(e) {
			console.log(e)
			alert("Something went wrong.!")
		}
	}

	async function getUsersData(){
		try {
			const res = await AI2.get('/users/developers/')
			if( res.status == 200 ){
				setUsersData( res.data )
			}
		} catch(e) {
			console.log(e)
		}
	}

	useEffect( ()=>{ getUsersData() } , [] )


  return (

<div className="p-3 mt-2 w-50 mx-auto p-4 ps-5 pe-5 rounded" style={{width:'40%',background:'rgb(206, 216, 222)'}}>	
			<h4 className="text-center mb-3">Task Form</h4>
			<form onSubmit={handleSubmit(saveTasksData)}  class="row g-3" >
			  <div class="col-md-8">
			    <label for="inputTaskName" class="form-label">task</label>
			    <input type="text" class="form-control" {...register('task_name')} id="inputTaskName" required/>
			  </div>

			  <div class="col-md-4">
			    <label for="inputAssignee" class="form-label">assignee</label>
			    <select class="form-select" {...register('task_assigned_to')} id="inputAssignee" required>
			    	<option value={``}> click to select.. </option>
			    	{
			    		usersData.map( e =>
								<option value={e.id}> {e.username} </option>

			    		)
			    	}
			    </select>
			  </div>
			  
			  <div class="col-md-12">
			    <label for="inputDescription" class="form-label">description</label>
			    <textarea class="form-control" {...register('task_description')} id="inputDescription" required></textarea>
			  </div>

			  <div class="col-md-6">
			    <label for="inputDeadline" class="form-label">deadline</label>
			    <input type="date" class="form-control" {...register('task_deadline')} id="inputDeadline" required/>
			  </div>

			  <div class="col-12">
			    <button type="submit" class="btn btn-outline-success">Submit</button>
			  </div>
			</form>

		</div>
  )
}

export default TaskForm