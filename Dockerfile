FROM node
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
RUN npm run db-deploy
RUN npx prisma generate

EXPOSE 8000
CMD ["npm", "start"]