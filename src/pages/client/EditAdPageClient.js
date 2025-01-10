import React, { useEffect, useState } from 'react'
import "./EditAdPageClient.css"
import Header from '../../components/Header'
import { useTitleWithDeps } from '../../hook/useTitle';
import Button from '../../components/Button';
import AdStatus from '../../components/AdStatus';
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { InputString_withRegExp, InputText_withRegExp } from '../../hoc/withRegExpValidation';
import Grid from '../../components/Grid';
import { useAdService } from '../../data/AdService'
import { useNavigate, useParams } from 'react-router-dom';
import { busyProcessWithFail, formatDesc, formatDescForEdit, formatShortDesc } from '../../utils/utils'
import Load from '../../components/Load'
import Fail from '../../components/Fail'
import Spliter from '../../components/Spliter'
import ImgListInput from '../../components/ImgListInput';
import CategoryListInput from '../../components/CategoryListInput';
import AdressForm from '../../components/AdressForm';
import PropsForm from '../../components/PropsForm';
import { useAppContext } from '../../contexts/AppContext';
import { useBlobService } from '../../data/BlobService';

export default function EditAdPageClient() {
    const adService = useAdService();
    const [ad, setAd] = useState();
    const [isBusy, setIsBusy] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [props, setProps] = useState([]);
    const { id } = useParams();
    const generalFormState = useNewFormState();
    const adressFormState = useNewFormState();
    const detailsFormState = useNewFormState();
    const navigate = useNavigate();
    const appContext = useAppContext();
    const blobService = useBlobService();

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

    const saveChanges = async () => {
        if (!generalFormState.isValid() || !adressFormState.isValid() || !detailsFormState.isValid()) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }

        let urls;
        try { urls = await uploadImagesGetUrls() }
        catch { return }

        const updateData =  {
            "id": ad.id,
            "main": {
                "header": generalFormState.values.header,
                "status": ad.main.status,
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
                "change": ad.meta.change
            },
            "images": urls,
            "desc": formatDesc(generalFormState.values.desc),
            "properties": detailsFormState.values
        }

        setIsBusy(true);
        try {
            const result = await adService.update({ updateData });
            setAd(result);
            appContext.showNotification("", "Сохранение прошло успешно", "common");
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

    const cancel = () => {
        navigate(-1);
    }

    const handleCategoryChange = (event) => {
        ad.main.category = event.newValue;
        updatePropsList(ad);
    }

    const publish = ({ idList }) => {
        busyProcessWithFail(isBusy, setIsBusy, setIsFail, () => adService.publish({ idList })
            .then(() => load())
        )
    }

    const unpublish = ({ idList }) => {
        busyProcessWithFail(isBusy, setIsBusy, setIsFail, () => adService.unpublish({ idList })
            .then(() => load())
        )
    }

    const load = () => {
        busyProcessWithFail(isBusy, setIsBusy, setIsFail, () => adService.getById({ id })
            .then((adValue) => {
                setAd(adValue);
                updatePropsList(adValue);
            })
        )
    }

    useEffect(() => {
        load();
    }, []);

    useTitleWithDeps({ text: "Ред.: " + ad?.main?.header, deps: [ad] });

    return !isBusy && ad && (
        <div className="edit-ad-page-client">
            <Header level={2}>Редактирование объявления</Header>
            <AdStatus ad={ad} />
            <Spliter />
            {ad.main.status == "published" && <Button color="secondary" onClick={() => unpublish({ idList: [ad.id] })}>Снять с публикации</Button>}
            {ad.main.status == "unpublished" && <Button color="primary" onClick={() => publish({ idList: [ad.id] })}>Опубликовать</Button>}

            <div className="edit-ad-page-client__label">Общие данные</div>

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

            <div className="edit-ad-page-client__label">Место сделки</div>

            <AdressForm adressDefault={ad.adress} formState={adressFormState} />

            <div className="edit-ad-page-client__label">Детали</div>

            <PropsForm formState={detailsFormState} properties={props} />

            <Spliter />

            <div className="edit-ad-page-client__buttons">
                <Grid>
                    <Button color="secondary" onClick={cancel}>Отменить изменения</Button>
                    <Button color="primary" onClick={saveChanges}>Сохранить изменения</Button>
                </Grid>
            </div>

        </div>
    ) || isBusy && <Load /> || isFail && <Fail/>
}
