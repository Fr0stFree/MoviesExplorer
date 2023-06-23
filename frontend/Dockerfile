FROM node:18.16.0 as builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --only=prod

COPY . /app

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/nginx.local.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
