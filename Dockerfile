FROM node:16-alpine

WORKDIR /app

ARG host
ENV HOST={host}

ARG port
ENV PORT={port}

RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

COPY package.json .

RUN npm i --silent -g npm
RUN npm i --legacy-peer-deps --silent

# Copy all the src files once dependencies are installed
COPY . .

RUN adduser --system --disabled-password 1000 && \
chown -R 1000:nogroup /app

USER 1000

EXPOSE 8001

CMD npm run deploy
