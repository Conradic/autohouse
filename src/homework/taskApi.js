import {server} from '../configuration.js';



export const getTaskList= async()=>{
    const response = await fetch(server+'/getListOfTask');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}


export const getTaskTable= async()=>{
  const response = await fetch(server+'/getTaskTable');
  const body = await response.json();
  
  if (response.status !== 200) {
      console.log(body.message); 
  }
  return body;
}

export const getTaskIDList= async()=>{
    const response = await fetch(server+'/getIDListOfTask');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getTask = async(id)=>{
    const response = await fetch(server+'/getListOfTask/'+id);
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const updateTask=async(id, data)=>{
    const response = await fetch(server+'/updateTask/'+id, {
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


  
  export const createTask=async(data)=>{
    const response = await fetch(server+'/createTask', {
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



  