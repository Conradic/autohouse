import React from 'react';
import './ContentSquare.css';

class contentSquare extends React.Component{
    render(){
        return(
            <div className="contentSquare-tile"  style={{width: this.props.width, backgroundColor: this.props.backgroundColor}} >
                <div className="contentSquare-title">{this.props.title}</div>
                <br/>
                <div className="contentSquare-body">{this.props.body} </div>
            </div>
        );
    }
}


export default contentSquare;