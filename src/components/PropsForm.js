import React from 'react'
import AutoForm from './AutoForm'
import { InputString_withRegExp } from '../hoc/withRegExpValidation'

export default function PropsForm({ properties, formState }) {
    return (
        <AutoForm formState={formState} desktopColumns={3}>
            {properties && properties.map((data, index) => {
                if (data.type && inputs[data.type]) {
                    return inputs[data.type](data, data.name);
                }
            })}
        </AutoForm>
    )
}

const inputs = {
    int: (propData, key) => {
        return (
            <InputString_withRegExp
                key={key}
                name={propData.name}
                defaultValue={propData.value}
                label={propData.name + (propData.metric ? ` (${propData.metric})` : "")}
                placeholder="Введите целое"
                regExp={/^\d{1,}$/}
                errorComment="Ожидается целое число" />
        )
    },
    float: (propData, key) => {
        return (
            <InputString_withRegExp
                key={key}
                name={propData.name}
                defaultValue={propData.value}
                label={propData.name + (propData.metric ? ` (${propData.metric})` : "")}
                placeholder="Введите число"
                regExp={/^(\-)?\d+([.]\d+)?$/}
                errorComment="Ожидается число" />
        )
    },
    str: (propData, key) => {
        return (
            <InputString_withRegExp
                key={key}
                name={propData.name}
                defaultValue={propData.value}
                label={propData.name}
                placeholder="Введите строку"
                regExp={/^.{1,100}$/}
                errorComment="Ожидается строка" />
        )
    }
}
