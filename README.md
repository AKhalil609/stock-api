# Stock Manger API

## Getting Started

### Prerequisites

What you need to install

```
node.js
```

### Installing dependencies

```
$ npm i
```

### To run the server

```
$ npm run start
```

## APIs

Server runs on mongodb://admin:a123456@ds161610.mlab.com:61610/stocks28

### Main routes

```
 /stock
 /user
```

### Get all stocks

```
GET /stock
```

### Create one stock

params: (symbol[string]: required, //Each company has its own unique Symbol eg.Facebook: FB, Netfilx: NFLX)

```
POST /stock/:symbol
```

### Update stock

```
PATCH /stock
```

### Get one stock

params: (symbol[string]: required, //Each company has its own unique Symbol eg.Facebook: FB, Netfilx: NFLX)

```
GET /stock/:symbol
```

### Add new user

body: (Name [string]: required) (personalID [string]: required, unique)
```
POST /user
```

### Get all users

```
GET /user
```

### Get one user

params: (personalID[string]: required)

```
GET /user/:personalID
```
### User invests in a company

body: (asset [string]) (investment [Number], //asset is the company symbol )
params: (personalID[string]: required)
```
PUT /user/:personalID
```

### Get User profit

params: (personalID[string]: required)

```
POST /user/:personalID
```
### configs

```
src/config/config.js
```

In this file you will be able to configure :-


```
dbURL: URL to remote MongoDB
```

## Author

* **Ahmed Hegab** - _Github link_ - [AKhalil609](https://github.com/AKhalil609)