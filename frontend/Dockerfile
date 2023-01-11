FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["sh","-c", "npm run start"]

