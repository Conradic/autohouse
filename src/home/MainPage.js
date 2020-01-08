import React from 'react';
import logo from './logo.svg';
import './MainPage.css';
import Square from '../components/ContentSquare';
import Graph from '../components/Graph.js';
import * as None from '../components/None.js';
import * as functions from '../components/functions.js';


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            graph: None.Loading, 
            sunset: '', 
            temperature: [], 
            maxTemp: -120 };
    }

    getSunrise = (data) => {
        let hour = data.results.sunrise;
        const sets = hour.split(':');
        sets[0] = parseInt(sets[0]) - 5;
        return sets.join(':');
    }
    getSunset = (data) => {
        let hour = data.results.sunset;
        const sets = hour.split(':');
        sets[0] = parseInt(sets[0]) - 5;
        if (sets[0] < 0) {
            sets[0] += 12;
            let change = sets[2].split(' ');
            if (change[1] === 'AM') {
                change[1] = 'PM';
                sets[2] = change.join(' ');
            }
            else {
                change[1] = 'AM';
                sets[2] = change.join(' ');
            }
        }
        return sets.join(':');
    }
    getDataPoints = () => {
        if (this.props.stateData.local.temperature !== []) {
            return this.props.stateData.local.temperature;
        }
        else {
            return [];
        }
    }




    setData = () => {
        if (this.props.stateData.local) {
            if (this.props.stateData.local.sunset) {
                let data = this.props.stateData.local.sunset;
                let sunrise = 'Sunrise: ' + this.getSunrise(data);
                let sunset = 'Sunset: ' + this.getSunset(data);
                this.setState({ sunset, sunrise });
            }
            if (this.props.stateData.local.weather) {
                const key = 'apparentTemperature';
                let data = this.props.stateData.local.weather.properties[key];

                if (!data.formatted) {
                    data.values = functions.feedArray(data.values, functions.formatTimeMoment, 'validTime');
                    data.values = functions.feedArray(data.values, functions.formatDecimal, 'value');
                    data.values = functions.feedArray(data.values, functions.formatValueByType, 'value', data.uom);

                    if (data.uom === 'unit:degC') {
                        data.uom = "unit:degF";
                    }
                    else if (data.uom === 'unit:mm') {
                        data.uom = "unit:in"
                    }
                    let max = null;
                    for (let i = 0; i < data.values.length; i++) {
                        if (parseInt(data.values[i].value) > max || max === null) {
                            max = data.values[i].value;
                        }
                    }
                    data.max = max;
                    data.formatted = true;
                }
                    let scope = [];
                    data.values.forEach((data) => {
                        scope.push({ temp: data.value, time: data.validTime });
                    });
                    this.setState({ temperature: scope, graph: Graph });


            }
        }
    }
    componentDidMount() {
        this.setData();
    }

    getMaxTemp = (start, stop) => {
        if (this.state.temperature.length > 0) {
            const temps = this.state.temperature;
            let max = parseInt(temps[start].temp);
            for (let i = start; i < stop; i++) {
                if (max === null || parseInt(temps[i].temp) > max) {
                    max = parseInt(temps[i].temp);
                }
            }
            return max;
        }
        else {
            return 0;
        }
    }
    getDayStart = (day) => {
        if (this.state.temperature.length === 0) {
            return 0
        }
        day = parseInt(this.state.temperature[0].time.split('/')[1]) + day;

        let i;
        for (i = 0; i < this.state.temperature.length; i++) {
            if (parseInt(this.state.temperature[i].time.split('/')[1]) === day) {
                return i;
            }
        }
        return 0;
    }

    getDayEnd = (day) => {
        if (this.state.temperature.length === 0) {
            return 1
        }
        day = parseInt(this.state.temperature[0].time.split('/')[1]) + day + 1;

        let i;
        for (i = 0; i < this.state.temperature.length; i++) {
            if (parseInt(this.state.temperature[i].time.split('/')[1]) === day) {
                return i;
            }
        }
        return 0;
    }

    render() {
        return (
            <div>
                <div className="contentTop">
                    <Square title={'Week Day'} />
                    <Square title={'Time sets'} body={<div>{this.state.sunrise} <br/> {this.state.sunset}</div>} />
                    <Square title={'Additional Data'} body={<None.Empty/>}/>
                    <Square title={'Sets of fours'} body={<None.Empty/>} />
                </div>
                <div className="MainPageContent">
                    <img src={logo} className="Home-logo" alt="logo" />
                </div>
                <div className="contentBottom">
                    <div className="inline">
                        <this.state.graph header={this.state.temperature.length > 0 ? this.state.temperature[this.getDayStart(0)].time.split('T')[0] : ''} datapoints={this.state.temperature.slice(this.getDayStart(0), this.getDayEnd(0))} max={this.getMaxTemp(this.getDayStart(0), this.getDayEnd(0))} Yproperty={'temp'} Xproperty={'time'} />
                    </div>
                    <div className="inline">
                        <this.state.graph header={this.state.temperature.length > 0 ? this.state.temperature[this.getDayStart(1)].time.split('T')[0] : ''} datapoints={this.state.temperature.slice(this.getDayStart(1), this.getDayEnd(1))} max={this.getMaxTemp(this.getDayStart(1), this.getDayEnd(1))} Yproperty={'temp'} Xproperty={'time'} />
                    </div>
                    <div className="inline">
                        <this.state.graph header={this.state.temperature.length > 0 ? this.state.temperature[this.getDayStart(2)].time.split('T')[0] : ''} datapoints={this.state.temperature.slice(this.getDayStart(2), this.getDayEnd(2))} max={this.getMaxTemp(this.getDayStart(2), this.getDayEnd(2))} Yproperty={'temp'} Xproperty={'time'} />
                    </div>
                </div>
            </div>
        );
    }
}

export const id = 'mainPage';
export const img = logo;
export const tab = {
    name: 'home',
    class: 'nav-component-icon react',
    click: MainPage
};



export default MainPage;