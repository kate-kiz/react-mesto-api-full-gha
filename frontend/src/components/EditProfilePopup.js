
import { useState, useEffect } from "react";
// import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onUpdateUser, isOpen, onClose, currentUser }) {

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            job: description
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDesctiptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className="popup__section">
                <input
                    className="popup__input popup__input_type_name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Имя"
                    required=""
                    minLength={2}
                    maxLength={40}
                    value={(name !== null && name !== undefined) ? name : ''}
                    onChange={handleNameChange}
                />
                <span className="popup__error" id="inputName-error" />
            </div>
            <div className="popup__section">
                <input
                    className="popup__input popup__input_type_profession"
                    type="text"
                    name="job"
                    id="text"
                    placeholder="О себе"
                    required=""
                    minLength={2}
                    maxLength={200}
                    value={(description !== null && description !== undefined) ? description : ''}
                    onChange={handleDesctiptionChange}
                />
                <span className="popup__error" id="inputText-error" />
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;