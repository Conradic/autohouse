import React from 'react';

export default class TaskHeader extends React.Component{
    state={
        quickBar: []
    }

    createLinks=()=>{
        return this.state.quickBar.map((bar)=>{
            <span>
                {bar.tab.name}
                <button onClick={this.props.setData.bind(this, bar.type)}>^</button>
            </span>
        })
    }

    render(){


        return(
            <div className="header">
                {this.createLinks()}
            </div>
        );
    }
}