import config from '../config';

export default class MoviesApi {
    constructor() {
        this._baseUrl = config.BACKEND_URL;
        this._moviesUrl = config.MOVIES_URL;
        this._headers = {
            'Content-Type': 'application/json',
        }
    }

    getRemoteMovies = async () => {
        const response = await fetch(`${this._moviesUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: this._headers,
        });
        if (!response.ok) {
            throw Error(`Ошибка: ${response.status}`);
        }
        const completeResponse = await response.json();
        return completeResponse.map(this._prettifyMovie);
    }

    _prettifyMovie = (movie) => {
        movie.movieId = movie.id;
        movie.thumbnail = this._moviesUrl + movie.image.formats.thumbnail.url;
        movie.image = this._moviesUrl + movie.image.url;
        delete movie.id;
        return movie;
    }

    getSavedMovies = async () => {
        const response = await fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...this._headers,
            },
        });
        if (!response.ok) {
            throw Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    }

    async saveMovie({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN }) {
        const response = await fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...this._headers,
            },
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                movieId,
                nameRU,
                nameEN
            })
        });
        if (!response.ok) {
            const {message} = await response.json();
            throw Error(message)
        }
        return await response.json()
    }

    deleteMovie = async ({ _id }) => {
        const response = await fetch(`${this._baseUrl}/movies/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...this._headers,
            },
        });
        if (!response.ok) {
            throw Error(`Ошибка: ${response.status}`);
        }
    }
}
