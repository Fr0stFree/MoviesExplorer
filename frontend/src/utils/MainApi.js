import { InvalidCredentials } from "./errors";

export default class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async login ({ email, password }) {
        const response = await fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw Error('Авторизация не удалась');
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
            throw Error('Регистрация не удалась')
        }
        return await response.json()
    }
}
