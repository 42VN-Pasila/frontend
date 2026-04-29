FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

ARG VITE_RUDEX_URL=/rudex
ARG VITE_DIRECTOR_URL=/director
ENV VITE_RUDEX_URL=$VITE_RUDEX_URL
ENV VITE_DIRECTOR_URL=$VITE_DIRECTOR_URL

RUN pnpm gen && pnpm build

EXPOSE 3000

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "3000"]
