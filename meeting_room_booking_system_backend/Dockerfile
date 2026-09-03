ARG NODE_IMAGE=docker.m.daocloud.io/library/node:20-alpine

FROM ${NODE_IMAGE} AS builder

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM ${NODE_IMAGE} AS production-stage

COPY --from=builder /app/dist /app
COPY --from=builder /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]
