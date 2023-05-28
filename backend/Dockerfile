FROM node:18-alpine as build

COPY . /app

WORKDIR /app

RUN npm install --omit=dev

CMD ["npm", "run", "start"]
