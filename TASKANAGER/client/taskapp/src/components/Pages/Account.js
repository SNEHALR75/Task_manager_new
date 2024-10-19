import React, { useState,useEffect } from 'react'
import useAI2 from '../../hooks/useAI2'
import useAuth from '../../hooks/useAuth'
import { NavLink,useNavigate } from 'react-router-dom'
import Person from '../../../node_modules/bootstrap-icons/icons/person.svg'

const Account = () => {

    const [userData,setUserData] = useState([])
    const auth = useAuth()
    const  AI2 = useAI2()
    const nav = useNavigate()

    async function getUserData( ) {
        try {
			const res = await AI2.get('/user/info/')
			if( res.status == 200 ){
				console.log(res.data)
				setUserData( res.data )
			}
		} catch(e) {
			console.log(e)
		}
    }

    useEffect( ()=>{ getUserData() } , [] )
  return (
    <div>
        <section className="vh-100 w-100 mx-auto fs-5" style={{backgroundColor: "#f4f5f7",maxHeight: "fit-content"}}>
			  <div className="container py-4">
			    <div className="row d-flex justify-content-center align-items-center h-100">
			      <div className="col col-lg-12 mb-4 mb-lg-0">
			        <div className="card mb-3" style={{borderRadius: ".5rem"}}>
			          <div className="row g-0">
			            <div className="col-md-4 gradient-custom text-center"
			              style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
			              <img src=
			              {

			              	userData.profile_pic ? `http://127.0.0.1:8000${userData.profile_pic}`
			              	: Person
			              }


			                alt="Avatar" className="img-fluid my-5" style={{width: '180px',height: '180px',
			                	objectFit: 'cover',
   								objectPosition: 'center',borderRadius:'180px'
			            	}} />
			              <h5>{userData.username}</h5>
			              <p>{userData.role}</p>
			              <NavLink className="nav-link" to="/account/update/">
			              	<i className="far fa-edit mb-5"></i>
			              </NavLink>
			              
			            </div>
			            <div className="col-md-8">
			              <div className="card-body p-4">
			                <h6>Information..</h6>
			                <hr className="mt-0 mb-4"/>
			                <div className="row pt-1">
			                  <div className="col-6 mb-3">
			                    <h6>Username</h6>
			                    <p className="text-muted">{userData.username}</p>
			                  </div>
			                  <div className="col-6 mb-3">
			                    <h6>Email</h6>
			                    <p className="text-muted">{userData.email}</p>
			                  </div>
			                </div>
			                <h6>Other details..</h6>
			                <hr className="mt-0 mb-4"/>
			                <div className="row pt-1">
			                  <div className="col-4 mb-3">
			                    <h6>Phone</h6>
			                    <p className="text-muted">{userData.contact?userData.contact:'---'}</p>
			                  </div>
			                  <div className="col-4 mb-3">
			                    <h6>Gender</h6>
			                    <p className="text-muted">{userData.gender?userData.gender:'---'}</p>
			                  </div>
			                  <div className="col-4 mb-3">
			                    <h6>Address</h6>
			                    <p className="text-muted">{userData.address?userData.address:'---'}</p>
			                  </div>
			                  <div className="col-4 mb-3">
			                    <h6>Pincode</h6>
			                    <p className="text-muted">{userData.pincode?userData.pincode:'---'}</p>
			                  </div>
			                  <div className="col-4 mb-3">
			                    <h6>City</h6>
			                    <p className="text-muted">{userData.city?userData.city:'---'}</p>
			                  </div>

			                  <div className="col-4 mb-3">
			                    <h6>Role</h6>
			                    <p className="text-muted">{userData.role?userData.role:'---'}</p>
			                  </div>
			                  <div className="col-4 mb-3">
			                    <h6>Company</h6>
			                    <p className="text-muted">{userData.company?userData.company:'---'}</p>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</section>
    </div>
  )
}

export default Account