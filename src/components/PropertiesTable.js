import React from 'react'
import "./css/PropertiesTable.css"

export default function PropertiesTable({ propsList }) {

    const getLineStyle = (index) => {
        return index % 2 === 0
            ? {backgroundColor: "var(--bg)", color: "var(--text)"}
            : {backgroundColor: "var(--fg)", color: "var(--text)"};
    }

    return (
        <table className="properties-table">
            <tbody>
                {propsList && propsList.map((item, index) => (
                    <tr key={index} style={getLineStyle(index)}>
                        <th style={{textAlign: "start"}}>{ item.name }</th>
                        <th style={{textAlign: "end"}}>{ item.value + (item.metric ? ` ${item.metric}` : "") }</th>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
