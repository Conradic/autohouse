import React from 'react';
import light from './lightIcon.png';
import './GrowthLight.css';
import Graph from '../components/Graph.js';
import * as API from '../api/apiCalls.js';

import Square from '../components/ContentSquare';
import TimePicker from 'react-time-picker';
import * as functions from '../components/functions.js';





class Lights extends React.Component{
    setIntensity = (event) =>{
        this.setState({strength: event.target.value});
    }
    setStartTime = (event) =>{
        this.setState({startTime: event});
    }
    setEndTime = (event) =>{
            this.setState({endTime: event});
    }
    getTimeDifference= (endTime, startTime) =>{
        const endTimeArray = endTime.split(':');
        const startTimeArray = startTime.split(':');
        let hours = parseInt(endTimeArray[0]) - parseInt(startTimeArray[0]);
        let minutes = parseInt(endTimeArray[1])-parseInt(startTimeArray[1]);
        if(minutes < 0){
            hours--;
            minutes += 60;
        }
        if(hours < 0){
            hours += 24;
        }

        if(String(minutes).length < 2){
            minutes = '0'+minutes;
        }
        return (hours + ":" + minutes);
    }
    updateLight = () =>{
        
        
        this.state.active && document.getElementById(id).appendChild(lightOrb);
        if(this.state.active){
            lightOrb.style.visibility = 'visible';
        }
        else{
            lightOrb.style.visibility = "hidden";
        }
    }
    toggleActive = () =>{
        if(!this.state.active){
            this.lightOn();
        }
        else{
            this.lightOff();
        }
    }

    troll=()=>{
        functions.delayCall(()=>{this.toggleActive(); this.troll();}, 1000);
    }

    lightOn = () =>{
        API.turnLightOn().then((response)=>{
            this.setState({active: true})
        }).catch(error=>console.log(error));
    }
    lightOff= ()=>{
        API.turnLightOff().then((response)=>{
            this.setState({active: false})
        }).catch(error=>console.log(error));
    }
    getLightStatus=()=>{
        if(this.props.stateData.status.server !== false && this.props.stateData.status.server.plug === true){
            API.getLightStatus().then((status)=>{
                this.setState({active: status});
            }).catch((error)=>{
                this.setState({active: null});
            });
        }
    }

   
    state = {
        img: light,
        maxLumens: 1000,
        strength: 100,
        startTime: "00:00",
        endTime: "21:00",
        active: null
    }
    
    componentDidMount(){
        this.getLightStatus();
    }
    render(){
        this.updateLight();
        return(
            <div className="lightContent">
                <div className="contentTop">
                    <Square title={<span>Intensity: {this.state.maxLumens*(this.state.strength/100)}</span>} body={<input type="range" className="intensity-range" onChange={this.setIntensity} value={this.state.strength} min={0} max={100} step={5}/> } width={'25%'}/>
                    <Square title={'Day Cycle'} body={
                    <div>
                            Start:
                            <TimePicker className="TimePicker" value={this.state.startTime} step={30} disableClock={true} onChange={this.setStartTime} clearIcon={null}/>
                            <br/>
                            End:
                            <TimePicker className="TimePicker" value={this.state.endTime} step={30} disableClock={true} onChange={this.setEndTime} clearIcon={null}/>
                            <br/>Time length: {this.getTimeDifference(this.state.endTime, this.state.startTime)}
                    </div> 
                        } width={'25%'} backgroundColor={'rgb(23, 55, 207)'}/>
                        <Square title={'Additional Data'} width={'25%'} body={
                            <div>
                                <button onClick={this.troll}>troll</button>
                            </div>
                        }/>
                        <Square title={'Sets of fours'} body={
                        <div>
                                <p>{this.state.active===null?'NO RESPONSE':this.state.active?'ON':'OFF'}</p>
                                <br/>
                                <button onClick={this.toggleActive}>Toggle Light</button>
                        </div>
                        } width={'25%'} backgroundColor={'rgb(23, 55, 207)'}/>
                </div>
                <div className="contentBottom">
                        <Graph header={'Lumens'} datapoints={functions.feedArray(datapoints, functions.formatHour, 'hour')} max={this.state.maxLumens} Yproperty={'lumens'} Xproperty={'hour'}/>
                </div>
            </div>
        );
    }
}

export let lightOrb = document.createElement('div');
lightOrb.className = "PurpleCircle";
lightOrb.id = "Purple_growth_light";
export const id = 'lightcontrol';
export const img = light;
export const tab = {
    name: 'Light Controls',
    class: 'nav-component-icon',
    click: Lights,
    stateData: null
  };
export const  datapoints = [
    {
        lumens: 200,
        hour: 0
    },
    {
        lumens: 300,
        hour: 1
    },
    {
        lumens: 350,
        hour: 2
    },
    {
        lumens: 400,
        hour: 3          
     },
    {
        lumens: 450,
        hour: 4
    },
    {
        lumens: 500,
        hour: 5
    },
    {
        lumens: 550,
        hour: 6
    },
    {
        lumens: 600,
        hour: 7
    },
    {
        lumens: 650,
        hour: 8
    },
    {
        lumens: 700,
        hour: 9
    },
    {
        lumens: 750,
        hour: 10
    },
    {
        lumens: 800,
        hour:11
    },
    {
        lumens: 850,
        hour: 12
    },
    {
        lumens: 900,
        hour: 13
    },
    {
        lumens: 900,
        hour: 14
    },
    {
        lumens: 1000,
        hour: 15
    },
    {
        lumens: 800,
        hour: 16
    },
    {
        lumens: 700,
        hour: 17
    },
    {
        lumens: 600,
        hour: 18
    },
    {
        lumens: 400,
        hour: 19
    },
    {
        lumens: 300,
        hour: 20
    },
    {
        lumens: 200,
        hour: 21
    },
    {
        lumens: 100,
        hour: 22
    },
    {
        lumens: 100,
        hour: 23
    }
];
export default Lights;