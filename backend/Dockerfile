FROM node:18.12

WORKDIR /app

ENV PORT=4000
ENV DB_NAME=cinema_1hkq
ENV DB_USER=user
ENV DB_PASSWORD=LjgFMW9f3NZLL27tNamqL5xqWfE6DVc7
ENV DB_HOST=dpg-cer6hu94rebf1ebs61v0-a
ENV DB_PORT=5432
ENV SECRET_KEY=mega_super_secret_key

COPY . .

RUN npm install 

EXPOSE 4000

CMD ["sh","-c","npm run dev"]   