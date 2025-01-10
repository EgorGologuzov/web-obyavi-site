import React, { useEffect, useRef, useState } from 'react'
import ListInputHeader from './ListInputHeader'
import "./css/ImgListInput.css"
import ContextMenu from './ContextMenu'
import ContextMenuButton from './ContextMenuButton'
import { useAppContext } from '../contexts/AppContext'
import Fail from './Fail'
import ImageViewDialog from './ImageViewDialog'

export default function ImgListInput({ name, urls, max = 20, onChange, onMontage }) {
    const [files, setFiles] = useState(urls ? [...urls] : []);
    const fileInputRef = useRef(null);
    const appContext = useAppContext();

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files, ...selectedFiles];

        if (newFiles.length > max) {
            newFiles.length = max;
            appContext.showNotification(
                '',
                `Максимальное кол-во изображений ${max} шт.`,
                'important'
            );
        }

        setFiles(newFiles);
        onChange && onChange({ newValue: newFiles, isValid: true });
    };

    const handleImgOnClick = (src) => {
        appContext.showModal("", <ImageViewDialog src={src} />)
    }

    const remove = (file) => {
        const newFiles = [...files];
        const index = newFiles.indexOf(file);
        newFiles.splice(index, 1);
        setFiles(newFiles)
        onChange && onChange({ newValue: newFiles, isValid: true });
    }

    const setFirst = (file) => {
        const newFiles = [...files];
        const index = newFiles.indexOf(file);
        const tmp = newFiles[index];
        newFiles[index] = newFiles[0];
        newFiles[0] = tmp;
        setFiles(newFiles);
        onChange && onChange({ newValue: newFiles, isValid: true });
    }

    const getFileUrl = (file) => {
        return typeof file == "string" ? file : URL.createObjectURL(file);
    }

    useEffect(() => {
        onMontage && onMontage({ value: files, isValid: true })
    }, [])

    return (
        <div className="img-list-input">
            <ListInputHeader
                text={`Изображения (${files.length}/${max})`}
                onPlusClick={() => fileInputRef.current.click()} />
            <input
                className="img-list-input__input"
                name={name}
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleFileChange} />
            <div className="img-list-input__list">
                {files.map((file, index) => 
                    <div className="img-list-input__item" key={index}>
                        <img
                            className="img-list-input__img"
                            src={getFileUrl(file)}
                            onClick={() => handleImgOnClick(getFileUrl(file))} />
                        <ContextMenu>
                            <ContextMenuButton text="Сделать главной" onClick={() => setFirst(file)} />
                            <ContextMenuButton text="Удалить" onClick={() => remove(file)} />
                        </ContextMenu>
                    </div>
                )}
                {!files.length && <Fail message="Файлы не выбраны" />}
            </div>
            <div className="list-input-header__comment">Изображения, демонстрирующие ваше предложение</div>
        </div>
    )
}
