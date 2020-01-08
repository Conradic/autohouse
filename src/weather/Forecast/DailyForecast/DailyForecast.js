import React from 'react';
import DailyForecastSquare from './DailyForecastSquare.js';



class DailyForecast extends React.Component{
    children=()=>{
        if(!this.props.forecastData){
          return;
        }
        else{
          return Object.keys(this.props.forecastData).map((data)=>{
            return <DailyForecastSquare data={this.props.forecastData[data]} key={data}/>
          });
        }
      }
      render(){
        return (
          <div className="weatherHolder">
            {this.children()}
          </div>
        );
      }
}

export default DailyForecast;