import React from 'react';
import * as API from '../api/apiCalls.js';
import * as None from './None.js';

export class pageLoader extends React.Component{
    state={
        page: <None.Loading/>
    }

    componentDidMount=()=>{
        API.makeAPICall(this.props.url, this.createPage, 1*1000);
    }

    createPage=()=>{
        this.setState({page: this.props.page});
    }

    render(){
        return(
            <div>
                {this.state.page}
            </div>
        );
    }
}


export default pageLoader;