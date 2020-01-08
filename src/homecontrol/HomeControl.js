import React from 'react';
import * as API from '../api/apiCalls.js';
import Square from '../components/ContentSquare';
import homeControlImg from './homeControl.png';
import * as None from '../components/None.js';
import DeviceList from './devices/deviceDisplay/deviceDisplay.js';

class HomeControl extends React.Component {
    state={
        thermostat: {
            hvac_mode: 'off',
            target: 69
        }
    }
    componentDidMount=()=>{
      //  API.getNestData(this.setThermostat);
      this.solveOne();
    }

    setThermostat=(thermostat)=>{
        this.setState({thermostat: thermostat});
        console.log(thermostat);
        if(thermostat.hvac_mode !== undefined){
            document.getElementById('nestState').value = thermostat.hvac_mode;
            document.getElementById('nestState').disabled = false;
        }
        else{
            document.getElementById('nestState').disabled = false;
        }
    }

    setAll=(status)=>{
        API.setAllLights(status);
    }

    solveOne=()=>{
        
    }

    render() {
        return (
            <div>
                <div className="contentTop">
                    <Square title={'Lights'} body={
                        <div>
                            <p>{}</p>
                            <br />
                            <button onClick={this.setAll.bind(this, true)}>Turn On</button>
                            <button onClick={this.setAll.bind(this, false)}>Turn Off</button>
                        </div>
                    } width={'25%'} />
                    <Square title={'Temperature'} body={
                            <select disabled onChange={API.setNestHVAC.bind(this.value)} id="nestState">
                                <option value="heat">Heat</option>
                                <option value="cool">Cool</option>
                                <option value="heat-cool">Heat-Cool</option>
                                <option value="eco">ECO</option>
                                <option value="off">Off</option>
                            </select>
                    } />
                    <Square title={'Additional Data'} body={<div>Sum<div><textarea id="textAreaOFInterest"></textarea></div><text id="answer"></text><button onClick={this.solveOne}></button></div>} />
                    <Square title={'Sets of fours'} body={<DeviceList />} />
                </div>
                <div className="contentBottom">
                    <None.Empty />
                </div>
            </div>
        );
    }
}

export const id = 'Home Control';
export const img = homeControlImg;
export const tab = {
    name: 'Home Control',
    class: 'nav-component-icon',
    click: HomeControl
};
export default HomeControl;