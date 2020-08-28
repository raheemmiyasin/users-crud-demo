FROM node:14
WORKDIR /root/webapp

COPY package.json yarn.lock ./
RUN yarn

COPY src/ src/
COPY public/ public/
COPY app.js server.js ./
ENV NODE_ENV production
RUN yarn build