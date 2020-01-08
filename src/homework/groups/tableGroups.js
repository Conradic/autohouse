import React from 'react';
import * as ViewGroup from './viewGroup.js';

export default class GroupTable extends React.Component{

    getColumnHeads=()=>{
        return(
            <tr>
                
            </tr>
        )

    }

    getRows=(l)=>{
        let i = 1.1;
        return this.props.data.map(dataset=>{
            i++;
            return (
                <tr key={"dataset_"[0]+i+"."+l}>
                
                </tr>
        )
    });
    }

    render(){
        let i = 1;
        return(
            <div>
                
                <table className="tableGroups">
                    <tbody>
                        {this.getColumnHeads()}
                        {this.getRows(i++)}

                        {
                            this.props.createNew!==null?(<tr><td colSpan={5}><button onClick={this.props.viewGroup.bind(this, 'new')}>New</button></td></tr>):null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export const type="group";