# 💵 Paidme

### A simple website to use openpay customers and cards 🚀

## What are the tools use in this project?

- React in the client using styles-components and Material design UI
- Express as http library with Node.js
- Sql-lite as database to store the data
- Typeorm as ORM to connect the backend with database
- Openpay as third party dependencie to save customers and cards

## How run the project?

1. First, You need change the openpay's private key and merchant id in [this file](backend/bin/app), is mandatory change this properties.

```
require("../")({
  port: 8000,
  host: "localhost",
  openPayCredentials: {
    merchantId: "*",
    privateKey: "*",
    isProduction: false,
  },
});
```

2. Install dependencies in twice projects with `npm ci`

3. I recommend use docker-compose, for this only you need use the next command `docker-compose run --build`

4. If you want running the project "manually", you could use `npm run start`in backend folder and the same command in frontend folder. By default backend project use 8000 port and frontend use 3000.

This project was built with ❤️
