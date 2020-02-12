import React from 'react';
import Dashboard from './Dashboard';
import * as functions from './components/functions.js';
import './App.css';
import * as API from './api/apiCalls.js';
import * as Intro from './home/intro.js';
import {DEFAULT_LONGITUDE, DEFAULT_LATITUDE} from './configuration.js';


class App extends React.Component {
  state = {
    status: {
      server: false,
      weather: false,
      sunset: false,
      location: null
    },
    local: {},
    display: Intro.default
  }

  
  setWeather = (datas) => {
    if(datas !== false){
      let status = this.state.status
      let local = this.state.local;
      local.weather = datas.weather;
      local.weather.zoning = datas.locational
      if (datas.weather.properties) {
        status.weather = true;
      }
      else {
        status.weather = false
      }
      this.setState({local: local, status: status});
    }
    else{
      this.setState({status: datas});
    }
    
  }

  setSunset = (datas) => {
    let status = this.state.status
    let local = this.state.local;
    local.sunset = datas;
    if (datas.results) {
      status.sunset = true;
    }
    else {
      status.sunset = false
    }
    this.setState({local: local, status: status});
  }

  
  componentDidMount=()=>{
    functions.getLocation((location)=>{
      this.setLocation(location); 
      this.updateWeather();
      this.updateSunset();
    });
    this.updateServer();

    functions.delayCall(()=>{this.setState({display: Dashboard})}, Intro.delay);
  }

  setLocation=(location={"latitude": DEFAULT_LATITUDE,"longitude": DEFAULT_LONGITUDE})=>{
    let status = this.state.status;
    if(Object.keys(location).length > 0){
      status.location = true;
    }
    else{
      status.location = false;
    }
    let local = this.state.local;
    local.location = location;
    this.setState({local, status});
    functions.delayCall(functions.getLocation.bind(this, this.setLocation), 60*1000);//every minute
  }

  updateServer=async()=>{
    API.pingServerAPI()
    .then((res) => {
      let copy = this.state.status;
      copy.server = res.result;
      this.setState({status: copy});
    }).catch(() => {
      let copy = this.state.status;
      copy.server = false;
      this.setState({status: copy});
    });
    functions.delayCall(this.updateServer, 10*1000);//10 second update
    
  }

  updateWeather=async()=>{
    API.loadWeatherData(this.state.local.location, this.setWeather);
    functions.delayCall(this.updateWeather, 60*60*1000);//1 hour delay
  }
  updateSunset=async()=>{
    API.loadSunsetData(this.state.local.location, this.setSunset);
    functions.delayCall(this.updateSunset, 24*60*60*1000);//24 hour delay
  }

  render() {
    return (
      <div className="App">
        <this.state.display  stateData={this.state} id="dashboard"/>
      </div>
    );
  }
}

export default App;
