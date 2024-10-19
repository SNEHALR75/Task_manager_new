import {NavLink,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useAI2 from '../hooks/useAI2'
import Person from "../../node_modules/bootstrap-icons/icons/person.svg"


function Navbar(){
	const nav = useNavigate()
	const auth = useAuth()
    const AI2 = useAI2()

	async function logoutUser () {
		if ( window.confirm(`Do you wants log out ?`) ){
			try{
		    	const res = await AI2.post('/logout/')
		    	console.log( res )
		  	}
		    catch(e){
		    	console.log(e)
	    	}
	    	finally {
	            auth.setUser({id:null,username:null,role:null,is_superuser:false,is_staff:false,
        					is_active:false,profile_pic:null,first_name:null,last_name:null,
        					email:null,gender:null,address:null,pincode:null,city:null,
        					contact:null,company:null,})
	            auth.setAccessToken(null)
	            auth.setCSRFToken(null)
	            auth.setLoggedIn(null)
	            nav(`/login/`)
	        }
	    }
	}


	return(
		<>

			<nav className="navbar navbar-expand-lg bg-body-tertiary fs-5">
			  <div className="container-fluid">
			    <NavLink className="navbar-brand fs-4" style={{fontFamily:'cursive',fontStyle:'oblique',fontWeight:'1000'}} to="/home">BlogApp</NavLink>
			    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			      <div className="navbar-nav">
			        <NavLink className="nav-link active text-center" aria-current="page" to="/home/"><i class="bi bi-house-fill"></i></NavLink>
						{
							auth.loggedIn ?
			      			<>
						     	<NavLink className="nav-link" to="/tasks/"><i class="bi bi-list-task"></i></NavLink>
				      			<NavLink className="nav-link" to="/tasks/add/"><i class="bi bi-plus-lg"></i></NavLink>
				      			<NavLink className="nav-link" to="/users/"><i class="bi bi-people-fill"></i></NavLink>
			        		</>
			        		:
			        		<>
						     	<NavLink className="nav-link disabled" to="/tasks/"><i class="bi bi-list-task"></i></NavLink>
				      			<NavLink className="nav-link disabled" to="/tasks/add/"><i class="bi bi-plus-lg"></i></NavLink>			        			
			        		</>

			      	}			        
			        
			        
			      </div>

			      <div className="navbar-nav ms-auto">
					
			          
			      	{
			      		auth.loggedIn ?
			      			<>
						        <NavLink className="nav-link text-danger" to="/account/" >
						        	
						        	<img src={
						        		auth.user.profile_pic ? `http://127.0.0.1:8000${auth.user.profile_pic}` : Person
						        	} 
						        		className="profile-icon me-1"

										style={{width: '50px',height: '50px',
											objectFit: 'cover',
											   objectPosition: 'center',borderRadius:'180px'
										}}
						        	/>
						        	{auth.user.username}
						        </NavLink>
						        <NavLink className="nav-link text-danger mt-2" >{auth.user.role}</NavLink>
				        		<NavLink className="nav-link mt-2" onClick={logoutUser}><i class="bi bi-box-arrow-in-right"></i></NavLink>
			        		</>
			        		:
			        		<>
						      	<NavLink className="nav-link" to="/login/"><i class="bi bi-box-arrow-in-left"></i></NavLink>
						        <NavLink className="nav-link" to="/signup/">SignUp</NavLink>	
			        		</>
			      	}


			      </div>



			    </div>
			  </div>
			</nav>
		</>
	)
}


export default Navbar
















