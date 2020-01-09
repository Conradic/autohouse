import * as functions from '../components/functions.js';
import {server} from '../configuration.js';



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

export const getPersonList= async()=>{
    const response = await fetch(server+'/getListOfPeople');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getPersonIDList= async()=>{
    const response = await fetch(server+'/getIDListOfPeople');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getPerson = async(id)=>{
    const response = await fetch(server+'/getPersonById/'+id);
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const updatePerson=async(id, data)=>{
    const response = await fetch(server+'/updatePerson/'+id, {
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


  
  export const createPerson=async(data)=>{
    const response = await fetch(server+'/createPerson', {
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