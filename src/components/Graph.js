import React from 'react';
import './Graph.css';

class Graph extends React.Component{
    render(){
        this.barcount = 0;
        this.getWidth = () =>{
            let width = 84;
            return (width/(Array.isArray(this.props.datapoints)?this.props.datapoints:[]).length);
        }
        this.getHeight = (dataset) =>{
            return (dataset[this.props.Yproperty]/this.props.max)*100;
        }
        return(
            <div className="graphHolder">
            <span className="graphHeader">{this.props.header}</span>
                <div className="height"><div className="midMark">{this.props.max}</div></div>
                {
                    (Array.isArray(this.props.datapoints)?this.props.datapoints:[]).map((dataset)=>{
                        this.barcount++;
                        return(
                            <div className="bars" style={{width: this.getWidth()+'%'}} key={this.barcount} title={dataset[this.props.Xproperty]}>
                            <div className="hour"></div>
                                <div className="bar" style={{height: (this.getHeight(dataset)+'%')}}>{dataset[this.props.Yproperty]}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Graph;


