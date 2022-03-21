import  React, { useEffect, useState } from 'react';
import "./Temp.css"


function Temp(){

    const [newcity,setcity] = useState("Ahmedabad");
    const [newtemp,settemp] = useState("");
    const [newmood,setmood] = useState("");
    const [newname,setname] = useState("");
    const [newcntr,setcntr] = useState("");
    const [newwicon,setwicon] = useState("");

    

    const gettemp= async()=>{
        try{
            let url= `https:\\api.openweathermap.org/data/2.5/weather?q=${newcity}&units=metric&appid=d53c1227587847568d83d642ce9a4980`
            let res=  await fetch(url)
            let data= await res.json()


           const {temp} = data.main;
           const {name} = data
           const {main} = data.weather[0]
           const {country} = data.sys
           
           settemp(temp);
           setname(name);
           setmood(main);
           setcntr(country)  

        }catch(erro){
            console.log("error")

        }
     };
     
     

     useEffect(()=>gettemp(),[])

     useEffect(()=>{
        if(newmood){
            switch(newmood){
                case "Haze": setwicon("wi-fog");
                break;
                case "Clear": setwicon("wi-day-sunny");
                break;
                case "Clouds": setwicon("wi-day-cloudy");
                break;
                case "Smoke": setwicon("wi-day-cloudy-windy");
                break;

                default:
                    break;

            }
        }
    },[newmood])
     

    

  

    return (
        <>
        <div className='wrap'>
            <div className='search'>
                <input type="text" placeholder="search" className='searchTerm' onChange={(e)=> setcity(e.target.value)} value={newcity}/>
                <button className="searchButton" type="button" onClick={gettemp}>search</button>
            </div>
        </div>

        <artical className="widget">
            <div className='weatherIcon'>
            <i className={`wi ${newwicon}`}>
           
            </i>
           </div>
           <div className='weatherInfo'>
               <div className='temperature'>
                   <span className="temp"> {newtemp}℃ </span>
               </div>
               <div className='description'>
               <div className='weatherCondition'>{newmood}</div>
               <div className='place'>{newname},{newcntr}</div>
               </div>
           </div>
           <div className='date'>{new Date().toLocaleString()}</div>
        </artical>
        </>
    );

}

export default Temp;