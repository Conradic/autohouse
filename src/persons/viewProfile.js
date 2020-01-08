import React from 'react';
import * as API from './personApi.js';
import './viewProfile.scss';
import * as Profiler from './Profiler.js';

class ViewProfile extends React.Component{
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
            API.updatePerson(this.state.data.id, data).then(resp=>{
                document.getElementById("alertHeader").textContent = resp;
                this.props.changeContent(Profiler);
            });
        }
        else{
            API.createPerson(data).then(resp=>{
                document.getElementById("alertHeader").textContent = resp;
                this.props.changeContent(Profiler);
            });
        }
    }
    viewProfile=(id)=>{
        API.getPerson(id).then(results=>{
            this.setState({data: results[0]});
            document.getElementById('note').value = this.state.data.note;
            document.getElementById('significant_other_id').value = this.state.data.significant_other_id;
        });
    }
    componentDidMount=()=>{
        if(this.props.passer !== 'new' && Object.keys(this.state.data).length === 0){
            Promise.all([API.getPersonIDList(), API.getPerson(this.props.passer)]).then(results=>{
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
                <div id="alertHeader" className="headBand"></div>
                <form className="ProfileForm" id="profileViewForm" onSubmit={this.submitChange}>
                <table className="profileView">
                    <thead>
                        <tr><th colSpan={4}>{this.state.data.first_name} {this.state.data.middle_name} {this.state.data.last_name}</th></tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="dataTitle">
                                        First Name
                                    </div>
                                    <div>
                                        <input type="text" name="first_name" id="first_name" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Middle Name
                                    </div>
                                    <div>
                                        <input type="text" name="middle_name" id="middle_name" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Last Name
                                    </div>
                                    <div>
                                        <input type="text" name="last_name" id="last_name" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Email
                                    </div>
                                    <div>
                                        <input type="text" name="email" id="email" autoComplete="off"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="dataTitle">
                                        Address
                                    </div>
                                    <div>
                                        <input type="text" name="address" id="address" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        City
                                    </div>
                                    <div>
                                        <input type="text" name="city" id="city" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        State
                                    </div>
                                    <div>
                                        <input type="text" name="state" id="state" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Zip Code
                                    </div>
                                    <div>
                                        <input type="text" name="zip_code" id="zip_code" autoComplete="off"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="dataTitle">
                                        Job Title
                                    </div>
                                    <div>
                                        <input type="text" name="job_title" id="job_title" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Birthday
                                    </div>
                                    <div>
                                        <input type="text" name="birthday" id="birthday" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Height
                                    </div>
                                    <div>
                                        <input type="text" name="height" id="height" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Relationship Status
                                    </div>
                                    <div>
                                        <input type="text" name="relationship_status" id="relationship_status" autoComplete="off"></input>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="dataTitle">
                                        Company
                                    </div>
                                    <div>
                                        <input type="text" name="company" id="company" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Religion
                                    </div>
                                    <div>
                                        <input type="text" name="religion" id="religion" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Education
                                    </div>
                                    <div>
                                        <input type="text" name="education" id="education" autoComplete="off"></input>
                                    </div>
                                </td>
                                <td>
                                    <div className="dataTitle">
                                        Significant Other
                                    </div>
                                    <div>
                                        <select id="significant_other_id" name="significant_other_id" form="profileViewForm">
                                            <option value="0">None</option>
                                            {
                                                this.state.list.map(person=>{
                                                     return(
                                                        <option value={person.id} key={person.id}>{person.first_name+", "+person.last_name}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                        {
                                            (this.state.data.significant_other_id!=='0'&&this.state.data.significant_other_id!==null)?(<input type="button" onClick={this.viewProfile.bind(this, this.state.data.significant_other_id)} value="View Profile"/>):null
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    
                                </td>
                                
                                <td colSpan={2}>
                                    <div style={{fontSize: ".6em"}}>
                                        Notes
                                    </div>
                                    <div>
                                        <textarea id="note" name="note"></textarea>
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

export default ViewProfile;