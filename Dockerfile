FROM node:12.14-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh

USER node

COPY --chown=node:node . /home/node/app

WORKDIR /home/node/app

CMD node .
