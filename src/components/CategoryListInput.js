import React, { useEffect, useState } from 'react'
import ListInputHeader from './ListInputHeader'
import "./css/CategoryListInput.css"
import ToolButton from './ToolButton'
import Fail from './Fail';

export default function CategoryListInput({ categoryStr, name, max = 10, onChange, onMontage }) {

    const [cats, setCats] = useState(categoryStr ? categoryStr.split(">") : []);

    const remove = (cat) => {
        const index = cats.indexOf(cat);
        const newCats = [...cats];
        newCats.splice(index, 1);
        setCats(newCats);
        onChange && onChange({ newValue: newCats.join(">"), isValid: true });
    }

    useEffect(() => {
        onMontage && onMontage({ value: cats.join(">"), isValid: true })
    }, [])

    return (
        <div className="category-list-input" name={name}>
            <ListInputHeader text={`Категории (${cats.length}/${max})`} />
            <div className="category-list-input__list">
                {cats.map((cat, _) => 
                    <div className="category-list-input__item" key={cat}>
                        <span className="category-list-input__text">#{cat}</span>
                        <ToolButton icon="icon-cross" onClick={() => remove(cat)} />
                    </div>
                )}
                {!cats.length && <Fail message="Категории не выбраны" />}
            </div>
            <div className="list-input-header__comment">Список категорий, в которых люди смогут увидеть ваше объявление</div>
        </div>
    )
}
