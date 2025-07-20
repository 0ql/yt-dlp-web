FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ARG ORIGIN=http://localhost:3000
ENV ORIGIN=$ORIGIN

COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["node", "build"]
