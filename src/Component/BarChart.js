import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BarChart() {
    const[location,setlocation]=useState()
    const [isLoading, setisLoading] = useState(true)
    const[dateData,setdateData]=useState()
    const[finalDataKey,setfinalDataKey]=useState([])
    const[FinalDataVal,setFinalDataVal]=useState([])

    let submitdata=()=>{
      document.getElementById("chart").style.display="block"
        var data=new FormData()
        data.append("location",location)
        data.append("date",dateData)
        axios.post("https://6300-2405-201-300b-71c8-cd5c-ab49-2a20-a941.ngrok.io/average/",data).then((res)=>{
          setisLoading(false)
            setfinalDataKey(res.data.key)
            setFinalDataVal(res.data.values)
        }).catch((err)=>{
            console.log(err)
        })
        setisLoading(true)
    }
    console.log(submitdata)

    var options = {
        
        chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories:finalDataKey
        },
        series: [{
            name: 'series-1',
              data:FinalDataVal

          }]
      };
      const locationHandler=(e)=>{
        setlocation(e.target.value)
      }
      const DateHandler=(e)=>{
        setdateData(e.target.value)
      }
  return (
    <>
     <div className='container header' style={{display:"flex",justifyContent:"center",marginTop:"50px",marginBottom:"50px"}}>
    <div style={{display:"flex",justifyContent:"space-around",width:"40%"}}>
      <Link to="/histogram"> <button className='current'>Histogram Chart</button></Link> 
       <Link to="/time-series"><button className='btn2'>Time_Series Chart</button></Link> 
    </div>
    </div>
    <div className='container'>
    <div className='row' style={{paddingTop:"40px"}}>
        <div className='col-lg-5 col-md-5 col-sm-12' style={{display:"flex",justifyContent:"end"}}>
         <h5>Location:</h5>&nbsp;&nbsp;&nbsp;
         <input value={location} onChange={locationHandler} placeholder="e.g.SW18"></input>
        </div>
        <div className='col-lg-5 col-md-5 col-sm-12' style={{display:"flex",justifyContent:"center"}}>
         <h5>Date:</h5>&nbsp;&nbsp;&nbsp;
         <input type="date" value={dateData} onChange={DateHandler} style={{width:"180px"}}></input>
        </div>
        <div className='col-lg-2 col-md-2 col-sm-12' style={{display:"flex",justifyContent:"left"}}>
            <button className='btn btn-primary' onClick={submitdata}>Submit</button>
        </div>

    </div>
    <div style={{display:"none",justifyContent:"center",paddingTop:"70px"}} id="chart">
      {
         (isLoading)? "Loading..." :
        <Chart options={options} series={options.series} type="bar" width={1000} height={420} />
      }
    </div>

    </div>
    </>
  )
}
