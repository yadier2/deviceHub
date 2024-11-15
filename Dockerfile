FROM node:22-alpine3.20 AS base

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3

WORKDIR /app


COPY package*.json .
COPY tsconfig*.json .
COPY src src

RUN npm install
RUN npm run tsc

EXPOSE $PORT

CMD ["dumb-init", "node", "build/index.js"]