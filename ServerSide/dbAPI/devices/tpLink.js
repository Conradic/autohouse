let deviceList = [];


// console.log that your server is up and running
app.listen(port, () =>{ 
  console.log(`Listening on port ${port}`);
  devices.getListOfActiveDevices(null, null, true, setDeviceList);
  updateDeviceStatus();
});



const setDeviceList=(res)=>{
  deviceList = res;
}


const updateDeviceStatus=()=>{
  discoverTpLinks(null, null, true);

  getLightStatus(null, null, true);
    new Promise(function(resolve, reject){
      if(serverStatus.connections.plug){
        setTimeout(function(){
          resolve();
        }, 5*1000)//5 second update
      }
      else{
      setTimeout(function(){
        resolve();
      }, 5*60*1000)//5 minute update
    }
    }).then(()=>{
      updateDeviceStatus();
    }).catch((error)=>{
      console.log(error);
    });
}



const serverConnection = (req, res)=>{
  let it = {};
  if(deviceList){
    deviceList.forEach((device)=>{
      it['S: '+device['title']] = device['found'];
    });
  }
  res.send({ result: it});
}



const testParameters=(req, res)=>{

}





const getLightStatus = (req, res, server=false) => {
  if(tpLink.livingRoom){
    tpLink.livingRoom.getSysInfo().then((state) => {
      serverStatus.status.plug = state;
      if(!server){
        res.send({ status: state });
      }
      serverStatus.connections.plug = true;
    })
  }
  else{
      serverStatus.connections.plug = false;
  }
}

const getSpecificLightStatus = (req, res, server=false, mac='') => {
  let light;
  if(server){
    light = mac;
  }
  else{
    light = parseInt(request.params.find);
  }

  if(light){
    light.getSysInfo().then((state) => {
      serverStatus.status.plug = state;
      if(!server){
        res.send({ status: state });
      }
      serverStatus.connections.plug = true;
    })
  }
  else{
      serverStatus.connections.plug = false;
  }
}



const turnLightOn = (req, res, server=false) => {
  if(tpLink.livingRoom){
    tpLink.livingRoom.setPowerState(true);
    if(server){
      console.log(`Light: ${tpLinkLight}. Activated by: server`);
    }
    else{
      console.log(`Light: ${tpLinkLight}. Activated by: ${req.headers.origin}`);      
      res.send({status: true});
    }
  }
  else{
      res.send({ status: null });
  }
}


const turnLightOff = (req, res, server=false) => {
  if(tpLink.livingRoom){
    tpLink.livingRoom.setPowerState(false);
    if(server){
      console.log(`Light: ${tpLinkLight}. Deactivated by: server`);
    }
    else{
      console.log(`Light: ${tpLinkLight}. Deactivated by: ${req.headers.origin}`);   
      res.send({status: false})   
    }
  }
  else{
      res.send({ status: null });
    }
}



const discoverTpLinks = (req, res, server=false) => {
  const status = req?parseInt(req.params.status):null;
  const client = new Client();
  serverStatus.connections.plug = false;
  tpLink.livingRoom = null;
  tpLink.List.Flag = false;
  tpLink.List.Devices = [];
  client.startDiscovery().on('device-new', (device) => {
    device.getSysInfo().then(device1 =>{
      tpLink.List.Devices.push(device1);
      if(Array.isArray(deviceList)){
        const deviceStored = deviceList.find(device=>{return device1.mac === device.mac});
        if(deviceStored){
          tpLink[deviceStored.title] = device;
          serverStatus.connections[deviceStored.mac];
          serverStatus.connections[deviceStored.mac] = true;
          deviceStored.found = true;
        }
        else{
          deviceList.push({mac: device1.mac_address, title: "U: "+device1.alias, dev_name: device1.dev_name, found: true});
        }
      }
      console.log('TP-Link found: '+ device1.mac);
      console.log(device1);
    });
    if(status !== null && server === false){
      console.log(`Light: ${tpLinkLight}. ${status?'A':'Dea'}ctivated by: ${req.headers.origin}`);   
      device.setPowerState(status);
      res.send({status});
    }
    
    });
    
    //un comment to see all found devices
    setTimeout(function(){
      tpLink.List.Flag = true;
      //console.log(tpLink.List);
    }, 500);
}

const getTPLinkList=(req, res)=>{
  if(tpLink.Lists.Flag){
    req.send({devices: tpLink.List});
  }
  else{
    setTimeout(function(){
      getTPLinkList(req, res);
    }, 250);
  }
}


const displayTplinks=(req, res)=>{
    let html = "<div>"+ tpLink.List.Devices.map((device)=>{return ("<div><div><span>Alias: "+device.alias+"</span></div><div><span>Name: "+device.dev_name+"</span></div><div><span>MAC: "+device.mac+"</span></div></div>")})+"</div></br></br>";
    res.status(200).send(html);
}