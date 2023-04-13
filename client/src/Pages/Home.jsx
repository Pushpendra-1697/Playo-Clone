import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {

  if(localStorage.getItem('token')===null){
    return <Navigate to="/login" />
  }
  return (
    <div>Home</div>
  )
}

export default Home