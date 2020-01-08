import React from 'react';
import './table.css';

class Table extends React.Component{

    getColumnHeads=()=>{
        return Array.isArray(this.props.headers)?this.props.headers.map(header=>{
            return (<td key={header} className="heading">{header}</td>)
        }):Object.keys(this.props.headers).map(header=>{
            return (<td key={header} className="heading">{header}</td>)
        });

    }

    getRows=(l)=>{
        let i = 1.1;
        return this.props.data.map(dataset=>{
            i++;
            return (
                <tr key={"dataset_"[0]+i+"."+l}>
                    {Object.keys(dataset).map(item=>{
                    return (
                        <td key={item+".."+i+l}>
                            {dataset[item]}
                        </td>
                    )
                    })
                }
            </tr>
        )
    });
    }

    render(){
        let i = 1;
        return(
            <table className="">
                <tbody>
                    <tr>{this.getColumnHeads()}</tr>
                    {this.getRows(i++)}
                </tbody>
            </table>
        );
    }
}


export default Table;