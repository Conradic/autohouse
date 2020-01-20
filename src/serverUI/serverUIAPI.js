import * as functions from '../components/functions.js';
import {server} from '../configuration';





export const turnLightOn = async () => {
    const response = await fetch(server+'/turnLightOn')
    const body = await response.json();

    if (response.status !== 200) {
      console.log(body.message); 
    }
    return body;
};


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
    const response = await fetch(server+'/discoverTpLinks/find');
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

