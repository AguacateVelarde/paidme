FROM node:12.16.1-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "start" ]