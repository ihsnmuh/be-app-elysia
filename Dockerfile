FROM oven/bun

WORKDIR /app

COPY ./package.json .
COPY ./prisma .

RUN bun install --ignore-scripts
RUN bunx prisma generate

COPY . .

EXPOSE 3001

CMD [ "bun", "run", "./src/index.ts" ]