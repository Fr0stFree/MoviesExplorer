## Movies-Explorer
### Описание проекта
Coming soon...

### Стек технологий
- React.js
- Express.js
- MongoDB
- Git + GitHub
- Docker
- Nginx
- Yandex Cloud

---

### Frontend

Ссылка на [архив](https://disk.yandex.ru/d/0P6SvcK1EgfZXA) с макетом

---

### Backend

Сервис расположен по адресу... 

Нет денег на сервер. Но будет расположен вот по [этому](https://api.boss.of.this.gym.nomoredomains.monster/)
IP <u>130.193.36.150</u>

#### Запуск сервиса локально
Для запуска необходимо наличие локально установленной базы данных `mongodb >= 4.0.4`, `node >= 18.12.1` и пакетного 
менеджера `npm`.
```bash
npm install --omit=dev
npm run dev
```

#### Запуск сервиса в контейнере [Альтернативный вариант]
Для запуска необходимо наличие `Docker` и плагина `docker compose`.
```bash
docker compose up --build
```

#### Endpoints

<details>
<summary> Регистрация пользователя </summary>

- <u>Requst</u>
```bash
curl -X POST http://localhost:5000/signup \
     -H "Content-Type: application/json" \
     -d '{
            "name": "John Doe",
            "email": "fake@admin.com",
            "password": "12345678"
         }'
```
- <u>Response</u> __201 CREATED__
```json
{
  "_id": "64732fe5b56e3c3be8442865",
  "name": "John Doe",
  "email": "fake@admin.com"
}
```
</details>

<details>
<summary> Авторизация пользователя </summary>

- <u>Requst</u>
```bash
curl -X POST http://localhost:5000/signin \
     -H "Content-Type: application/json" \
     -d '{
            "email": "fake@admin.com",
            "password": "12345678"
         }'
```
- <u>Response</u> __200 OK__
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo",
  "type": "Bearer"
}
```
</details>

<details>
<summary> Авторизация пользователя </summary>

- <u>Requst</u>
```bash
curl -X GET http://localhost:5000/users/me \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo" \
     -H "Content-Type: application/json" 
```
- <u>Response</u> __200 OK__
```json
{
  "_id": "64732fe5b56e3c3be8442865",
  "email": "fake@admin.com",
  "name": "John Doe"
}
```
</details>

<details>
<summary> Редактирование пользовательских данных </summary>

- <u>Requst</u>
```bash
curl -X PATCH http://localhost:5000/users/me \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo" \
     -H "Content-Type: application/json" \
     -d '{
            "email": "not_fake_I_promise@admin.com",
            "name": "Dow John"
         }'
```
- <u>Response</u> __200 OK__
```json
{
  "_id": "64732fe5b56e3c3be8442865",
  "email": "not_fake_i_promise@admin.com",
  "name": "Doe John"
}
```
</details>

<details>
<summary> Добавление фильма в фильмотеку </summary>

- <u>Requst</u>
```bash
curl -X POST http://localhost:5000/movies/ \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo" \
     -H "Content-Type: application/json" \
     -d '{
            "country": "USA",
            "director": "Christopher Nolan",
            "duration": 148,
            "year": "2010",
            "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            "image": "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i",
            "trailerLink": "http://placeimg.com/640/480",
            "thumbnail": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/8ab9a119-dd74-44f0-baec-0629797483d7/300x450",
            "movieId": 500,
            "nameRU": "Начало",
            "nameEN": "Inception"
         }'
```
- <u>Response</u> __201 CREATED__
```json
{
  "country": "USA",
  "director": "Christopher Nolan",
  "duration": "148",
  "year": "2010",
  "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  "image": "https://imdb.com/title/tt1375666/mediaviewer/rm3426651392?ref_=tt_ov_i",
  "trailerLink": "http://placeimg.com/640/480",
  "thumbnail": "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/8ab9a119-dd74-44f0-baec-0629797483d7/300x450",
  "owner": "64732fe5b56e3c3be8442865",
  "movieId": 500,
  "nameRU": "Начало",
  "nameEN": "Inception",
  "_id": "6473374af2532f5c4fd3635f"
}
```
</details>

<details>
<summary> Получение списка фильмов из фильмотеки </summary>

- <u>Requst</u>
```bash
curl -X GET http://localhost:5000/movies/ \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo" \
     -H "Content-Type: application/json" 
```
- <u>Response</u> __200 OK__
```json
[
  {
    "_id": "647334aef2532f5c4fd36355",
    "country": "La Mirada",
    ...
    "nameEN": "Lakin and Sons"
  },
  {
    "_id": "6473370ef2532f5c4fd36359",
    ...
    "nameRU": "Начало",
    "nameEN": "Inception"
  },
  ...
]
```
</details>

<details>
<summary> Удаление фильма из фильмотеки </summary>

- <u>Requst</u>
```bash
curl -X DELETE http://localhost:5000/movies/6473370ef2532f5c4fd36359 \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDczMmZlNWI1NmUzYzNiZTg0NDI4NjUiLCJpYXQiOjE2ODUyNzEwNzYsImV4cCI6MTY4NTg3NTg3Nn0.He4KvhqZ_Yv58fY0IyjZg37euFVxZnKogcyICj3FMIo" \
     -H "Content-Type: application/json"
```
- <u>Response</u> __204 NO CONTENT__
</details>
