import React from 'react';
import fan from './fanicon.png';
import Square from '../components/ContentSquare';
import * as None from '../components/None.js';

class Airflow extends React.Component{
    state = {
        speed: 50
    }
    render(){
        return(
            <div>
            <div className="contentTop">
                    <Square title={'Power Cost'} body={<None.Empty/>}/>
                    <Square title={'Time sets'} body={<None.Empty/>}/>
                    <Square title={'Additional Data'} body={<None.Empty/>}/>
                    <Square title={'Sets of fours'} body={<None.Empty/>}/>
                </div>
            <div className="contentBottom">
                I'm a fan.
                <None.Empty/>
            </div>
            </div>
        );
    }
}

export const id = 'aircontrol';
export const img = fan;
export const tab = {
    name: 'Airflow',
    class: 'nav-component-icon fan',
    click: Airflow,
    stateData: null
  };
export default Airflow;