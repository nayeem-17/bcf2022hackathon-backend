FROM node
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
RUN npm run db-deploy
EXPOSE 8000
CMD ["npm", "start"]