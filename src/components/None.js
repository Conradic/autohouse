import React from 'react';
import Void from './void.png';

export class Loading extends React.Component{
    state ={}
    render(){
        return (
            <div>
                Loading
            </div>
        );
    }
}

export class Empty extends React.Component{
    state ={}
    render(){
        return (
            <div>
                No Content Available
            </div>
        );
    }
}
class None extends React.Component{
    state ={}
    render(){
        return (
            <div>
                None
            </div>
        );
    }
}
export default None;
export const emptyCall=(param)=>{};
export const id = 'none';
export const img = Void;
export const tab = {
    name: 'None',
    class: 'nav-component-icon void',
    click: None
}
