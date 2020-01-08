import React from 'react';
import './apiStates.css';
import APISubState from './apiSubState.js';

class APIState extends React.Component {
  children=()=>{
    if(!this.props.children){
      return;
    }
    else{
      return Object.keys(this.props.children).map((child)=>{
        return <APISubState status={this.getStatus(child)} title={child} key={child} children={this.props.children[child]}/>
      });
    }
  }
  getStatus=(child)=>{
    if(this.props.children[child] === false){
      return 'inactive-Light';
    }
    else if(this.props.children[child] === null){
      return 'awaiting-Light';
    }
    else{
      return 'active-Light';
    }
  }
  render(){
    return (
      <div className="holder">
        <div className="stateHolder">
          <div className={this.props.status}></div>
          <div className="apiTitle">{this.props.title}</div>
        </div>
        {this.children()}
      </div>
    );
  }
}

export default APIState;