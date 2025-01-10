import React from 'react'
import ToolButton from './ToolButton'
import "./css/ListInputHeader.css"

export default function ListInputHeader({ text, onPlusClick }) {
    return (
        <div className="list-input-header">
            <span className="list-input-header__label">{text}</span>
            <ToolButton icon="icon-plus" onClick={onPlusClick} />
        </div>
    )
}
