FROM node:alpine

WORKDIR /var/www

COPY ./package.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
