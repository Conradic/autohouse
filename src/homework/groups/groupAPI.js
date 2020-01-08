const server = 'http://localhost:5000';

export const getGroupList= async()=>{
    const response = await fetch(server+'/getListOfGroup');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getGroupIDList= async()=>{
    const response = await fetch(server+'/getIDListOfGroup');
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const getGroup = async(id)=>{
    const response = await fetch(server+'/getGroupById/'+id);
    const body = await response.json();
    
    if (response.status !== 200) {
        console.log(body.message); 
    }
    return body;
}

export const updateGroup=async(id, data)=>{
    const response = await fetch(server+'/updateGroup/'+id, {
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


  
  export const createGroup=async(data)=>{
    const response = await fetch(server+'/createGroup', {
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