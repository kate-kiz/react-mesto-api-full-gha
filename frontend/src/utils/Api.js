class Api {
    constructor({ url, headers, authorization }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

    addCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            body: JSON.stringify({ name: name, link: link }),
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

    getUserInfo() {
        console.log("api url", this._url);
        return fetch(`${this._url}/users/me`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => this._checkResponse(res));
    };

    setUserInfo({ name, job }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify({ name: name, about: job }),
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((res) => this._checkResponse(res));
    };

    likeCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

    dislikeCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

    removeCard(cardID) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

    setUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar }),
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => this._checkResponse(res));
    };

}

export const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        'Content-type': 'application/json',
        // authorization: 'e24a5663-2327-4061-8ac2-635e8dfeb3de'
    },
});
