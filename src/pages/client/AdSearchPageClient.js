import React, { useEffect, useRef, useCallback } from 'react'
import { useAppContext } from '../../contexts/AppContext';
import './AdSearchPageClient.css'
import Button from '../../components/Button';
import SearchString from '../../components/SearchString';
import Subcaption from '../../components/Subcaption';
import { ScrollingList_withLoad } from '../../hoc/withLoad';
import { ListContextProvider,useNewListContext } from '../../contexts/ListContext';
import SortingDialogClient from '../../components/SortingDialogClient';
import Card from '../../components/Card';
import {useSearchService} from '../../data/SearchService';
import { useState } from 'react';
import { useAdService } from '../../data/AdService';
import Header from '../../components/Header';
import FilterDialogClient from '../../components/FilterDialogClient';
import { useNavigate } from 'react-router-dom';
import {Header_withOnClick} from '../../hoc/Header_withOnClick'
import ContextMenu from '../../components/ContextMenu';
import ContextMenuButton from '../../components/ContextMenuButton';
import { busyProcess } from '../../utils/utils';
import parse from 'html-react-parser'
import ToolButton from '../../components/ToolButton';
import { Card_withRef } from '../../hoc/Card_withRef';

export default function AdSearchPageClient() {
    const appContext=useAppContext();
    const listContext = useNewListContext();
    const [searchRequest, setSearchRequest] = useState();
    const [searchHints, setSearchHints] = useState([]);
    const searchService=useSearchService();
    const adService=useAdService();
    const [ads, setAds] = useState([]);
    const [page, setPage] = useState();
    const [pageMax, setPageMax] = useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [isBusy, setIsBusy] = useState(false);
    const hasLoaded=useRef(false);
    const [cardHeight,setCardHeight]=useState(0);
    const scrollingListHeight=2;
    const measuredRef=useCallback(node => {
        if (node !== null&&hasLoaded) {
            if(node.clientHeight>cardHeight){
                setCardHeight(node.clientHeight);
                console.log(node.clientHeight)
                console.log(cardHeight)
            }
        }
    }, [cardHeight]);

    const handleSearchRequestChanged = (oldValue, newValue) => {
        setSearchRequest(newValue);
        searchService.getHints(newValue)
            .then((hints) => setSearchHints(hints));
    }

    const handleSearch=(newValue)=>{
        console.log(newValue)
        if (!newValue){
            setPage(1)
            load({page:page})
            setPage(page+1);
            return;
        }
        setAds([]);
        adService.getByTitle({newValue}).then((data)=>{
            setAds(data);
        })
        const mainWindow=document.getElementsByClassName('layout-client__page')[0]
        mainWindow.scrollTo({top:mainWindow.scrollHeight,behavior:'smooth'})
    }

    const load = ({ page }) => {
        busyProcess(isBusy, setIsBusy, () => {
            setPage(page+1)
            return adService.getAds({page})
                .then((data) => {
                    setAds(oldValues=>[...oldValues,...data.list]);
                    setPageMax(data.totalPages);
                    const mainWindow=document.getElementsByClassName('layout-client__page')[0]
                    mainWindow.scrollTo({top:mainWindow.scrollHeight,behavior:'smooth'})
                })
                .catch((err) => appContext.showNotification(
                    '',
                    `Не удалось загрузить данные: ${err.message}`,
                    'critical'
                ))
        }
        )
    }

    const handleOnBottomReached=()=>{
        load({page:page});
    }

    const navigateToAd = (adId) => {
        window.open("/c/ad/" + adId, '_blank');
    }

    useEffect(()=>{
        if(!hasLoaded.current){
            load({page:1});
            hasLoaded.current=true;
        }
        
    },[])

    return (
        <div className="ad-search-page">
            <div className="ad-search-page__search-zone">
                <SearchString 
                    placeholder='Поиск по сайту' 
                    hints={searchHints}
                    onChange={handleSearchRequestChanged}
                    inputValue={searchRequest ?? ""}
                    onSearch={()=>handleSearch(searchRequest)}
                />
                <Button color='secondary' onClick={()=>appContext.showModal('Выберите категорию',(<FilterDialogClient/>))}><img style={{width:'35px',height:'30px',content:'var(--icon-filter)',alignSelf:'center'}}/> <p>Фильтры</p></Button>
                <Button color='secondary' onClick={()=>appContext.showModal('Сортировка',(<SortingDialogClient/>))}><img style={{width:'40px',height:'30px',content:'var(--icon-sort)',alignSelf:'center'}}/> <p>Сортировка</p></Button>
            </div>
            <Header level={4}>Найдено {ads.length} товаров</Header>
            <ListContextProvider value={listContext}>
                <ScrollingList_withLoad
                listContext={listContext}
                isBusy={isBusy}
                hasItems={ads.length}
                onBottomReached={()=>handleOnBottomReached()}
                maxHeight={cardHeight*scrollingListHeight+10*scrollingListHeight}
                >
                    {ads&&ads.map((ad, index) =>
                        <Card_withRef id={ad.id} key={ad.id} ref={measuredRef}>
                            <div className="my-ads-list-client__card-content">
                                <div className="my-ads-list-client__up-content">
                                    <img className="my-ads-list-client__ad-avatar" src={ad.main.avatar} onClick={() => navigateToAd(ad.id)}/>
                                    <div className="my-ads-list-client__text-content">
                                        <div className="my-ads-list-client__card-header" onClick={() => navigateToAd(ad.id)}>
                                            <Header level={4}>{ ad.main.header }</Header>
                                        </div>
                                        <Subcaption level={2}>{ `г. ${ad.adress.city}, ${ad.adress.district}` }</Subcaption>
                                        <Header level={4}>{ `${Number(ad.price.value).toLocaleString(undefined, { minimumFractionDigits: 0 }) } ${ad.price.currency}` }</Header>
                                        <div className="my-ads-list-client__desc">{ ad.desc && parse(ad.desc) }</div>
                                    </div>
                                </div>
                            </div>
                        </Card_withRef>
                    )}
                </ScrollingList_withLoad>
            </ListContextProvider>
        </div>
    )
}
