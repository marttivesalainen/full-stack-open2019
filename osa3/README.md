# Full-stack training / Phone book

This is a really simple application for training full-stack development with Node. There are probably nothing useful for anyone seeking solutions for their own projects.

Preview of the application runs on Heroku. You can check it out [here](https://morning-refuge-30498.herokuapp.com/)

## Todo

There are some problems with some dependencies when using yarn. Consider take a look for this. However since I'm just the beginning of my journey to learn coding and there is a lot to do I'm going to ignore these warnings purposely.

Scripts for deploying production ready build anywhere.

## Stack

### Server

This project uses Express library for serving REST API. "Database" is hard coded in index.js.

### Client

Client source is in ./client and has its own dependencies.

## Development and production environments

### Development

1. Clone the repository.
2. Setup database params: `cp .env.example .env` and place your mongo username and password
3. In application root run `yarn && yarn watch`.
4. In ./client run `yarn && yarn start`.

### Run production ready application locally

1. Clone the repository.
2. Setup database params: `cp .env.example .env` and place your mongo username and password
3. Set node environment variable manually `export NODE_ENV=production`
4. In application root run `yarn && yarn build && node index.js`

### Deploy to heroku

This project is configured to be tossed to Heroku. Just run `git push heroku master` to deploy. According to the [Heroku Dev Center](https://devcenter.heroku.com/changelog-items/688) Node.js applications deployed in Heroku default to NODE_ENV=production so no need to mind about it.

Set environment variable MONGODB_URI=yourmongodburi at Heroku settings.
