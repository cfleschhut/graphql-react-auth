FROM node:alpine

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install
RUN npm build
ADD . .

CMD ["npm", "start"]

EXPOSE 3000
