import React from 'react';
import SelectSet from './SelectSet.js';
import './Objectifier.css';
//require('../components/LinkedList.js');
//import LinkedList from '../components/LinkedList.js'

export class Mapper extends React.Component {
    state = {
        display: null,
        selects: null,
        head: null,
        path: 'Path: this.props.stateData'
    }
    

    componentDidMount = () => {
        if(this.props.stateData !== null){
            this.setState({
                head: 
                    <SelectSet obj={this.props.stateData} depth={0} clearChild={null} setPath={this.setPath}/>
            });
        }
    }

    setPath=(path)=>{
        this.setState({path: 'Path: this.props.stateData'+path});
        this.props.setPath('this.props.stateData'+path, this.props.id);
    }
    render() {
        //this.setState({path: this.state.head.getPath()});
        return (
            <div className="MapHolder">
                {this.props.path}
                {this.state.head}
            </div>
        );
    }
}

export default Mapper;