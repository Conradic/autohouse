import React from 'react';
import * as None from '../../../components/None.js';
import * as API from '../deviceApi.js';
import './deviceDisplay.scss';

export default class DeviceList extends React.Component{
    state={
        displayDevices: [],
        displayContent: <None.Loading/>
    }

    getDeviceDisplay=(devices)=>{
        return (
            <div>
            {   devices.map(element => {
                    return (
                    <div key={element.mac} className="individualDevices">
                        Alias: {element.title?element.title:element.alias?element.alias:"N/A"}<br/>
                        <div className="deviceData">
                            Type: {element.type?element.type:"N/A"}<br/>
                            Active: {element.relay_state!==null?element.relay_state?"On":"Off":element.active !== null?element.active?"On":"Off":"N/A"}<br/>
                            <button onClick={this.turnOnDevice.bind(this, element.mac)}>ON</button><button onClick={this.turnOffDevice.bind(this, element.mac)}>OFF</button>

                        </div>
                    </div>
                    );
                })
            }
            </div>
        );
    }


    componentDidMount=()=>{
        API.getTPLinkList().then((data)=>{
            console.log(data);
            let displayContent = this.getDeviceDisplay(data);
            this.setState({displayDevices: data, displayContent});
        })
    }

    turnOffDevice=(mac)=>{
        API.turnLightOff(mac).then((data)=>{
            API.getTPLinkList().then((data)=>{
                let displayContent = this.getDeviceDisplay(data);
                this.setState({displayDevices: data, displayContent});
            })
        })
    }

    turnOnDevice=(mac)=>{
        API.turnLightOn(mac).then((data)=>{
            API.getTPLinkList().then((data)=>{
                let displayContent = this.getDeviceDisplay(data);
                this.setState({displayDevices: data, displayContent});
            })
        })
    }



    render(){
        return(
            <div className="devices">
                {this.state.displayContent}
            </div>
        );
    }
}