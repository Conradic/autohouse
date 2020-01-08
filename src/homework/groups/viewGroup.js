import React from 'react';
import * as API from './GroupApi.js';
import './viewGroups.scss';
import * as assManager from './assManager.js';

export default class ViewGroup extends React.Component{
    state={
        data: {},
        list: [],
        edited: true
    }
    submitChange=(event)=>{
        event.preventDefault();
        let data = {};
        new FormData(event.target).forEach((value, key)=>{
            if(value){
                data[key] = value;
            }
        });
        if(this.props.passer !== 'new'){
            API.updateTask(this.state.data.id, data).then(resp=>{
                console.log(resp);
                this.props.changeContent(assManager);
            });
        }
        else{
            API.createTask(data).then(resp=>{
                console.log(resp);
                this.props.changeContent(assManager);
            });
        }
    }
    componentDidMount=()=>{
        if(this.props.passer !== 'new' && Object.keys(this.state.data).length === 0){
            Promise.all([API.getTaskIDList(), API.getTask(this.props.passer)]).then(results=>{
                this.setState({list: results[0], data: results[1][0]});
                Object.keys(this.state.data).forEach(name=>{
                    this.setIfExist(name);
                });
            });
        }
    }

    
    setIfExist=(val)=>{
        if(val !== null){
            let element = document.getElementById(val);
            if(element){
                element.value = this.state.data[val]; 
            }
        }
    }

    render(){
        return(
            <div>
                <form className="TaskForm" id="taskViewForm" onSubmit={this.submitChange}>
                <table className="taskView">
                    <thead>
                        <tr><th colSpan={4}>{this.state.data.first_name} {this.state.data.middle_name} {this.state.data.last_name}</th></tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="dataTitle">
                                        Title
                                    </div>
                                    <div>
                                        <input type="text" name="title" id="title" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Due Date
                                    </div>
                                    <div>
                                        <input type="text" name="due_date" id="due_date" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Short Description
                                    </div>
                                    <div>
                                        <input type="text" name="short_description" id="short_description" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Description
                                    </div>
                                    <div>
                                        <input type="text" name="description" id="description" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Value
                                    </div>
                                    <div>
                                        <input type="number" name="point_value" id="point_value" autoComplete="off"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <button disabled={!this.state.edited}>Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}