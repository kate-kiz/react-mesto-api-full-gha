
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Registration from './Registration';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EdtiAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import * as Auth from '../utils/Auth.js'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { api } from '../utils/Api';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [iseditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrated, setRegistrated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn === true) {
      api.getInitialCards()
        .then(result => {
          setCards(result)
        })
        .catch((error) => {
          console.log(error)
        })

      api.getUserInfo()
        .then(result => {
          setCurrentUser(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])


  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      Auth.checkToken(token)
        .then((res) => {
          const userEmail = res.data.email;
          setUserEmail(userEmail);
          setLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.log(error);
          setIsInfoToolTipOpen(true);
        })
    }
  }

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        if (email && password !== '') {
          const { token } = res;
          localStorage.setItem('token', token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsInfoToolTipOpen(true);
      })
  }

  function handleRegister({ email, password }) {
    console.log(email, password);
    Auth.register(email, password)
      .then(() => {
        setRegistrated(true);
        setIsInfoToolTipOpen(true);
        navigate('./sign-in', { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setRegistrated(false);
        setIsInfoToolTipOpen(true);
      })
  }

  function deleteToken() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in', { replace: true });
  }

  useEffect(() => {
    tokenCheck();
  }, [])


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard(card)
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImageOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(data) {
    console.log("handleAddPlaceSubmit")
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} handleExit={deleteToken} />
        <Routes>
          <Route path='/' element={
            <>
              <ProtectedRoute element={Main}
                isLoggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                cards={cards}
              />
              <ProtectedRoute element={Footer}
                isLoggedIn={loggedIn}
              />
            </>
          } />
          <Route path='/sign-up'
            element={<Registration
              onRegister={handleRegister}
            />}
          />
          <Route path='/sign-in'
            element={<Login
              onLogin={handleLogin}
            />}
          />
        </Routes>
      </div>

      <EditProfilePopup
        isOpen={iseditProfilePopupOpen}
        onClose={closeAllPopups}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImageOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />

      <EdtiAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <InfoToolTip
        name={'success'}
        successTitle='Вы успешно зарегестрировались!'
        failureTitle='Что-то пошло не так! Попробуйте еще раз.'
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        registrated={registrated}
      />

      {/* <PopupWithForm
          name='confirmationPopup'
          title='Вы уверены?'
          isOpen={false}
          onClose={closeAllPopups}
          buttonText='Да'
        /> */}
    </CurrentUserContext.Provider >
  );
}

export default App;
