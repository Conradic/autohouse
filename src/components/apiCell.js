import React from 'react';
import * as None from './None.js';
import * as API from '../api/apiCalls.js';
import * as Objectifier from '../altering/Objectifier.js';

export class ApiCell extends React.Component{
    state ={
        item: <None.Loading/>,
        data: {},
        set: false
    }

    setData=(data)=>{
        this.setState({data});
            this.setState({item: <Objectifier.Mapper stateData={this.state.data} id="1" path={""} setPath={function(){}}/>, set: true});
        
    }
    setPath=(path, num)=>{
        let pathH = this.state.path;
        pathH[num] = path;
        this.setState({path: pathH});
    }
    componentDidMount=()=>{
        API.loopAPICall(this.props.api, this.setData, 2*1000);
    }
    render(){
        return(
            <div>
                {this.state.item}
            </div>
        );
    }
}

export default ApiCell;