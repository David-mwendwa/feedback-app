import React from 'react'
import {Link} from 'react-router-dom'
import { BsQuestionCircle } from "react-icons/bs";


function AboutIconLink() {
  return (
    <div className='about-link'>
      <Link to="/about"><BsQuestionCircle size={30}/></Link>
    </div>
  )
}

export default AboutIconLink
