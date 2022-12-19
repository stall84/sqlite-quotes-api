FROM node:16-alpine3.16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY dist/csv_sources ./csv_sources

RUN npm install
RUN mkdir -p ./db
RUN node csv_sources/recreate.js

COPY dist/index.js ./index.js 

ENTRYPOINT [ "/usr/local/bin/node", "/app/index.js", "localTesting" ]