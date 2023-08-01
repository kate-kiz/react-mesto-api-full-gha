
import { useState } from "react";
// import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(evt) {
        console.log("lalala")
        evt.preventDefault();
        onAddPlace({
            link,
            name: title,
        });
    }

    return (
        <PopupWithForm
            name='addCard'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__section">
                <input
                    className="popup__input popup__input_type_name"
                    type="text"
                    name="name"
                    id="title"
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    onChange={handleTitleChange}
                    value={title}
                />
                <span className="popup__error" id="inputTitle-error" />
            </div>
            <div className="popup__section">
                <input
                    className="popup__input popup__input_type_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    required=""
                    onChange={handleLinkChange}
                    value={link}
                />
                <span className="popup__error" id="inputLink-error" />
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;