FROM node:10

RUN npm i -g swagger

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10010
CMD [ "node", "app.js" ]