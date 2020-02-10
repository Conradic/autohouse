const express = require('express');
const cors = require('cors');
const { Client } = require('tplink-smarthome-api');
const app = express();
const port = process.env.PORT || 5000;
const tpLinkLight = '50:C7:BF:5B:C8:DF';
const profiles = require('./dbAPI/profiler.js');
const Task = require('./dbAPI/task.js');
const Group = require('./dbAPI/groups.js');
const devices = require('./dbAPI/devices.js');
const bodyParser = require('body-parser')
const motionSensor = require('./dbAPI/motionAPI.js');
const RASPBERRY =require('./localConfig.js');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var whitelist = ['http://10.1.1.133:3000', 'http://localhost:3000','http://localhost:5000', '192.168.30.5', 'http://192.168.40.200:3000']
var corsOptions = {
  origin: function (origin, callback) {
    updateConnection(origin);
    if (whitelist.indexOf(origin) !== -1 || true) {
      callback(null, true)
    } else {
      console.log('Not whitelisted: '+origin);
    }
  }
}

const updateConnection=(origin)=>{
  if(!currentClients[origin] || currentClients[origin] !== true){
    currentClients[origin] = true;
    console.log('Pinged by: ' + origin);
    if(RASPBERRY){
      console.log(GPS.location);
    }

    new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve();
      }, 10*60*1000)//10 minute update
    }).then(()=>{
      currentClients[origin] = false
    });
  }
}

let serverStatus = {
  connections: {
    plug: false
  },
  status: {
    plug: null,
    server: true
  }
};
let currentClients = {
};

let tpLink={
  livingRoom: null,
  List: {
    Flag: false,
    Devices: []
  }
};

let deviceList = [];


// console.log that your server is up and running
app.listen(port, () =>{ 
  console.log(`Listening on port ${port}`);
  devices.getListOfActiveDevices(null, null, null, true, ((res)=>deviceList = res));
  updateDeviceStatus();
  if(RASPBERRY){
    console.log(GPS.location);
  }
});




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



const turnLightOn = (req, res) => {
  const mac = req.params.mac;
  changeTpLinks(req,res,mac,true);
  /*
    if(server){
      console.log(`Light: ${tpLinkLight}. Activated by: server`);
    }
    else{
      const mac = req.params.mac;
      let device = deviceList.find((device)=>{
        return device.mac == mac;
      }, mac)
      if(device){
        device.setPowerState(true);
      }
      //`Light: ${device}. Activated by: ${req.headers.origin}`);      
      res.send({status: true});
    }
  */
}


const turnLightOff = (req, res) => {
  const mac = req.params.mac;
changeTpLinks(req,res,mac,false);
/*
  if(server){
    console.log(`Light: ${tpLinkLight}. Activated by: server`);
  }
  else{
    const mac = req.params.mac;
    let device = deviceList.find((device)=>{
      return device.mac == mac;
    }, mac)
    if(device){
      console.log(device);
      device.module.setPowerState(false);
    }

    //`Light: ${device}. Activated by: ${req.headers.origin}`);      
    res.send({status: false});
  }*/
}


const changeTpLinks = (req, res, mac, powerState) => {
  const client = new Client();
  client.startDiscovery().on('device-new', (device) => {
    device.getSysInfo().then(device1 =>{
      if(device1.mac === mac){
        device.setPowerState(powerState);
      }
    });
    });
     res.send({powerState});
     //discoverTpLinks(null,null,true);
    
    //un comment to see all found devices
    setTimeout(function(){
      tpLink.List.Flag = true;
      //console.log(tpLink.List);
    }, 500);
    
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
          deviceList.module = device1;
        }
        else{
          deviceList.push({mac: device1.mac_address, title: "U: "+device1.alias, dev_name: device1.dev_name, found: true, module: device1});
        }
      }
      console.log('TP-Link found:'+ device1.mac +'   Name:' + device1.dev_name);
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
  if(tpLink.List.Flag){
    res.send(tpLink.List.Devices);
  }
  else{
    setTimeout(()=>{
      getTPLinkList(req, res);
    }, 250);
  }
}


const displayTplinks=(req, res)=>{
    let html = "<div>"+ tpLink.List.Devices.map((device)=>{return ("<div><div><span>Alias: "+device.alias+"</span></div><div><span>Name: "+device.dev_name+"</span></div><div><span>MAC: "+device.mac+"</span></div></div>")})+"</div></br></br>";
    res.status(200).send(html);
}


//routines for TPLink
app.get('/getLightStatus', cors(corsOptions), (req, res) => getLightStatus(req, res));
app.get('/turnLightOn/:mac', cors(corsOptions), (req, res) => turnLightOn(req, res));
app.get('/turnLightOff/:mac', cors(corsOptions), (req, res) => turnLightOff(req, res));
app.get('/discoverTpLinks/:status',(req, res) => discoverTpLinks(req, res));

//client-server communication
// create a GET route for server status
app.get('/serverConnection', cors(corsOptions), (req, res) => serverConnection(req, res));
app.get('/displayTpLinks', (req, res)=>displayTplinks(req, res));
app.get('/testParameters', cors(corsOptions), (req, res) => testParameters(req, res));
app.get('/getTPLinkList', cors(corsOptions), (req, res)=> getTPLinkList(req,res));


app.get('/getListOfPeople', cors(corsOptions), profiles.getListOfPeople);
app.get('/getIDListOfPeople', cors(corsOptions), profiles.getIDListOfPeople);
app.post('/createPerson', cors(corsOptions), profiles.createPerson);
app.get('/getPersonById/:id',  cors(corsOptions), profiles.getPersonById);
app.post('/updatePerson/:id', cors(corsOptions), profiles.updatePerson);


app.get('/getListOfActiveDevices', cors(corsOptions), devices.getListOfActiveDevices);
//app.get('/getListOfDevices', cors(corsOptions), devices.getListOfDevices);
app.get('/getIDListOfDevices', cors(corsOptions), devices.getIDListOfDevices);
app.get('/getDeviceById/:id',  cors(corsOptions), devices.getDeviceById);
app.post('/createDevice', cors(corsOptions), devices.createDevice);
app.post('/updateDevice/:id', cors(corsOptions), devices.updateDevice);



app.get('/getListOfTask', cors(corsOptions), Task.getListOfTask);
app.get('/getIDListOfTask', cors(corsOptions), Task.getIDListOfTask);
app.get('/getTaskTable', cors(corsOptions), Task.getTaskTable);
app.post('/createTask', cors(corsOptions), Task.createTask);
app.get('/getTaskById/:id',  cors(corsOptions), Task.getTaskById);
app.post('/updateTask/:id', cors(corsOptions), Task.updateTask);


app.get('/getListOfGroup', cors(corsOptions), Group.getListOfGroup);
app.get('/getIDListOfGroup', cors(corsOptions), Group.getIDListOfGroup);
app.post('/createGroup', cors(corsOptions), Group.createGroup);
app.post('/updateGroup/:id', cors(corsOptions), Group.updateGroup);



if(RASPBERRY){
  const GPS = require('./location.js');

  var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
  var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output

  var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

  pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
    return;
    }
    motionSensor.logMotion();
    LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)

  });
}