import React from 'react';
import logo from './logo.svg';
import './intro.scss';

export default class Intro extends React.Component {
    render(){
        return(
            <div className="IntroPage">
                    <h1>Colton's React Sandbox!</h1>
                    <img src={logo} className="spinningLogo" alt={"React Logo"}/>
            </div>
        );
    }
}

export const delay = 1000;


