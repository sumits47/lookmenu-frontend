# build environment
FROM node:14-buster as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

# RUN npx nuxt build --standalone
RUN yarn build

# production environment
FROM node:14-buster-slim
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . ./

COPY --from=build /app/.nuxt ./.nuxt

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
