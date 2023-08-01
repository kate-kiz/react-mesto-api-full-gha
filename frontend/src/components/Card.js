
// import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonActiveClassName = (`element__button-like ${isLiked && 'element__button-like_type_active'}`);

    function handleClick() {
        onCardClick(card);
    }

    // const cardLikeButtonActive = (
    //     `button-like ${isLiked && 'button-like_type_active'}`
    // )

    function handleCardLike() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card)
    }

    return (
        <article className="element">
            <img src={card.link}
                alt={card.name}
                className="element__picture"
                onClick={handleClick}
            />
            <div className="element__container">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonActiveClassName} onClick={handleCardLike} />
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button type="button" className="element__button-delete" onClick={handleCardDelete} />}
        </article>
    );
}

export default Card;