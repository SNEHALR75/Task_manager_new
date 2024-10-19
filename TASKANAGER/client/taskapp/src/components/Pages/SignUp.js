import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {


    const {register,handleSubmit} = useForm()
    const nav = useNavigate()


    async function saveData(data) {
        data.profile_pic = data.profile_pic[0]
        try {
			const res = await axios.post('http://127.0.0.1:8000/signup/',data,
					{headers: {
	        				"Content-Type": 'multipart/form-data',
	    			}}
				)
			if( res.status == 201 ){
				console.log('data saved',res)
				nav('/login/')
			}
		} catch(e) {
			console.log(e);
			alert('Something went wrong..!')
		}
    }

    function seePassword() {
	    let signupForm = document.getElementById("signupForm")
	    if( signupForm.password.getAttribute('type') === 'text' ){
	      signupForm.password.setAttribute('type','password')
	    }
	    else{
	      signupForm.password.setAttribute('type','text')
	    }
	}


  return (
    <div className="p-3 mt-2">
		<div className='mx-auto p-4 ps-5 pe-5 rounded' style={{width:'60%',background:'rgb(206, 216, 222)'}}>	
			<h4 className="text-center mb-3">SignUp Form</h4>
			<form onSubmit={handleSubmit(saveData)} id="signupForm" class="row g-3" encType="multipart/form-data">

				<div class="col-md-6">
					<label className="form-label">Username : <span className="text-danger">*</span> </label>
					<input type="text" {...register('username')}  placeholder="username here.."  className="form-control mb-2" required/>
				</div>

				<div class="col-md-6">
					<label className="form-label">Password : <span className="text-danger">*</span></label>
					<input type="password" {...register('password')} placeholder="password here.." className="form-control mb-2" required/>
					<input type="checkbox" id="seePw" onChange={seePassword} /> <label htmlFor="seePw" className='text-secondary'>see password</label><br/>
				</div>

				<div class="col-md-4">
					<label className="form-label">Email : <span className="text-danger">*</span></label>
					<input type="email" {...register('email')} placeholder="email here.." className="form-control mb-2" required/>
				</div>

				<div class="col-md-4">
					<label className="form-label">Gender :</label>
					<select {...register('gender')} className="form-select mb-2">
						<option value="">--select--</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>

				<div class="col-md-4">
					<label className="form-label">Role : <span className="text-danger">*</span></label>
					<select {...register('role')} className="form-select mb-2" required>
						<option value="">--select--</option>
						<option value="manager">manager</option>
						<option value="team_leader">team leader</option>
						<option value="developer">developer</option>
					</select>
				</div>

				<div class="col-md-6">
					<label className="form-label">Profile Pic :</label>
					<input type="file" {...register('profile_pic')}  placeholder="profile pic here.."  className="form-control mb-2" noRequired/>
				</div>

				<div class="col-md-6">
					<label className="form-label">Company :</label>
					<input type="text" {...register('company')}  placeholder="company here.."  className="form-control mb-2" />
				</div>

				<div class="col-md-12">
					<label className="form-label">Address :</label>
					<textarea {...register('address')}  placeholder="address here.."  className="form-control mb-2" ></textarea>
				</div>

				<div class="col-md-4">
					<label className="form-label">Pincode :</label>
					<input type="number" {...register('pincode')}  placeholder="pincode here.."  className="form-control mb-2" />
				</div>

				<div class="col-md-4">
					<label className="form-label">City :</label>
					<input type="text" {...register('city')}  placeholder="city here.."  className="form-control mb-2" />
				</div>

				<div class="col-md-4">
					<label className="form-label">Contact :</label>
					<input type="text" {...register('contact')}  placeholder="contact here.."  className="form-control mb-2" />
				</div>

				

				<div class="col-md-6">
					<button className="btn btn-outline-success mt-3">SignUp</button>	
				</div>

				
				
			</form>

		</div>
		</div>

  )
}

export default SignUp