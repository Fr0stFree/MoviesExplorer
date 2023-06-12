import { InvalidCredentials } from "./errors";

export default class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async verifyToken (token) {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...this._headers,
            }
        });
        if (!response.ok) {
            const { message } = await response.json();
            throw Error(message)
        }
        return await response.json()
    }

    async login ({ email, password }) {
        const response = await fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const { message } = await response.json();
            throw Error(message)
        }
        return await response.json()
    }

    async register ({ email, password, name }) {
        const response = await fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password, name })
        });
        if (!response.ok) {
            const { message } = await response.json();
            throw Error(message)
        }
        return await response.json()
    }

    async update({ email, name }) {
        const response = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...this._headers,
            },
            body: JSON.stringify({ email, name })
        });
        if (!response.ok) {
            const { message } = await response.json();
            throw Error(message)
        }
        return await response.json()
    }
}
