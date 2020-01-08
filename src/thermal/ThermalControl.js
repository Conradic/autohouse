import React from 'react';
import thermometer from './themometer.png';
import Square from '../components/ContentSquare';
import * as None from '../components/None.js';

class Thermal extends React.Component{
    state = {
        temperature: 70
    }
    render(){
        return(
            <div className="pageContent">
                <div className="contentTop">
                    <Square title={'temperatures'} body={<None.Empty/>}/>
                    <Square title={'Graphs'} body={<None.Empty/>}/>
                    <Square title={'Additional Data'} body={<None.Empty/>}/>
                    <Square title={'Sets of fours'} body={<None.Empty/>}/>
                </div>
                <div className="contentBottom">
                    Temperature
                    <None.Empty/>
                </div>

            </div>
        );
    }
}

export const id = 'thermalcontrol';
export const img = thermometer;
export const tab = {
    name: 'Temp Control',
    class: 'nav-component-icon',
    click: Thermal,
    stateData: null
  };
export default Thermal;