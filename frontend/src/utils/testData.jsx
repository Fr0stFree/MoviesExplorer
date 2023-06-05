import image1 from "../images/1.svg";
import image2 from "../images/2.svg";
import image3 from "../images/3.svg";
import image4 from "../images/4.svg";
import image5 from "../images/5.svg";
import image6 from "../images/6.svg";
import image7 from "../images/7.svg";

const testMovieData = [
    {
        "_id": Math.random().toString(36),
        "title": "33 слова о дизайне",
        "duration": "1ч 47м",
        "image": image1,
        "isLiked": true,
    },
    {
        "_id": Math.random().toString(36),
        "title": "Киноальманах «100 лет дизайна»",
        "duration": "1ч 3м",
        "image": image2,
        "isLiked": false,
    },
    {
        "_id": Math.random().toString(36),
        "title": "В погоне за Бенкси",
        "duration": "1ч 42м",
        "image": image3,
        "isLiked": true,
    },
    {
        "_id": Math.random().toString(36),
        "title": "Бег это свобода",
        "duration": "1ч 44м",
        "image": image5,
        "isLiked": true,
    },
    {
        "_id": Math.random().toString(36),
        "title": "Баския: Взрыв реальности",
        "duration": "1ч 21м",
        "image": image4,
        "isLiked": false,
    }
]

const testNewMovieData = [
    {
        "_id": Math.random().toString(36),
        "title": "Когда я думаю о Германии ночью",
        "duration": "1ч 32м",
        "image": image6,
        "isLiked": false,
    },
    {
        "_id": Math.random().toString(36),
        "title": "Gimme Danger: История Игги и The Stooges",
        "duration": "1ч 48м",
        "image": image7,
        "isLiked": false,
    }
]

export {testMovieData, testNewMovieData};
