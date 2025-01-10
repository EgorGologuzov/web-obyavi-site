import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Paragraf from '../../components/Paragraf'
import "./AdPageClient.css"
import ImageList from '../../components/ImageList'
import CategoryList from '../../components/CategoryList'
import ImageCarousel from '../../components/ImageCarousel'
import ProfileInfo from '../../components/ProfileInfo'
import PropertiesTable from '../../components/PropertiesTable'
import { useAdService } from '../../data/AdService'
import { useNavigate, useParams } from 'react-router-dom';
import { busyProcess, busyProcessWithFail } from '../../utils/utils'
import AdStatus from '../../components/AdStatus'
import { useAppContext } from '../../contexts/AppContext'
import Load from '../../components/Load'
import Fail from '../../components/Fail'
import parse from 'html-react-parser'
import { useTitleWithDeps } from '../../hook/useTitle'
import AdressView from '../../components/AdressView'

export default function AdPageClient() {
    const adService = useAdService();
    const [ad, setAd] = useState();
    const [isBusy, setIsBusy] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [curImg, setCurImg] = useState(1);
    const { id } = useParams();
    const appContext = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        busyProcessWithFail(isBusy, setIsBusy, setIsFail, () => adService.getById({ id })
            .then((adValue) => setAd(adValue))
        )
    }, []);

    useTitleWithDeps({ text: ad?.main?.header, deps: [ad] });

    return !isBusy && ad && (
        <div className="ad-page-client">
            <ImageList imgList={ad.images} value={curImg} onChange={({ newValue }) => setCurImg(newValue)} />
            <div className="ad-page-client__carousel-btns">
                <ImageCarousel
                    imgList={ad.images}
                    value={curImg}
                    onChange={({ newValue }) => setCurImg(newValue)} />
                <div className="ad-page-client__btns">
                    {appContext.loginedUser.id != ad.owner && (<>
                        <Button color="secondary">Пожаловаться</Button>
                        <div style={{width: "10px", height: "100%"}}></div>
                        <Button color="primary" onClick={() => navigate("/c/chat/" + ad.owner)}>Написать</Button>
                    </>)}
                    {appContext.loginedUser.id == ad.owner && (
                        <Button color="secondary" onClick={() => {navigate("/c/ad/" + ad.id + "/edit");}}>Редактировать</Button>
                    )}
                </div>
            </div>
            <div className="ad-page-client__data">
                <AdStatus ad={ad} />
                <Header level={4}>{ad.main.header}</Header>
                <CategoryList list={ad.main.category} />
                <div className="ad-page-client__label">
                    Место сделки: {" "}
                    <span className="ad-page-client__location"><AdressView adress={ad.adress} /></span>
                </div>
                <Header level={4}>{ `${Number(ad.price.value).toLocaleString(undefined, { minimumFractionDigits: 0 }) } ${ad.price.currency}` }</Header>
                
                <ProfileInfo clientId={ad.owner} />
                
                {ad.desc && <>
                    <div className="ad-page-client__label">Описание:</div>
                    <div className="ad-page-client__desc">
                        { ad.desc && parse(ad.desc) }
                    </div>
                </>}

                {ad.properties?.length && <>
                    <div className="ad-page-client__label">Характеристики:</div>
                    <PropertiesTable propsList={ad.properties} />
                </> || ""}

            </div>
        </div>
    ) || isBusy && <Load /> || isFail && <Fail/>
}
