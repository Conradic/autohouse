import React from 'react';
import * as Nav from './nav/nav.js';
import * as None from './components/None.js';
import './Dashboard.css';

class Dashboard extends React.Component {
    state = {
        content: None,
        tab: 'home',
        passer: ""
    }

    changeContent = (newContent, ) => {
        this.setState({ content: newContent });
    }
    renderContent = () => {
        this.changeContent(this.state.content);
    }

    changeTab = (e) => {
        if (e.target.value !== 'empty') {
            this.setState({ tab: e.target.value });
        }
    }

    setPasserAndChange = (newData, newContent)=>{
        this.setState({passer: newData, content: newContent});
    }

    render() {
        return (
            <header className="Dashboard-header">
                <div className="navBar">
                    <Nav.default changeContent={this.changeContent} tab={Nav.tabs[this.state.tab]} id="navi"/>
                </div>
                <div className="content" id="content">
                    <this.state.content.default stateData={this.props.stateData} render={this.renderContent} changeTab={this.changeTab} tab={this.state.tab} changeContent={this.changeContent} passer={this.state.passer} setPasserAndChange={this.setPasserAndChange}/>
                </div>
            </header>
        );
    }
}
export default Dashboard;
