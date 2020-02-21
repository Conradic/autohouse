import React from 'react';
import './nav.scss';

import Tabs from './tab/tabs';
import * as Thermal from '../thermal/ThermalControl';
import * as Airflow from '../airflow/AirflowControl';
import * as Water from '../sprinkler/WaterControl';
import * as Lighting from '../Lighting/GrowthLights';
import * as Settings from '../settings/settings';
import * as MainPage from '../home/MainPage';
import * as None from '../components/None.js';
import * as Status from '../status/status.js';
import * as HomeControl from '../homecontrol/HomeControl.js'
import * as Forecast from '../weather/Forecast/Forecast.js';
import * as Profiler from '../persons/Profiler.js';
import * as Task from '../homework/assManager.js';


export const tabs = {
  standard: [
    MainPage,
    Status,
    Thermal,
    Airflow,
    Water,
    Lighting,
    Forecast,
    Settings,
  ],
  standAlone: [
    MainPage,
    Status,
    Water,
    None,
    Forecast,
    Settings
  ],
  home:[
    Status,
    HomeControl,
    Profiler,
    Task,
    Settings
  ]
};


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: None
    };
  }



  changeContent = (newContent) => {
    if (this.state.active === None) {
      document.getElementById(newContent.id).className = 'nav-component-selected';
      this.setState({ active: newContent });
      this.props.changeContent(newContent);
    }
    else if (this.state.active === newContent) {
      this.props.changeContent(newContent);
    }
    else {
      document.getElementById(this.state.active.id).className = 'nav-component';
      document.getElementById(newContent.id).className = 'nav-component-selected';
      this.setState({ active: newContent });
      this.props.changeContent(newContent);
    }
  }

  componentDidMount = () => {
    this.changeContent(Status);
  }
  

  render() {
    return (
      <span className="nav">
        <div className="nav-divider"></div>
        <Tabs tabs={this.props.tab} changeContent={this.changeContent} />
      </span>
    );

  }
}


export default Nav;