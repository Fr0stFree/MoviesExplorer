import {useNavigate} from "react-router-dom";

import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <section className="not-found__container">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button className="not-found__go-back-button"
                        onClick={() => navigate(-1)}
                >Назад</button>
            </section>
        </main>
    )
}
