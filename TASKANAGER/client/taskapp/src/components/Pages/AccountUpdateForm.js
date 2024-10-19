import React from 'react'
import useAI2 from '../../hooks/useAI2'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'


const AccountUpdateForm = () => {

    const auth = useAuth()
    const AI2 = useAI2()
    const nav = useNavigate()
    const {register,handleSubmit,setValue} = useForm()

    async function saveData(data) {
        console.log(data)
		data.profile_pic = data.profile_pic[0]
		try {
			const res = await AI2.patch('/user/info/',data,
					{headers: {
        				"Content-Type": 'multipart/form-data',
    				}}
				)
			if( res.status == 200 ){
				console.log('data saved',res)
				nav('/account/')
			}
		} catch(e) {
			console.log(e);
			alert('Something went wrong..!')
		}
    }

    async function getUserData(){
		try {
			const res = await AI2.get('/user/info/')
			if( res.status == 200 ){
				console.log(res.data)
				setValue( 'username', res.data.username )
				// setValue( 'password', res.data.username )
				setValue( 'email', res.data.email )
				setValue( 'gender', res.data.gender )
				setValue( 'role', res.data.role )
				setValue( 'company', res.data.company )
				setValue( 'address', res.data.address )
				setValue( 'pincode', res.data.pincode )
				setValue( 'city', res.data.city )
				setValue( 'contact', res.data.contact )
			}
		} catch(e) {
			console.log(e)
		}
	}

	useEffect( ()=>{ getUserData() } , [] )

  return (
    <div>
        <div className="p-3 mt-2">
		<div className='mx-auto p-4 ps-5 pe-5 rounded' style={{width:'60%',background:'rgb(206, 216, 222)'}}>	
			<h4 className="text-center mb-3">Account Update Form</h4>
			<form onSubmit={handleSubmit(saveData)} id="signupForm" class="row g-3" encType="multipart/formdata">

				<div class="col-md-6">
					<label className="form-label">Username : <span className="text-danger">*</span> </label>
					<input type="text" {...register('username')}  placeholder="username here.."  className="form-control mb-2" readOnly/>
				</div>

				<div class="col-md-6 ">
					<label className="form-label">Password : <span className="text-danger">*</span></label>
					<input type="password" {...register('password')} placeholder="password here.." className="form-control mb-2 " disabled/>
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
    </div>
  )
}

export default AccountUpdateForm