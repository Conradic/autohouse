import React from 'react';
import PropTypes from 'prop-types';

class tab extends React.Component {
    render(){
        const tab = this.props.tab;
        return(
                <div className="nav-component" onClick={this.props.changeContent.bind(this, tab)} id={tab.id}> 
                    <img src={tab.img?tab.img:null} className={tab.tab.class?tab.tab.class:null} alt={tab.tab.name?tab.tab.name:null}/>
                </div>
        )
    }
}

tab.propTypes = {
    tab: PropTypes.object.isRequired
}

export default tab