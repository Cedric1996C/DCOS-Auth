FROM registry.njuics.cn/library/node:6-alpine

COPY . /app
WORKDIR /app

RUN npm install && \
    npm build

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
