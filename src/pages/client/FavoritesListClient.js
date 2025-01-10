import React from 'react'
import './FavoritesListClient.css'
import Header from '../../components/Header'
import PagedList from '../../components/PagedList';
import { ListContextProvider } from '../../contexts/ListContext'
import ToolButton from '../../components/ToolButton';
import { useNewListContext } from '../../contexts/ListContext';
import Ad from '../../components/Ad';
import Card from '../../components/Card';
import { useState , useEffect} from 'react';
import { useUserService } from '../../data/UserService';
import { useAppContext } from '../../contexts/AppContext';
import { useAdService } from '../../data/AdService';
import DropdownList from '../../components/DropdownList';
import { useNavigate } from 'react-router-dom';
import { PagedList_withLoad } from '../../hoc/withLoad';
import { busyProcess } from '../../utils/utils';
import Subcaption from '../../components/Subcaption';
import parse from 'html-react-parser'

export default function FavoritesListClient() {
    const [ads, setAds] = useState([]);
    const [page, setPage] = useState();
    const [pageMax, setPageMax] = useState(2);
    const [isBusy, setIsBusy] = useState(false);
    const listContext = useNewListContext();
    const appContext = useAppContext();
    const adService = useAdService();
    const navigate = useNavigate();
    const dropdownSamples={'option_1':'Сначала новые','option_2':'Сначала старые'};
    const [dropdownValue,setDropdownValue]=useState('');

    const handleDropdownChange=(oldValue,newValue)=>{
        setDropdownValue(newValue);
        console.log(newValue);
    }
    
    const load = ({ page }) => {
        busyProcess(isBusy, setIsBusy, () => {
            setAds([]);
            setPage(page);
            return adService.getByIds({idArray:appContext.loginedUser.favoriteAds})
                .then((data) => {
                    setAds(data);
                })
                .catch((err) => appContext.showNotification(
                    '',
                    `Не удалось загрузить данные: ${err.message}`,
                    'critical'
                ))
        }
        )
    }

    const handlePageValueChange = (event) => {
        load({ page: event.newValue });
    }

    const navigateToAd = (adId) => {
        !listContext.selectMode && window.open("/c/ad/" + adId, '_blank');
    }

    useEffect(() => {
        load({ page: 1 });
    }, []);

    return (
        <div className="favorites-list">
            <Header level={3} color={'text'}>Мои избранные</Header>
            <DropdownList 
            options={dropdownSamples}
            label='Сортировка:'
            value={dropdownValue}
            onChange={handleDropdownChange}
            comment=''
            />
            <ListContextProvider value={listContext}>
                <PagedList_withLoad
                    listContext={listContext}
                    pageMax={pageMax}
                    pageValue="1"
                    onPageValueChange={handlePageValueChange}
                    isBusy={isBusy}
                    hasItems={ads.length}>
                    {ads && ads.map((ad, _) => 
                        <Card id={ad.id} key={ad.id}>
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
                        </Card>
                    )}
                </PagedList_withLoad>
            </ListContextProvider>
        </div>
    )
}
