import React from 'react'
import AutoForm from './AutoForm'
import { InputString_withRegExp } from '../hoc/withRegExpValidation'

export default function AdressForm({ adressDefault: adress, formState }) {

    return (
        <AutoForm formState={formState} desktopColumns={3}>
            <InputString_withRegExp
                name="state"
                defaultValue={adress.state}
                label="Регион страны"
                placeholder="Введите регион"
                regExp={/^[А-Яа-яA-za-z\s\-0-9]{1,100}$/g}
                errorComment="Можно использовать только буквы, цифры, пробелы и дефис, длина не более 100 символов" />
            <InputString_withRegExp
                name="city"
                defaultValue={adress.city}
                label="Город"
                placeholder="Введите город"
                regExp={/^[А-Яа-яA-za-z\s\-0-9]{1,100}$/g}
                errorComment="Можно использовать только буквы, цифры, пробелы и дефис, длина не более 100 символов" />
            <InputString_withRegExp
                name="district"
                defaultValue={adress.district}
                label="Район города"
                placeholder="Введите район"
                regExp={/^[А-Яа-яA-za-z\s\-0-9]{1,100}$/g}
                errorComment="Можно использовать только буквы, цифры, пробелы и дефис, длина не более 100 символов" />
            <InputString_withRegExp
                name="street"
                defaultValue={adress.street}
                label="Улица"
                placeholder="Введите улицу"
                regExp={/^[А-Яа-яA-za-z\s\-0-9]{1,100}$/g}
                errorComment="Можно использовать только буквы, цифры, пробелы и дефис, длина не более 100 символов" />
            <InputString_withRegExp
                name="house"
                defaultValue={adress.house}
                label="Дом"
                placeholder="Введите номер дома"
                regExp={/^[А-Яа-яA-za-z\s0-9]{1,10}$/g}
                errorComment="Можно использовать только цифры и буквы, длина не более 10 символов" />
            <InputString_withRegExp
                name="apartment"
                defaultValue={adress.apartment}
                label="Квартира/Офис"
                placeholder="Введите место сделки"
                regExp={/^[А-Яа-яA-za-z\s0-9]{1,10}$/g}
                errorComment="Можно использовать только цифры и буквы, длина не более 10 символов" />
        </AutoForm>
    )
}
