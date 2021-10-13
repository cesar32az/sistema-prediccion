FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# copy entrypoint.sh
COPY ./start.sh .

# copy project
COPY . .

EXPOSE 4000

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/start.sh"]

CMD ["npm", "run", "dev"]