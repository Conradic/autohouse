import React from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

class tabs extends React.Component{
    state = {
        height: 0
    }
    setHeight=()=>{
      this.setState({height: window.innerHeight-20+1.6*this.props.tabs.length});
    }
    
  /**
   * Add event listener
   */
  componentDidMount() {
    this.setHeight();
    window.addEventListener("resize", this.setHeight);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
  }
    render(){
        return this.props.tabs.map((tab) => {
            return (
            <div key={tab.tab.name}>
                <div style={{height: (((this.state.height)/this.props.tabs.length) - (this.props.tabs.length*1))+'px'}} id="heightSetter">
                     <Tab tab={tab} changeContent={this.props.changeContent} />
                </div>
                <div className="nav-divider"></div>
                </div>
                );
        });
    }
}


tabs.propTypes = {
    tabs: PropTypes.array.isRequired
}

export default tabs