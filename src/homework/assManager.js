import React from 'react';
import * as API from './taskApi.js';
import AssignmentTable from './tableAssignments.js';
import taskImg from './task.png';
import './assignments.scss';

export default class Assignments extends React.Component{
    state = {
        data: [],
        table: AssignmentTable
    }
    componentDidMount=()=>{
        API.getTaskTable().then(data=>{
            this.setState({data});
        })
    }

    setData=()=>{
        API.getTaskTable().then(data=>{
            this.setState({data});
        })
    }

    viewData=([id, type])=>{
        this.props.setPasserAndChange(id, type);
    }

    render(){
        return(
            <div className="AssManager">
               
                <div>
                    <this.state.table data={this.state.data} viewData={this.viewData}/>
                </div>
            </div>
        );
    }
}

export const id = 'Assignment_Manager';
export const img = taskImg;
export const tab = {
    name: 'Assignment Manager',
    class: 'nav-component-icon',
    click: Assignments
  };