import React from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa';


const Header = ({title,width}) => {
  return (
    <header
    className='Header'
    >
     <h1>{title}</h1> 
        {width < 768 ? <FaMobileAlt color="blue"/> : width < 992 ? <FaTabletAlt color="blue"/> : <FaLaptop color="blue"/>}

    </header>
  )
}

export default Header