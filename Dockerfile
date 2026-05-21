FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY packages/store/package.json ./packages/store/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

RUN yarn install

COPY . .

RUN cd packages/db && ./node_modules/.bin/prisma generate

EXPOSE 3000

CMD ["yarn", "run", "dev:docker"]
