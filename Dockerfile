FROM node:14 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g npm@8.4.0
RUN npm install
COPY . .

COPY ./src/ormconfig.docker.ts ./src/ormconfig.ts 
RUN npm run build

# stage 2
FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g npm@8.4.0
RUN npm install

COPY --from=builder /usr/app/dist ./dist

COPY .env .

EXPOSE 5000
CMD node dist/src/server.js