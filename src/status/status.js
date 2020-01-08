import React from 'react';
import APIState from './apiStates.js';
import status from './status.png';
import './status.css';

class Status extends React.Component {

  makeStates = () => {
    return Object.keys(this.props.stateData.status).map((connection) => {
      return (
        <APIState status={this.getStatus(connection)} title={connection} key={connection} children={this.props.stateData.status[connection]} />
      )
    });
  }

  getStatus = (connection) => {
    if (this.props.stateData.status[connection] === false) {
      return 'inactive-Light';
    }
    else if (this.props.stateData.status[connection] === null) {
      return 'awaiting-Light';
    }
    else {
      return 'active-Light';
    }
  }


  render() {
    return (
      <div className="statuscontent">
        <div></div>
        <div className="statusHolder">
          {
            Object.keys(this.props.stateData.status).map((connection) => {
              return (
                <APIState status={this.getStatus(connection)} title={connection} key={connection} children={this.props.stateData.status[connection]} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Status;
export const id = 'status';
export const img = status;
export const tab = {
  name: 'Network Status',
  class: 'nav-component-icon',
  click: Status,
  stateData: null
};