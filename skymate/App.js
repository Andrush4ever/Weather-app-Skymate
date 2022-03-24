import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import "./style.css";
import logo from "./assets/image/logo.png";
import earth from "./assets/image/earth.mp4";

const App = () => {

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Mumbai');

  useEffect ( () => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=aab39ff19f0ba5a2d4b0c597eafea07c`;
      const response = await fetch(url);
      
      const resJson = await response.json();
      //console.log(resJson);
      setCity(resJson.main);
    }
    fetchApi();

  },[ search ] )

  

  return(
    <div>
    <video autoPlay muted loop className='earth'>
    <source src={earth} type='video/mp4'/>
    </video>
        <div className='logo'>
            <img src={logo}/>
        </div>
        <div className="box">
          <div className='input_search'>
              <input
              type="search"
              className='label'
              value={search}
              onChange={ (event) => { setSearch(event.target.value) 
              
              } } />
          </div>    
          {!city ? (
            <p className='errormsg'> No Data Found!</p>
          ) : (
            <div>
            <div className="info">
            <h2 className='location'>
            <i className="fa-solid fa-location-dot"></i>{search}
            </h2>

            <h1 className='temp'>
            {city.temp}°C
            </h1>
            <h4 className='tempin_max'>Max : {city.temp_max}°C | Min :{city.temp_min}°C
            </h4>
          </div>
            <div className='wave -one'></div>
            <div className='wave -two'></div>
            <div className='wave -three'></div>
            </div>
          )
          }
         
        </div>
     </div>
  )
}

export default App;