FROM node:19.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

COPY ./test ./test

EXPOSE 8080

CMD ["npm","start"]