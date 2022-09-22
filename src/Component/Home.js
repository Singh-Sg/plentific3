import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='container header' style={{display:"flex",justifyContent:"center",marginTop:"50px",marginBottom:"50px"}}>
    <div style={{display:"flex",justifyContent:"space-around",width:"40%"}}>
      <Link to="/histogram"> <button className='btn1'>Histogram Chart</button></Link> 
       <Link to="/time-series"><button className='btn2'>Time_Series Chart</button></Link> 
    </div>
    </div>
  )
}
