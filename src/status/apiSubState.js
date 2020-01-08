import React from 'react';
import './apiSubState.css';

class APISubState extends React.Component {
    children=()=>{
        if(!this.props.children){
          return;
        }
        else{
          return Object.keys(this.props.children).map((child)=>{
            return <APISubState status={this.getStatus(child)} title={child} key={child} children={this.props.children[child]}/>
          });
        }
      }
      getStatus=(child)=>{
        if(this.props.children[child] === false){
          return 'inactive-Light';
        }
        else if(this.props.children[child] === null){
          return 'awaiting-Light';
        }
        else{
          return 'active-Light';
        }
      }
    render() {
        return (
            <div>
                <div className="subStateHolder">
                    <div className={this.props.status}></div>
                    <div className="apiTitle">{this.props.title}</div>
                </div>
                {this.children()}
                </div>
        );
    }
}



export default APISubState;