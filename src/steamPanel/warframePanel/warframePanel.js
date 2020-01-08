import React from 'react';
import * as API from '../../api/apiCalls.js';
import * as None from '../../components/None.js';
import * as Objectifier from '../../altering/Objectifier.js';
import * as functions from '../../components/functions.js';
import './warframePanel.css';
import moment from 'moment';


class warFrameLoader extends React.Component{
    state={page: <None.Loading/> }
    componentDidMount=()=>{API.makeAPICall('https://api.warframestat.us/pc', this.createPage, 1*1000);}
    createPage=(data)=>{this.setState({page: <WarframePanel data={data}/>});}
    render(){return(<div className="host">{this.state.page}</div>);}
}

class WarframePanel extends React.Component{
    state={
        square1: <None.Loading/>,
        path: ""
    }

    sortie=()=>{
        let num = 1;
        return (
            <div style={{width: "100%"}}>
                <div className="smallTitle">Sortie: </div>
                <div className="smallTitle">
                End: {functions.formatTimeMoment(this.props.data.sortie.expiry)}</div>
                <div>
                    {this.props.data.sortie.variants.map((variant)=>{
                        return(
                            <div className="smallSet">
                                <div style={{display:"flex"}}>{num++}</div>
                               <div><span style={{left: "0", display: "flex"}}>Type: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{variant['missionType']}</span></div>
                               <div><span style={{left: "0", display: "flex"}}>Modifier: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{variant['modifier']}</span></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    voidTrader=()=>{
        let num = 1;
        return (
            <div style={{width: "100%"}}>
                <div className="smallTitle">Void Trader: </div>
                
                {Object.keys(this.props.data.voidTrader.inventory).length === 0?
                    (
                    <div className="smallTitle">
                        Start: {functions.formatTimeMoment(this.props.data.voidTrader.activation)}
                    </div>
                    ):( 
                    <div>
                        <div className="smallTitle">
                            End: {functions.formatTimeMoment(this.props.data.voidTrader.expiry)}
                        </div>
                    <div style={{overflowY: 'auto'}}>
                        {Object.keys(this.props.data.voidTrader.inventory).map((variant)=>{
                            return(
                                <div className="smallSet">
                                    <div style={{display:"flex"}}>{num++}</div>
                                    <div><span style={{left: "0", display: "flex"}}>Type: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{this.props.data.voidTrader.inventory[variant]['missionType']}</span></div>
                                    <div><span style={{left: "0", display: "flex"}}>Modifier: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{this.props.data.voidTrader.inventory[variant]['modifier']}</span></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )}
            </div>
        );
    }
    globalUpgrades=()=>{
        return (
            <div style={{width: "100%"}}> 
                    <div className="smallTitle">Global Upgrades: </div>
                        {this.props.data.globalUpgrades.map((variant)=>{
                            return(
                                <div className="dataSect smallSet" key={variant}>
                                    {variant['upgrade'] +" "+ variant['operation'] +" "+ variant['operationSymbol'] +" "+ variant['upgradeOperationValue']}
                                    <div>
                                        <div><span style={{left: "0", display: "flex"}}>ETA: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{this.newDate(variant.eta)}</span>
                                        </div>
                                        <div><span style={{left: "0", display: "flex"}}>Desc: </span><span style={{display: "flex", marginLeft: "15%", color: "silver"}}>{variant['desc']}</span></div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    }

    newDate=(eta)=>{
        console.log(eta);
        let data = eta.split('d');
        const day = data[0];
        data = data[1].split('h');
        const hours = data[0];
        data = data[1].split('m');
        const minutes = data[0];
        data = data[1].split('s');
        const seconds = data[0];

        console.log(`d: ${day}, h: ${hours}, m: ${hours}, : ${hours}`);
        let date = new moment();
        console.log(date.format('MM/DD/YY HH:MM:SS'));
        date.set({day: date.get('day')+day, hour:date.get('hour')+hours, minute:date.get('minutes')+minutes, second:date.get('seconds')+seconds});
        console.log(date.format('MM/DD/YY HH:MM:SS'));
        return date.toDate().toString();
    }

    render(){
        return(
            <div className="host">
                <div className="contentTopWarframe">
                    <div className="sectionSpan">
                        {this.sortie()}
                    </div>
                    <div className="sectionSpan">
                        {this.voidTrader()}
                    </div>
                    <div className="sectionSpan">
                        {this.globalUpgrades()}
                    </div>
                </div>
                <div className="contentBottomWarframe">
                    {this.state.path}
                <Objectifier.Mapper stateData={this.props.data} id="1" path={""} setPath={(path)=>{this.setState({path})}}/>
                </div>
            </div>
        );
    }
}


export const id = 'warframe';
export const img = null;
export const tab = {
    name: 'Warframe',
    class: 'nav-component-icon warframe',
    click: WarframePanel
  };

export default warFrameLoader;