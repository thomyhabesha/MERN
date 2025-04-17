import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

function Error() {
  
 const error= useRouteError()
  
  if(error.status ===404){
    return(
    <Wrapper>
      <div>
      <img src={img} alt="image not found"/>
<h1>ohh! Page not found</h1>
      <p>we cant seem to find hat your looking for</p>
      <Link to="/dashboard">back to home</Link>
      </div>
    </Wrapper>
  )}
  
  return (
    <Wrapper>
      <h1>something went wrong</h1>
      
    </Wrapper>
  )
}

export default Error
