import React from 'react'
import { useState, useEffect } from 'react'
import './ClientPageClient.css'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import StarsBar from '../../components/StarsBar'
import Button from '../../components/Button'
import { useUserService } from '../../data/UserService'
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useNewListContext } from '../../contexts/ListContext'
import Card from '../../components/Card'
import { ListContextProvider } from '../../contexts/ListContext'
import { ScrollingList_withLoad } from '../../hoc/withLoad'
import { useAdService } from '../../data/AdService'
import { useReviewService } from '../../data/ReviewService'
import ProfileInfo from '../../components/ProfileInfo'
import ProfileInfoExtandable from '../../components/ProfileInfoExtandable'



export default function ClientPageClient() {
    const appContext=useAppContext();
    const listContext=useNewListContext();
    const [isBusy, setIsBusy] = useState(false);
    const adService=useAdService();
    const userService=useUserService();
    const [user,setUser]=useState({});;
    const {id}=useParams()
    const navigate=useNavigate();
    const reviewService=useReviewService();
    const [reviewList,setreviewList]=useState([])

    useEffect(()=>{
        setUser(userService.getUserById(id));
        setreviewList(reviewService.getReviewsByAuthor(id))
        console.log(reviewService.getReviewsByAuthor(id))
    },[])

    return (
        <div className="client-page">
            <div className="client-page__client-zone">
                <ProfileInfoExtandable clientId={appContext.loginedUser.id}>
                    <br></br>
                    <Subcaption level={2} color={'accent'}>Онлайн</Subcaption>
                </ProfileInfoExtandable>
                <div className="client-page__client-zone__info">
                    <Subcaption level={2}>Местоположение</Subcaption>
                    <Subcaption level={2} color={'text'}>{user.location}</Subcaption>
                    <Subcaption level={2}>Дата регистрации</Subcaption>
                    <Subcaption level={2} color={'text'}>{user.regDate}</Subcaption>
                    <Subcaption level={2}>Описание</Subcaption>
                    <br/>
                    <Subcaption level={1} color={'text'}>{user.description}</Subcaption>
                    <div className="client-page__client-zone__info__buttons">
                        <Button color='primary'>
                            Написать
                        </Button>
                        <Button color='warning'>
                            Пожаловаться
                        </Button>
                        <Button color='secondary' onClick={()=>navigate(`../client/${id}/ads`)}>
                            Все объявления
                        </Button>
                    </div>
                </div>
            </div>
            <div className="client-page__review-zone">
                <Subcaption level={2} color={'text'}>
                    Отзывы:
                </Subcaption>
                <ListContextProvider value={listContext}>
                    <ScrollingList_withLoad
                    listContext={listContext}
                    isBusy={isBusy}
                    hasItems={reviewList.length}
                    >
                        {reviewList&&reviewList.map((review, index) =>
                            <Card id={index} key={index}>
                                <div className="client-page__review-zone__review">
                                    <div className="client-page__review-zone__review__user-info">
                                        <Avatar src={userService.getUserById(review.authorUserId).avatar}/>
                                        <Header level={3}>{userService.getUserById(review.authorUserId).lastname} {userService.getUserById(review.authorUserId).firstname} {userService.getUserById(review.authorUserId).patronym}</Header>
                                        <Subcaption level={2}>{review.date}</Subcaption>
                                        <StarsBar value={review.rating} input_mode={false}/>
                                    </div>
                                    <Subcaption level={1} color={'text'}>{review.description}</Subcaption>
                                    <div className='client-page__review-zone__review__images'>
                                        {review.images&&review.images.map((image,index)=>
                                            <img src={image.src} key={index} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'10px'}}/>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </ScrollingList_withLoad>
                </ListContextProvider>
                <Button color='secondary' onClick={()=>navigate(`../client/${id}/reviews`)}>Все отзывы</Button>
            </div>
        </div>
    )
}
