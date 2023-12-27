FROM node:alpine AS build
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

RUN npm install typescript -g

COPY . .

RUN tsc -b



From node:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/public public

EXPOSE 3000

CMD ["node", "./dist/index.js"]