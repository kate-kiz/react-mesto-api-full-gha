import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_places ${isOpen ? `popup_opened` : ''}`}>
            <div className="popup__image-container">
                <button className="popup__button-close" type="button" onClick={onClose} />
                <img
                    src={card.link}
                    alt={card.name}
                    className="popup__picture"
                />
                <h3 className="popup__image-caption">{card.name}</h3>
            </div>
        </div>

    );
}

export default ImagePopup;