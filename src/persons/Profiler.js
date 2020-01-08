import React from 'react';
import * as API from './personApi.js';
import PersonsTable from './tablePersons.js';
import * as ViewProfile from './viewProfile.js';
import profileImg from './profile.png';
import './Profiler.scss';


export default class People extends React.Component{
    state = {
        people: [],
        selected: null
    }
    componentDidMount=()=>{
        API.getPersonList().then(people=>{
            this.setState({people});
        });
    }
    viewProfile=(id)=>{
        this.props.setPasserAndChange(id, ViewProfile);
    }

    render(){
        return(
            <div className="Profiler">
                <PersonsTable data={this.state.people} viewProfile={this.viewProfile}/>
            </div>
        );
    }
}

export const id = 'Profiler';
export const img = profileImg;
export const tab = {
    name: 'Profiles',
    class: 'nav-component-icon',
    click: People
  };