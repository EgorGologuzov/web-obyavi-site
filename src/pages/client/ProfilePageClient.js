import React from 'react'
import './ProfilePageClient.css'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import StarsBar from '../../components/StarsBar'
import Button from '../../components/Button'
import { useUserService } from '../../data/UserService'
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePageClient() {
    const appContext = useAppContext();
    const navigate=useNavigate();
    //const clientDescription=useState({'location':'г. Нижний Тагил, Ленинский район','regDate':new Date(),'birthDate':new Date,'phoneNumber':'+79999999999','e-mail':});

    return (
        <div className="profile-page">
            <div className="profile-page__header">
                <div className="profile-page__header__info">
                    <Avatar src={appContext.loginedUser.avatar}/>
                    <div className="profile-page__header__info__text">
                        <Header level={2}>{`${appContext.loginedUser.lastname} ${appContext.loginedUser.firstname} ${(appContext.loginedUser.fathername)||''}`}</Header>
                        <div className="stats">
                            <Subcaption level={2}>{`#${appContext.loginedUser.id}`}</Subcaption>
                            <Subcaption level={2} color={'accent'}>Онлайн</Subcaption>
                        </div>
                        <StarsBar value={4}/>
                    </div>
                </div>
                <Button color='secondary' onClick={()=>navigate('../profile/edit')}>Редактировать профиль</Button>
            </div>
            <div className="profile-page__body">
                <div className="profile-page__description">
                    <Subcaption level={2} color='text'>Местонахождение</Subcaption>
                    <Subcaption level={2} color={'secondary'}>{appContext.loginedUser.location}</Subcaption>
                    <Subcaption level={2} color='text'>Дата регистрации</Subcaption>
                    <Subcaption level={2} color={'secondary'}>{appContext.loginedUser.regDate}</Subcaption>
                    <Subcaption level={2} color='text'>Дата рождения</Subcaption>
                    <Subcaption level={2} color={'secondary'}>{appContext.loginedUser.birthDate}</Subcaption>
                    <Subcaption level={2} color='text'>Номер телефона</Subcaption>
                    <Subcaption level={2} color={'secondary'}>{appContext.loginedUser.phone}</Subcaption>
                    <Subcaption level={2} color='text'>Электронная почта</Subcaption>
                    <Subcaption level={2} color={'secondary'}>{appContext.loginedUser.email}</Subcaption>
                    <Subcaption level={2} color='text'>Описание</Subcaption>
                    <br></br>
                    <Subcaption level={1} color={'secondary'}>{appContext.loginedUser.description}</Subcaption>
                </div>
                <div className='profile-page__actions'>
                    <Button color='secondary' onClick={()=>navigate('../client/:id/ads')}>Мои отзывы</Button>
                    <Button color='secondary' onClick={()=>navigate('../favorite')}>Избранные объявления</Button>
                </div>
            </div>
        </div>
    )
}
