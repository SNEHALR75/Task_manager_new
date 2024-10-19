// AccountActivation.js
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'


function AccountActivation(){
  const [activated,setActivated] = useState(false)
  const {token} = useParams()
  
  async function activateAccount(){
		try {
			const res = await axios.post(`http://127.0.0.1:8000/account/activate/${token}/`)
			if( res.status == 200 ){
				console.log('activated',res)
				setActivated( true )
			}
		}
		catch(e) {
			console.log(e)
		}
  }

  useEffect( ()=>{ activateAccount() }, [] )

  return(
    <div className="mt-5 p-1 text-center">
      
      { activated ?
      	<h3 >Account Activated..!</h3> :
      	<h3 className="text-danger" >Invalid Link..!</h3>
      }

    </div>
  )
}


export default AccountActivation







