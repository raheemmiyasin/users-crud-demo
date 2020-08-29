FROM node:14
WORKDIR /root/webapp

ADD package.json package-lock.json ./
RUN npm install

ADD app.js server.js ./
ENV NODE_ENV production