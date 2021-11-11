
## Description

A simple json storage server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker Buiild

```bash
# build app and create docker container
$ npm run build:docker

# run docker container
$ npm run start:docker

```

## Config

Create .env file with following content
```conf
KEY=123
WHITELIST=127.0.0.1,::ffff:127.0.0.1
PORT=6234
```


## License

json-storage-server is [MIT licensed](LICENSE).
