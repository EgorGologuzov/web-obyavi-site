import { useState, useEffect, useCallback } from 'react'
import './ClientPageClient.css'
import './ListOfClientReviewsClient.css'
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
import DropdownList from '../../components/DropdownList'
import { Card_withRef } from '../../hoc/Card_withRef'
import ProfileInfo from '../../components/ProfileInfo'
import ProfileInfoExtandable from '../../components/ProfileInfoExtandable'

export default function ListOfClientReviewsClient() {
    const appContext=useAppContext();
    const listContext = useNewListContext();
    const userService=useUserService();
    const [user,setUser]=useState({});;
    const {id}=useParams()
    const reviewService=useReviewService();
    const [reviewList,setReviewList]=useState([])
    const dropdownSamples={'option_1':'Сначала новые','option_2':'Сначала старые'};
    const [sortMethod,setSortMethod]=useState('Сначала новые');
    const [cardHeight,setCardHeight]=useState(0);
    const scrollingListHeight=2;
    const measuredRef=useCallback(node => {
        if (node !== null) {
            if(node.clientHeight>cardHeight)
                setCardHeight(node.clientHeight);
        }
    }, []);

    useEffect(()=>{
        setUser(userService.getUserById(id));
        for (let i=0;i<5;i++){
            setReviewList(oldValues=>[...oldValues,...reviewService.getReviewsByAuthor(id)])
        }
    },[])

    const handleSortMethodChanged=(oldValue,newValue)=>{
        setSortMethod(newValue);
    }

    return (
        <div className='client-reviews'>
            <Header level={2} color={'text'}>Отзывы о клиенте</Header>
            <Subcaption level={2}>{user.lastname} {user.firstname} {user.patronym}</Subcaption>
            <DropdownList options={dropdownSamples} label='' comment='' value={sortMethod} onChange={handleSortMethodChanged}/>
            <ListContextProvider value={listContext}>
                <ScrollingList_withLoad listContext={listContext} maxHeight={cardHeight*scrollingListHeight+10*scrollingListHeight} onBottomReached={()=>console.log('fdjlfj')}>
                        {reviewList&&reviewList.map((review, index) =>
                            <Card_withRef id={index} key={index} ref={measuredRef}>
                                <div className="client-page__review-zone__review">
                                    <ProfileInfoExtandable clientId={review.authorUserId}>
                                        <br/>
                                        <Subcaption level={2}>{review.date}</Subcaption>
                                    </ProfileInfoExtandable>
                                    <Subcaption level={1} color={'text'}>{review.description}</Subcaption>
                                    <div className='client-page__review-zone__review__images'>
                                        {review.images&&review.images.map((image,index)=>
                                            <img src={image.src} key={index} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'10px'}}/>
                                        )}
                                    </div>
                                </div>
                            </Card_withRef>
                        )}
                </ScrollingList_withLoad>
            </ListContextProvider>
        </div>
    )
}
