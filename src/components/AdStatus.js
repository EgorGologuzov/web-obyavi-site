import React from 'react'
import "./css/AdStatus.css"

export default function AdStatus({ ad }) {
    return ad.meta.change && (
        <div 
            className="ad-status-bar"
            style={{backgroundColor: ad.main.status == "published" ? "var(--primary)" : "var(--warning)"}}>
                {ad.main.status == "published" ? "Опубликовано " : "Снято с публикации "}
                {new Date(ad.meta.change).toLocaleString()}
        </div>
    )
}
