FROM node:15

WORKDIR /usr/src/app
COPY ./index.js .
RUN npm install
RUN npm install express
RUN npm install axios
RUN npm install mariadb
EXPOSE 3000

CMD [ "node", "index.js" ]