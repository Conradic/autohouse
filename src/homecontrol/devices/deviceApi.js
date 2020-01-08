import * as functions from '../../components/functions.js';
const server = 'http://localhost:5000';


export const fetchEndpoint= async(endpoint)=>{
    const response = await fetch(endpoint);
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

export const getTPLinkList=async()=>{
    const response = await fetch(server+'/getTPLinkList');//'/getListOfDevices');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getDeviceList= async()=>{
    const response = await fetch(server+'/getListOfActiveDevices');//'/getListOfDevices');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getDevice = async(id)=>{
    const response = await fetch(server+'/getDeviceById/'+id);
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const updateDevice=async(id, data)=>{
    const response = await fetch(server+'/updateDevice/'+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resp = await response.text();
    
    if (response.status !== 201) {
        console.log(resp.message); 
    }
    return resp;
  };


  
  export const createDevice=async(data)=>{
    const response = await fetch(server+'/createDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.text();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
  };


  export const turnLightOn=async(mac)=>{
    console.log(server+'/turnLightOn/'+mac);
    const response = await fetch(server+'/turnLightOn/'+mac);
    console.log(server+'/turnLightOn/'+mac);
    const body = await response.json();
    console.log(server+'/turnLightOn/'+mac);
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
  }


  export const turnLightOff=async(mac)=>{
    const response = await fetch(server+'/turnLightOff/'+mac);
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
  }