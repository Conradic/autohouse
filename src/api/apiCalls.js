import React from 'react';
import * as functions from '../components/functions.js';
import {server} from '../configuration.js';

const nest_id = 0;

class API extends React.Component{
    state = {
        promises: [],
        data: {}
    }
    render(){
        return;
    }
}

export const sendParamater= async(param)=>{
    const response = await fetch(server+'/testParameters', {
        method: 'POST',
        body: JSON.stringify(param),
        credentials: "include",
        headers: {
            'Content-Type': 'applicatoin/json; charset=utf-8'
        }
    });
    const body = await response.json();

    if(response.status !== 200){
        console.log(body.message);
    }
    return body;
}


export const loadSunsetData = (location, callback=null) =>{
    const lon = location['longitude'].toFixed(1);//Who wants to gie the gov their exact location?
    const lat = location['latitude'].toFixed(1);
    fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`).then((response)=>{
        return response.json();
    })
    .then((data)=>{
        callback(data);
        return data;
    }).catch((error)=>{
        functions.delayCall(loadSunsetData.bind(this, location, callback), 10*1000);
        callback(false);
    });
}


export const loadWeatherData = (location, callback=null) =>{
    const lon = location['longitude'].toFixed(3);//Who wants to gie the gov their exact location?
    const lat = location['latitude'].toFixed(3);
    console.log(lat+", "+lon);
    const complete_data = {};
    fetch(`https://api.weather.gov/points/${lat},${lon}`).then((response)=>{
        return response.json();
    }).then((data)=>{
        complete_data.locational = data;
        fetch(data.properties.forecastGridData).then((response)=>{
            return response.json();
        })
        .then((data)=>{
            complete_data.weather = data;
            callback(complete_data);
        }).catch((error)=>{
            functions.delayCall(loadWeatherData.bind(this, location, callback), 10*1000);
            callback(false);
        });
    }).catch((error)=>{
        functions.delayCall(loadWeatherData.bind(this, location, callback), 10*1000);
        callback(false);
    });;
}


export const pingServerAPI = async () => {
    const response = await fetch(server+'/serverConnection');
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
};

export const setAllLights= async(status)=>{
    if(status){
        status = 1;
    }
    else{
        status = 0;
    }
    const response = await fetch(server+'/discoverTpLinks/'+status);
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
}


export const turnLightOn = async () => {
    const response = await fetch(server+'/turnLightOn')
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
};


export const setNestHVAC = async(value)=>{
    const response = await fetch(server+'/turnLightOn')
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
}

export const getNestData = async(callback)=>{
    let thermostat = {};
    fetch(`https://developer-api.nest.com/devices/thermostats/${nest_id}/hvac_mode`).then((response)=>{
        response.json();
    }).then((data)=>{
        thermostat.hvac_mode = data;
        if(data === 'heat-cool'){
            Promise.all(fetchEndpoint(`https://developer-api.nest.com/devices/thermostats/${nest_id}/target_temperature_low_f`), 
            fetchEndpoint(`https://developer-api.nest.com/devices/thermostats/${nest_id}/target_temperature_high_f`)).then((data1)=>{
                thermostat.minTemp = data1[0];
                thermostat.maxTemp = data1[1];
                callback(thermostat);
            });
        }
        else if(data === 'heat' || data === 'cool'){
            Promise.all(fetchEndpoint(`https://developer-api.nest.com/devices/thermostats/${nest_id}/target_temperature_f`)).then((data1)=>{
                thermostat.target = data1[0];
                callback(thermostat);
            });
        }
        else{
            callback(thermostat);
        }
    }).catch((error)=>{
        thermostat.hvac_mode = undefined;
        callback(thermostat);
    });

    
}

export const fetchEndpoint= async(endpoint)=>{
    const response = await fetch(endpoint);
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
}


export const turnLightOff = async () => {
    const response = await fetch(server+'/turnLightOff');
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
};

export const getLightStatus = async () => {
    const response = await fetch(server+'/getLightStatus');
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body.status.relay_state;
};


export const getStats=async()=>{
    const response = await fetch('', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
      }
    }).catch(error=>{
        console.log(error);
    });
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    console.log(body);
  };

  

export const discoverTpLinks = async () => {
    const response = await fetch(server+'/discoverTpLinks');
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
}

export const loopAPICall = async (endpoint, callback, delay) =>{
    fetch(endpoint).then((response)=>{
        return response.json();
    }).then((data)=>{
        callback(data);
    }).catch((error)=>{
    });     
    functions.delayCall(loopAPICall.bind(this, endpoint, callback, delay), delay);
}

export const makeAPICall = async (endpoint, callback, delay) =>{
    fetch(endpoint).then((response)=>{
        return response.json();
    }).then((data)=>{
        callback(data);
    }).catch((error)=>{
        functions.delayCall(this.makeAPICall.bind(this, endpoint, callback, delay), delay);
    });     
}


export const getData=(title)=>{
    return API.state.data[title];
}

export default API;
