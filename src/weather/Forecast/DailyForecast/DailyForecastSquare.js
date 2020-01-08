import React from 'react';
import * as functions from '../../../components/functions.js';


class DailyForecastSquare extends React.Component{
    getTempColor=(temp)=>{
        let avg = 60;
        let color = 255*(temp/120);
        if(temp>avg){
            return `rgb(${color+100}, 100, ${100-color})`;
        }
        else{
            return `rgb(${100-color}, 100, ${color+100})`;
        }
    }
    getTitle=()=>{
        if(this.props.data.name === ""){
            let date = functions.formatTimeMoment(this.props.data.startTime);
            return date;
        }
        else{
            return this.props.data.name;
        }
    }
      render(){
        return (
          <div className="dailySquare" title={this.props.data.detailedForecast}>
              <div className="dailySquareInside">
                <div className="dailySquareName">
                    {this.getTitle()}
                </div>
                <br/>
                
                <div className="dailySquareTemp" style={{color: this.getTempColor(this.props.data.temperature)}}>
                    <span style={{color: "rgb(255,255,255)"}}>Temperature: <br/></span>
                    {this.props.data.temperature}
                    <span style={{color: 'rgb(255,255,255)'}}>°{this.props.data.temperatureUnit}</span>
                    
                </div>
                <br/>
                <div className="dailySquareWind">
                    Wind: <br/>
                    {this.props.data.windSpeed}
                    {" "+this.props.data.windDirection}
                </div>
                <br/>
                <div className="dailySquareDescription">
                    Forecast: <br/>
                    {this.props.data.shortForecast}
                </div>
              </div>
          </div>
        );
      }
}

export default DailyForecastSquare;