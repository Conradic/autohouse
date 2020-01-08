import React from 'react';
import rain from './rainIcon.png';
import Square from '../components/ContentSquare';
import * as None from '../components/None.js';
import Graph from '../components/Graph.js';
import * as functions from '../components/functions.js';
import ApiCell from '../components/apiCell.js';

class Sprinklers extends React.Component {
    state = {
        img: rain,
        moisture: 0,
        contentBottom: <None.Empty />
    }
    getDay = () => {
        if (this.props.stateData.local.weather)
            return functions.formatTimeMoment((this.props.stateData.local.weather.properties.validTimes)).split(' ')[0];
        else
            return <None.Loading />;
    }
    generateOptions = () => {
        if(this.props.stateData.local.weather){
        let data = this.props.stateData.local.weather.properties;
        return Object.keys(data).map((key) => {
            if (typeof data[key] === 'object' && data[key].values) {
                return (<option value={key} key={key}>{key}</option>);
            }
            else{
                return null;
            }
        }, data);
    }
    }
    getLocation=()=>{
        if(this.props.stateData.status.location){
            return(
            <div>
                <div><span>Lat: {this.props.stateData.local.location['latitude']}</span></div>
                <div> <span>Lon: {this.props.stateData.local.location['longitude']}</span></div>
            </div>);
        }
        else{
            return (<None.Empty />);
        }
    }
    getChart = () => {
        let key = document.getElementById('graphSetter').value;
        if (key === 'null') {
            this.setState({ contentBottom: (<None.Empty />) });
        }
        else {
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
            this.setState({ contentBottom: (<Graph header={key+': '+data.uom} datapoints={data.values} max={data.max} Yproperty={'value'} Xproperty={'validTime'} />) });
        }

    }
    componentDidMount = () => {
        this.setState({ contentBottom: <None.Empty /> });
    }
    render() {
        return (
            <div className="pageContent">
                <div className="contentTop">
                    <Square title={'Weather Data'} body={
                        <select onChange={this.getChart} id="graphSetter">
                            <option value="null">--Select One--</option>
                            {this.generateOptions()}
                        </select>
                    } />
                    <Square title={'Time sets'} body={this.getDay()} />
                    <Square title={'Location'} body={this.getLocation()} />
                    <Square title={'Sets of fours'} body={<ApiCell api="https://api.warframestat.us/pc"/>} />
                </div>
                <div className="contentBottom" id="bottomContent">
                    {this.state.contentBottom}
                </div>
            </div>
        );
    }
}

export const id = 'watercontrol';
export const img = rain;
export const tab = {
    name: 'Water Controls',
    class: 'nav-component-icon',
    click: Sprinklers
};
export default Sprinklers;