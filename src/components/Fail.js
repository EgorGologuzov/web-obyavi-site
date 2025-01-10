import React from 'react'
import "./css/Fail.css"

export default function Fail({ message = "Не удалось загрузить данные" }) {
    return (
        <div className="fail">{ message }</div>
    )
}
