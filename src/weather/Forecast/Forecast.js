import React from 'react';
import DailyForecast from './DailyForecast/DailyForecast.js';
import * as functions from '../../components/functions.js';
import * as API from '../../api/apiCalls.js';
import './Forecast.css';
import ForecastPIC from './Forecast.png';
import * as None from '../../components/None.js';
class Forecast extends React.Component{
    state={
        Forecast: None.Loading,
        hourly: null,
        daily: null,
        fullHourly: null,
        data: null
    }
    getForecastData=()=>{
        if(this.props.stateData.local.weather){
            API.fetchEndpoint(this.props.stateData.local.weather.zoning.properties['forecast']).then((data)=>{
                this.setState({daily: data.properties.periods, Forecast: DailyForecast, data: data.properties.periods});
            });
            API.fetchEndpoint(this.props.stateData.local.weather.zoning.properties['forecastHourly']).then((data)=>{
                let data1 = {};
                for(let day = 0; day < 2; day++){
                    data1[day] = {};
                    let hour;
                    for(hour = 0; hour < 24; hour++){
                        data1[day][hour] = data.properties.periods[day*24 + hour];
                    }
                }
                let data2 = data1[0];
                this.setState({hourly: data2, fullHourly: data1});
            });
        }
        else{
            functions.delayCall(this.getForecastData, 1*1000);
        }
    }
    setForecast=(selection)=>{
        let data = null;
        if(selection === 'daily' && this.state.daily !== null){
            data = this.state.daily;
        }
        else if(selection === 'hourly' && this.state.hourly !== null){
            data = this.state.hourly;
            
        }
        if(this.state.Forecast === None.Loading && data !== null){
            this.setState({data, Forecast: DailyForecast})
        }
        else{
            this.setState({data});
        }
    }
    setDay=()=>{
        let day = document.getElementById('day_select').value;
        let data = {};
        if(day === 'daily'){
            data = this.state.daily;
        }
        else if(this.state.fullHourly.length > 0){
            data = this.state.fullHourly[day];
        }
        this.setState({data})
    }
    componentDidMount=()=>{
        this.getForecastData();
    }
    render(){
        return(
        <div>
            <div className="contentHeaderWeather">
                    <span style={{left: '0', position: 'relative', marginLeft: "10px", marginTop: '5px', width: "50%", height: '100%'}}>
                        <select onChange={this.setDay} id="day_select" style={{bottom: '0'}}>
                            <option key={'daily'} value={'daily'}>{"Daily"}</option>
                            <option key={0} value={0}>{"24 Hour"}</option>
                            <option key={1} value={1}>{"Next 24 Hours"}</option>
                        </select>
                    </span>
            </div>
            <div className="contentWeather">
                <this.state.Forecast forecastData={this.state.data}/>
            </div>
        </div>
        );
    }
}

export const id = 'Forecast';
export const img = ForecastPIC;
export const tab = {
    name: 'Forecast',
    class: 'nav-component-icon',
    click: Forecast
  };
export default Forecast;