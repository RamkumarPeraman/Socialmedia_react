import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className='Footer'><h1> &copy; {date} Private Ltd..</h1></footer>
  )
}

export default Footer