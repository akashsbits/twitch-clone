# Twitch Clone

A simple messenger application built in [React](https://reactjs.org/) and [Node.js](https://expressjs.com/) with the help of [getstream.io](https://getstream.io).

## Quick Start

- First you need to sign up to [getstream.io](https://getstream.io) to get API key, API secret and App id.

- Go into the `client` directory.

- Run the following command in your terminal to install dependencies.

### `npm install`

- Create a new `.env` file in the client directory and add your `API URL` and `API Key`. For example see [.env.sample](./client/.env.sample) file.

- After creating `.env` file, run the following command.

### `npm run start:frontend`

- Go into the `server` directory and run the following command.

### `npm install`

- Create a new `.env` file in the server directory and add your `API key`, `API secret` and `App id`. For example see [.env.sample](./server/.env.sample).

- To start the server run

### `npm run start:backend`

- Then in the browser navigate to [http://localhost:3000](http://localhost:3000).

## License

[MIT](LICENSE)
