FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ARG ORIGIN=http://0.0.0.0:3000
ENV ORIGIN=$ORIGIN

COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc

RUN pnpm install

COPY . .

RUN pnpm build

RUN apk update && \
	apk add --no-cache yt-dlp \
		ca-certificates

EXPOSE 3000

CMD ["node", "build"]
