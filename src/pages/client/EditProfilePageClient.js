import React,{useEffect, useState, useRef} from 'react'
import './EditProfilePageClient.css'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import StarsBar from '../../components/StarsBar'
import Button from '../../components/Button'
import { InputEmail_withFixedValueRegExp, InputPassword_withFixedValueRegExp, InputPhone_withFixedValueRegExp, InputString_withFixedValueRegExp, InputText_withFixedValueRegExp } from '../../hoc/withFixedValueRegExp';
import { useUserService } from '../../data/UserService'
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Spliter from '../../components/Spliter'
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { formatPhone } from '../../utils/utils'

export default function EditProfilePageClient() {
    const appContext=useAppContext();
    const formState = useNewFormState();
    const [isDefaulted,setIsDefaulted]=useState(false);
    const fileInputRef=useRef(null);
    const [avatar,setAvatar]=useState(appContext.loginedUser.avatar);

    const restoreToDefault=()=>{
        setTimeout(()=>setIsDefaulted(false),50);
        setIsDefaulted(true);
    }

    const submitChanges=()=>{
        if (formState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }
        console.log(formState.values);
    }

    const handleProfileImageChanged=(event)=>{
        const selectedFile = event.target.files[0];
        setAvatar(URL.createObjectURL(selectedFile))
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-page__header">
                <div className="edit-profile-page__header__info">
                    <Avatar src={avatar} onClick={()=>fileInputRef.current.click()}/>
                    <input type='file' multiple={false} onChange={handleProfileImageChanged} ref={fileInputRef} accept='image/png, image/jpeg'/>
                    <div className="edit-profile-page__header__info__text">
                        <Subcaption level={2} color={'text'}>{`Дата регистрации: `}</Subcaption>
                        <Subcaption level={2}>{`${appContext.loginedUser.regDate}`}</Subcaption>
                        <Subcaption level={2} color={'secondary'}>{`#${appContext.loginedUser.id}`}</Subcaption>
                        <StarsBar value={4}/>
                    </div>
                </div>
            </div>
            <AutoForm formState={formState}>
                    <InputString_withFixedValueRegExp
                        name="lastname"
                        label="Фамилия"
                        placeholder={appContext.loginedUser.lastname}
                        value={appContext.loginedUser.lastname}
                        isValueFixed={isDefaulted}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        required
                        errorComment="Фамилия может содержать только буквенные символы и не должна быть длиннее 50 символов" />
                    <InputString_withFixedValueRegExp
                        name="firstname"
                        label="Имя"
                        placeholder={appContext.loginedUser.firstname}
                        value={appContext.loginedUser.firstname}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        isValueFixed={isDefaulted}
                        required
                        errorComment="Имя может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                    <InputString_withFixedValueRegExp
                        name="patronymic"
                        label="Отчество"
                        value={appContext.loginedUser.patronymic}
                        placeholder={appContext.loginedUser.patronymic||null}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        isValueFixed={isDefaulted}
                        errorComment="Отчество может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                    <InputEmail_withFixedValueRegExp
                        name="email"
                        label="Электронная почта"
                        value={appContext.loginedUser.email}
                        placeholder={appContext.loginedUser.email}
                        isValueFixed={isDefaulted}
                        required />
                    <InputPhone_withFixedValueRegExp 
                        name="phone" 
                        required 
                        placeholder={appContext.loginedUser.phone} 
                        value={formatPhone(appContext.loginedUser.phone)} 
                        isValueFixed={isDefaulted}/>
                    <InputString_withFixedValueRegExp 
                        name='birthDate' 
                        placeholder={appContext.loginedUser.birthDate} 
                        value={appContext.loginedUser.birthDate} 
                        label='Дата рождения' 
                        isValueFixed={isDefaulted}/>
                    <InputString_withFixedValueRegExp 
                        name='location' 
                        placeholder={appContext.loginedUser.location} 
                        value={appContext.loginedUser.location} 
                        label='Местоположение' 
                        isValueFixed={isDefaulted}/>
                    <InputText_withFixedValueRegExp
                        name='description'
                        label="Описание"
                        value={appContext.loginedUser.description}
                        comment=''
                        isValueFixed={isDefaulted}
                        onChange={()=>alert('')}
                    />
            </AutoForm>
            <div className="edit-profile-page__confirm-buttons">
                <Button onClick={()=>submitChanges()}>Сохранить</Button>
                <Button color='secondary' onClick={()=>restoreToDefault()}>Отменить</Button>
            </div>
        </div>
    )
}
