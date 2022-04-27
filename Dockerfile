
  
FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./

COPY ./scripts/script.mjs ./
EXPOSE 4000