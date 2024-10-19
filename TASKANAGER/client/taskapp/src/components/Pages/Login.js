import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import useAI2 from '../../hooks/useAI2'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const {register,handleSubmit} = useForm()
    const auth = useAuth()
    const AI2 = useAI2()
    const nav = useNavigate()

    async function loginHandler(data) {
        try{
            const response = await AI2.post('/signin/',data)
            console.log( response )
            if(response.status==200){
              auth.setAccessToken(response?.data?.access)
              auth.setCSRFToken(response.headers["x-csrftoken"])
              
              async function verifyUser() {
                  try {
                      const res = await AI2.get('/user/info/',
                        {
                          headers : {
                            Authorization : `Bearer ${response?.data?.access}`
                          }
                        }
                      )
                      console.log( res )
                      auth.setUser( res.data )
                      auth.setLoggedIn( true )
                  }
                  catch(error){
                    console.log( error )
                  }
              }
              await verifyUser()
              nav('/home/')
            }
          }
          catch(e){
            console.log( e )
            alert("Something went wrong..!")
          }
        
    }

    function seePassword( formId ) {

        let formEle = document.getElementById( formId )
        if( formEle.password.getAttribute('type') === 'text' ){
          formEle.password.setAttribute('type','password')
        }
        else{
          formEle.password.setAttribute('type','text')
        }
      }

  return (
    <div>
        <div className="p-3 mt-2">

<div className='mx-auto p-4 ps-5 pe-5 rounded' style={{width:'40%',background:'rgb(206, 216, 222)'}} >
  <h4 className="text-center mb-3">Login Form</h4>

  <form onSubmit={handleSubmit(loginHandler)} id="loginForm">
    <label>Username :</label>
    <input name='username' {...register('username')} type="text" className="form-control mb-2" placeholder="username here.." required/>
    
    <label>Password :</label>
    <input name='password' {...register('password')} type="password" className="form-control mb-2" placeholder="password here.." required/>
    
    <input type="checkbox" id="seePw" onChange={()=>seePassword('loginForm')} /> <label htmlFor="seePw" className='text-secondary'>see password</label><br/>

    <button type="submit" className="btn btn-outline-primary mt-3">Login</button>
  </form>
</div>

</div>
    </div>
  )
}

export default Login