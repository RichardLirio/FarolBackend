## dependencies
yarn add @prisma/client fastify fastify-zod zod zod-to-json-schema @fastify/jwt 

## devDependencies
yarn add ts-node-dev typescript @types/node --dev

## Initialise prisma
npx prisma init --datasource-provider mysql
npx prisma db pull

## Migrate the schema
npx prisma migrate dev --name init
