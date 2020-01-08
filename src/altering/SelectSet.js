import React from 'react';
import * as None from '../components/None.js';
import './SelectSet.css';

class SelectSet extends React.Component {

    state = {
        title: this.props.obj?String(this.props.obj.constructor.name):"",
        select: <None.Empty />,
        child: null,
        selected: null,
        depth: this.props.depth
    }

    makeSelectOfObject = (obj) => {
        if(obj && Object.keys(obj).length > 0){
            this.setState({
                child:
                    <div><SelectSet obj={obj} depth={this.props.depth + 1} clearChild={this.clearChild} setPath={this.setPath}/></div>
            });
        }
    }

    selectChange = (selected) => {
        if (this.props.obj && selected) {
            
            if(Array.isArray(this.props.obj)){
                this.setState({selected: '['+selected+']'});
                this.setPath('['+selected+']');
            }
            else{
                this.setState({selected: '.'+selected});
                this.setPath('.'+selected);
            }
            this.makeSelectOfObject(this.props.obj[selected]);
        }
    }

    setPath=(path)=>{
        if(this.state.selected !== null && path !== null){
                this.props.setPath(this.state.selected+path);
        }
        else if(path === null){
            this.props.setPath('');
        }
        else {
            this.props.setPath(path);
        }
    }


    makeOption = (item) => {
        if(typeof this.props.obj[item] === 'string' || typeof this.props.obj[item] === 'number'){
            return (
                <div className="option" key={item} onClick={this.setPath.bind(this, '[\''+item+'\']')}>{"\""+item+"\"= "+this.props.obj[item]}</div>
            );
        }
        else{
        return (
            <div className="option" key={item} onClick={this.selectChange.bind(this, item)}>{"Obj: "+String(item)}</div>
        );
    }
    }

    getPath = () => {
        if (this.state.child === null) {
            return this.state.title;
        }
        else {
            return this.state.title + this.state.child.getPath();
        }
    }

    getStyle = () => {
        if (this.state.child !== null) {
            return { 'zIndex': '12' };
        }
        else {
            return { 'zIndex': '0' };
        }
    }

    clearChild = () => {
        this.setState({ child: null, selected: null });
        this.setPath(null);
    }

    componentDidMount = () => {
        this.setState({
            select:
                <div className="SelectHolder">
                    <div id={'SelectSet_' + this.props.depth} className="selectSetPanel" style={this.getStyle()}>
                        {this.props.depth===0?null:(<div className="option" onClick={this.props.clearChild}>Go Back</div>)}
                        {
                            Object.keys(this.props.obj) ? Object.keys(this.props.obj).map((key) => { return this.makeOption(key); }) : null
                        }
                    </div>
                    {this.state.child}
                </div>
        });
    }


    render() {
        return (
            <div>
                {this.state.select}
                {this.state.child}
            </div>
        );
    }

}

export default SelectSet;