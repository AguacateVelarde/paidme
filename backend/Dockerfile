FROM node:12.16.1-alpine3.9

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i
COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]