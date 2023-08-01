
import { useRef } from 'react';
// import React from 'react';
import PopupWithForm from './PopupWithForm';

function EdtiAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const ref = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    return (
        <PopupWithForm
            name='updateAvatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__section">
                <input
                    className="popup__input popup__input_type_link"
                    type="url"
                    name="link"
                    id="link-avatar"
                    placeholder="Введите ссылку"
                    required=""
                    ref={ref}
                />
                <span className="popup__error" id="inputLink-error-avatar" />
            </div>
        </PopupWithForm>
    )
}

export default EdtiAvatarPopup;