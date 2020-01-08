import React from 'react';
import * as ViewAssignment from './viewAssignment.js';
import './viewAssignments.scss';

export default class AssignmentTable extends React.Component{

    getColumnHeads=()=>{
        return(
            <tr>
            <td className="heading">Due Date</td>
            <td className="heading">Title</td>
            <td className="heading">Short Desc</td>
            <td className="heading">Group</td>
            <td className="heading"></td>
            </tr>
        )

    }

    getRows=()=>{
        let i = 0;
        return this.props.data.map(dataset=>{
            i++;
            return (
                <tr key={"dataset_"+i}>
                    <td>
                        {dataset['due_date']}
                    </td>
                    <td>
                        {dataset['title']}
                    </td>
                    <td>
                        {dataset['short_description']}
                    </td>
                    <td>
                        {dataset['group_name']}
                    </td>
                    <td>
                        <button onClick={this.props.viewData.bind(this, [dataset['id'], ViewAssignment])}>View</button>
                    </td>
                </tr>
        )
    });
    }


    render(){
        return(
            <div>
                <div id="alertHeader" className="headBand"></div>
                <table className="tableAssignments">
                    <tbody>
                        {this.getColumnHeads()}
                        {this.getRows()}

                        {
                            this.props.createNew!==null?(<tr><td colSpan={5}><button onClick={this.props.viewData.bind(this, ['new', ViewAssignment])}>New</button></td></tr>):null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}