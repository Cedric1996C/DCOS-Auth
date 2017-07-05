FROM node:8.1-alpine

COPY . /app
WORKDIR /app

RUN npm install
EXPOSE 8080

ENTRYPOINT ["npm", "start"]
