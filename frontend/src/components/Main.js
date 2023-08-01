
import { useContext } from 'react';
import editAvatarButton from '../images/pen.svg';
import editButton from '../images/edit_button.svg';
import addButton from '../images/add_button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, onAddPlace, onCardClick, onCardDelete, onCardLike, onEditAvatar, onEditProfile }) {

    const currentUser = useContext(CurrentUserContext);

    console.log(currentUser);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img src={currentUser.avatar} className="profile__image" alt={currentUser.name} />
                    <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}>
                        <img
                            className="profile__pen"
                            src={editAvatarButton}
                            alt="Карандаш"
                        />
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile}>
                            <img
                                src={editButton}
                                className="profile__edit-logo"
                                alt="Плюс"
                            />
                        </button>
                    </div>
                    <p className="profile__text">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}>
                    <img
                        src={addButton}
                        className="profile__add-logo"
                        alt="Плюс"
                    />
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (<Card
                        card={card}
                        key={card._id}
                        // title={card.name}
                        // likeCounter={card.likes.length}
                        // image={card.link}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)
                })}
            </section>
        </main>

    );
}

export default Main;