import React from 'react';
import './serverUI.scss';
import ServerAPI from './serverUIAPI.js/index.js';


export default class ServerUI extends React.Component{


    render(){
        return(
            <div className="ServerUIContainer">
                <div className="verticalSplit">
                    <div>
                        sect 1
                    </div>
                </div>
                <div className="verticalSplit">
                    <div>
                        sect 2
                    </div>
                </div>
            </div>
        );
    }
}