# Scalable websockets server

### Websocket server written in NodeJS
### Supported in auto-scaling mode (Kubernetes)
### Uses Redis Pub-Sub internally to share data between multiple node js servers


# How to run locally using Node JS?
- Run Redis locally or run redis docker image (`docker run -p 6379:6379 redis`)
- Make sure Node JS and typescript is installed locally
- Run `tsc -b` to generate corresponding javascript code in `dist` folder
- Copy .env.example file content to a new .env file and update with correct Redis URL (`REDIS_URL="redis://localhsot:6379"`)
- Run `node dist/index.js` to start the server

# How to run using docker?
- By default, redis and our app's container will not able to communicate with each other.
- We need to create a docker network to do that. (Run `docker network create scalable-websockets-network` to create a new docker network with name scalable-websockets-network)
- Run redis image with same network ( Run `docker run -p
6379:6379 --name some-redis --network=scalable-websockets-network -d redis`)
- Build our app's docker image (Run `docker build -t scalable_websockets:1.0 .`)
- Run our app's docker image with the same network and provide redis container name in Redis URL instead of localhost. (Run `docker run -e
REDIS_URL='redis://some-redis:6379' -p 3000:3000 --network=scalable-websockets-network scalable_websockets:1.0`)