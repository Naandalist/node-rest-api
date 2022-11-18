# Simple Node REST API

>  CRUD REST API using Node.js with MongoDB and cloudinary to store image files.

This is for learning/experimental purposes. Because [Heroku](https://id.heroku.com/) will stop its free service. So I need to find another alternative, just like [Render](https://render.com), [Railway](https://railway.app), or [Cyclic](https://cyclic.sh).

## Usage

```
# Install dependencies
npm install
yarn 

# Run in develpment
npm run dev
yarn run dev

# Run in production
npm start
yarn start
```

## Routes
```
POST        /api/user
GET         /api/users
GET         /api/user/:id
PUT         /api/user/:id
DELETE      /api/user/:id
```
more details at https://documenter.getpostman.com/view/8862893/2s8YmNR3Tw

Feel free to add to this and create a PR. I plan on creating a better router, but if you'd like to do that, feel free also.