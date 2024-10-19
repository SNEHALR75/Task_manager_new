import React from 'react'
import useAuth from '../../hooks/useAuth'

const Home = () => {
  const auth = useAuth()
  console.log( auth, 22 )
  return (
    <div>
      <h1 className='fs-3 text-center mt-3'>HomePage</h1>
    </div>
  )
}

export default Home