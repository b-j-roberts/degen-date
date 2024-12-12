FROM node:21.7.1-alpine

RUN apk add --no-cache bash git jq curl yarn

WORKDIR /app
COPY ./interface/package.json ./interface/yarn.lock ./
RUN yarn
COPY ./interface ./

EXPOSE 3000

SHELL ["/bin/bash", "-c"]
# Clear the entrypoint
ENTRYPOINT []
CMD ["npm", "start"]
