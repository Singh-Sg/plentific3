import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LineChart() {
  const [location, setlocation] = useState()
  const [isLoading, setisLoading] = useState(true)
  const [StartdateData, setStartdateData] = useState()
  const [EnddateData, setEnddateData] = useState()
  const [finalDataKey, setfinalDataKey] = useState([])
  const [samount, setsamount] = useState([])
  const [damount, setdamount] = useState([])
  const [famount, setfamount] = useState([])
  const [tamount, settamount] = useState([])

  let submitdata = () => {
    if((StartdateData!==undefined)&&(EnddateData!==undefined)){
      if(StartdateData<EnddateData){
        
        document.getElementById("chart").style.display="block"
        var data = new FormData()
        data.append("location", location)
        data.append("start_date", StartdateData)
        data.append("end_date", EnddateData)
        axios.post("https://d194-2405-201-300b-71c8-b858-8b3e-e9b2-c784.ngrok.io/timeseries/", data).then((res) => {
          setisLoading(false)
          setfinalDataKey(res.data.key)
          setsamount(res.data.samount)
          setdamount(res.data.damount)
          setfamount(res.data.famount)
          settamount(res.data.tamount)
        }).catch((err) => {
          console.log(err)
        })
        setisLoading(true)
      }
      else{
        alert("fill Start date is Less then End date")
      }
      }
    else{
      alert("Plaese fill the Start Date and End Date Both fields")
    }
  }



  let options = {
    Chart: {
      id: 'apexchart'
    },

    xaxis: {
      categories: finalDataKey
    },
    series: [{
      name: 'Semi-detached',
      data: samount

    },
    {
      name: 'Detached',
      data: damount

    },
    {
      name: 'Flats',
      data: famount

    },
    {
      name: 'Terraced',
      data: tamount

    }
    ]
  };
  const locationHandler = (e) => {
    setlocation(e.target.value)
  }
  const startDateHandler = (e) => {
    setStartdateData(e.target.value)
  }
  const EndDateHandler = (e) => {
    setEnddateData(e.target.value)
  }
  return (
    <>
     <div className='container header' style={{display:"flex",justifyContent:"center",marginTop:"50px",marginBottom:"50px"}}>
    <div style={{display:"flex",justifyContent:"space-around",width:"40%"}}>
      <Link to="/histogram"> <button className='btn1'>Histogram Chart</button></Link> 
       <Link to="/time-series"><button className='current'>Time_Series Chart</button></Link> 
    </div>
    </div>
    
      <div className='container'>
        <div className='row' style={{ paddingTop: "40px" }}>
          <div className='col-lg-3 col-md-3 col-sm-12' style={{ display: "flex", justifyContent: "end" }}>
            <h5 style={{ fontSize: "18px" }}>Location:</h5>&nbsp;&nbsp;&nbsp;
            <input value={location} onChange={locationHandler} placeholder="e.g.SW18"></input>
          </div>
          <div className='col-lg-7 col-md-7 col-sm-12' style={{ display: "flex", justifyContent: "center" }}>
            <h5 style={{ fontSize: "18px" }}>Start Date:</h5>&nbsp;&nbsp;&nbsp;
            <input type="date" value={StartdateData} onChange={startDateHandler} style={{ width: "180px" }} ></input>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>To</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <h5 style={{ fontSize: "18px" }}>End Date:</h5>&nbsp;&nbsp;&nbsp;
            <input type="date" value={EnddateData} onChange={EndDateHandler} style={{ width: "180px" }} min={StartdateData} max="2022-7-28"></input>
          </div>
        
          <div className='col-lg-2 col-md-2 col-sm-12' style={{ display: "flex", justifyContent: "left" }}>
            <button className='btn btn-primary' onClick={submitdata}>Submit</button>
          </div>

        </div>
        <div style={{ display: "none", justifyContent: "center", paddingTop: "70px" }} id="chart">
          {
            (isLoading)? "Loading..." :
              <Chart options={options} series={options.series} type="line" width={1000} height={420} />
          }
        </div>

      </div>
    </>
  )
}
