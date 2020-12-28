FROM node:15-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

COPY ./App /home/app

CMD ["node","home/app/app.js"]