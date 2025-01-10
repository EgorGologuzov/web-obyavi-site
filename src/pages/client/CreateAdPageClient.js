import React, { useEffect, useState } from 'react'
import "./CreateAdPageClient.css"
import Header from '../../components/Header'
import { useTitleWithDeps } from '../../hook/useTitle';
import Button from '../../components/Button';
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { InputString_withRegExp, InputText_withRegExp } from '../../hoc/withRegExpValidation';
import Grid from '../../components/Grid';
import { getPrototype, useAdService } from '../../data/AdService'
import Load from '../../components/Load'
import Fail from '../../components/Fail'
import Spliter from '../../components/Spliter'
import ImgListInput from '../../components/ImgListInput';
import CategoryListInput from '../../components/CategoryListInput';
import AdressForm from '../../components/AdressForm';
import PropsForm from '../../components/PropsForm';
import { useAppContext } from '../../contexts/AppContext';
import { useBlobService } from '../../data/BlobService';
import { formatDesc, formatDescForEdit, formatShortDesc } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function EditAdPageClient() {
    const adService = useAdService();
    const [ad, setAd] = useState(() => { const p = getPrototype(); p.main.category = "Телефоны"; return p; });
    const [isBusy, setIsBusy] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [props, setProps] = useState([]);
    const generalFormState = useNewFormState();
    const adressFormState = useNewFormState();
    const detailsFormState = useNewFormState();
    const appContext = useAppContext();
    const blobService = useBlobService();
    const navigate = useNavigate();

    const updatePropsList = (ad) => {
        adService.getAllProps({ categoryStr: ad.main.category }).then((allProps) => {
            const propsObj = {};
            allProps.forEach((prop) => propsObj[prop.name] = prop);
            ad.properties.forEach((prop) => propsObj[prop.name] = prop);
            const propsList = [];
            for (let key in propsObj) {
                propsList.push(propsObj[key])
            }
            setProps(propsList);
        })
    }

    const save = async ({ needPublish }) => {
        if (!generalFormState.isValid() || !adressFormState.isValid() || !detailsFormState.isValid()) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            console.log(generalFormState);
            return;
        }

        let urls;
        try { urls = await uploadImagesGetUrls() }
        catch { return }

        const createData = {
            "owner": appContext.loginedUser.id.toString(),
            "main": {
                "header": generalFormState.values.header,
                "status": needPublish ? "published" : "unpublished",
                "avatar": urls.length ? urls[0] : null,
                "category": generalFormState.values.category,
                "shortDesc": formatShortDesc(generalFormState.values.desc)
            },
            "price": {
                "value": generalFormState.values.price,
                "currency": "₽"
            },
            "adress": { ...adressFormState.values },
            "meta": {
                "create": Date().toString(),
                "change": Date().toString()
            },
            "images": urls,
            "desc": formatDesc(generalFormState.values.desc),
            "properties": detailsFormState.values
        }

        setIsBusy(true);
        try {
            const result = await adService.create({ createData });
            setAd(result);
            appContext.showNotification("", needPublish ? "Объявление сохранено и опубликовано" : "Объявление сохранено", "common");
            navigate(-1);
        }
        catch (err) { appContext.showNotification("Что-то пошло не так", err.message, "critical") }
        finally { setIsBusy(false) }
    }

    const uploadImagesGetUrls = async () => {
        const images = [...generalFormState.values.images];
        const newFiles = images.filter((img) => typeof img != "string");

        if (newFiles.length == 0) {
            return images;
        }

        let urls = [];
        try { urls = await blobService.uploadImages({ files: newFiles }); } 
        catch (err) { appContext.showNotification("Что-то пошло не так", err.message, "critical"); throw err; }

        let count = 0;
        images.forEach((img, index) => {
            if (typeof img != "string") {
                images[index] = urls[count];
                count++;
            }
        });

        return images;
    }

    const handleCategoryChange = (event) => {
        ad.main.category = event.newValue;
        updatePropsList(ad);
    }

    useEffect(() => {
        updatePropsList(ad);
    }, [])

    useTitleWithDeps({ text: "Создание объявления"});

    return !isBusy && ad && (
        <div className="create-ad-page-client">
            <Header level={2}>Создание объявления</Header>

            <div className="create-ad-page-client__label">Общие данные</div>

            <AutoForm formState={generalFormState}>
                <ImgListInput urls={ad.images} name="images" />
                <CategoryListInput
                    categoryStr={ad.main.category}
                    name="category"
                    onChange={handleCategoryChange} />
                <InputString_withRegExp
                    name="header"
                    defaultValue={ad.main.header}
                    label="Заголовок объявления"
                    placeholder="Введите заголовок"
                    regExp={/^.{1,100}$/g}
                    required
                    comment="Краткая суть объявления"
                    errorComment="Длина не ложна превышать 100 символов" />
                <InputString_withRegExp
                    name="price"
                    defaultValue={ad.price.value}
                    label="Стоимость сделки"
                    placeholder="Введите стоимость"
                    regExp={/^\d+([.]\d+)?$/}
                    required
                    comment="Цена товара, услуги, контракта"
                    errorComment="Ожидается положительное число" />
                <InputText_withRegExp
                    name="desc"
                    defaultValue={formatDescForEdit(ad.desc)}
                    label="Описание"
                    comment="Любая доп. информация (макс 1000 символов)"
                    placeholder="Введите описание"
                    max={1000} />
            </AutoForm>

            <div className="create-ad-page-client__label">Место сделки</div>

            <AdressForm adressDefault={ad.adress} formState={adressFormState} />

            {props?.length && <div className="create-ad-page-client__label">Детали</div> || ""}

            <PropsForm formState={detailsFormState} properties={props} />

            <Spliter />

            <div className="create-ad-page-client__buttons">
                <Grid>
                    <Button color="secondary" onClick={() => save({ needPublish: false })}>Сохранить без публикации</Button>
                    <Button color="primary" onClick={() => save({ needPublish: true })}>Сохранить и опубликовать</Button>
                </Grid>
            </div>

        </div>
    ) || isBusy && <Load /> || isFail && <Fail/>
}
