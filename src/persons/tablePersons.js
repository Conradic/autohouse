import React from 'react';

export default class PersonsTable extends React.Component{

    getColumnHeads=()=>{
        return(
            <tr>
            <td className="heading">First Name</td>
            <td className="heading">Last Name</td>
            <td className="heading">Special Note</td>
            <td className="heading">Profile</td>
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
                        {dataset['first_name']}
                    </td>
                    <td>
                        {dataset['last_name']}
                    </td>
                    <td>
                        {dataset['note']}
                    </td>
                    <td>
                        <button onClick={this.props.viewProfile.bind(this, dataset['id'])}>View Profile</button>
                    </td>
                </tr>
        )
    });
    }

    render(){
        return(
            <div>
                <div id="alertHeader" className="headBand"></div>
                <table className="tablePersons">
                    <tbody>
                        {this.getColumnHeads()}
                        {this.getRows()}
                        {
                            this.props.createNew!==null?(<tr><td colSpan={5}><button onClick={this.props.viewProfile.bind(this, 'new')}>New</button></td></tr>):null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}