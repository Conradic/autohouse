import React from 'react';
import cog from './cog.svg';
import Square from '../components/ContentSquare';
import * as None from '../components/None.js';
import * as Objectifier from '../altering/Objectifier.js';
import * as nav from '../nav/nav.js';
import './settings.css';

class Settings extends React.Component{
    state = {
        path: ['Path: this.props', 'Path: this.props']
    }
    setPath=(path, num)=>{
        let pathH = this.state.path;
        pathH[num] = path;
        this.setState({path: pathH});
    }
    componentDidMount=()=>{
        document.getElementById('tabSelector').value = this.props.tab;
    }
    render(){
        return(
            <div>
            <div className="contentTop">
                    <Square title={'Camera'} body={<None.Empty/>}/>
                    <Square title={'Shut Down'} body={<None.Empty/>}/>
                    <Square title={'See Assignments'} body={<None.Empty/>}/>
                    <Square title={'Tab set'} body={
                        <select onChange={this.props.changeTab.bind(this)} id="tabSelector">
                            <option value="empty">--Select One--</option>
                            {
                                Object.keys(nav.tabs).map((tabset)=>{
                                    return(<option key={tabset} value={tabset}>{tabset}</option>)
                                })
                            }
                        </select>
                    }/>
                </div>
            <div className="contentBottom">
                <div className="contentBottomLeft">
                    <Objectifier.Mapper stateData={this.props.stateData} id="1" path={this.state.path[1]} setPath={this.setPath}/>
                </div>
            </div>
            </div>
        );
    }
}

export const id = 'settings';
export const img = cog;
export const tab = {
    name: 'Settings',
    class: 'nav-component-icon cog',
    click: Settings,
    stateData: null
  };
export default Settings;