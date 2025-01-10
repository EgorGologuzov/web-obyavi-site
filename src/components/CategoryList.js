import React from 'react'
import "./css/CategoryList.css"

export default function CategoryList({ 
    list // спсиок категорий в виде строки, разделенный ">". Например: "Главная>Транспорт>Мотоциклы и мототехника>Квадроциклы и багги"
    }) {
    return (
        <div className="category-list">
            {list && list.split(">").map((item, index) => (
                <div key={index} className="category-list__item">#{item.toLowerCase()}</div>
            ))}
        </div>
    )
}
