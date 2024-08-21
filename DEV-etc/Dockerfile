# syntax = docker/dockerfile:experimental
FROM node:21-alpine AS base

FROM base AS builder
# create work directory in app folder
WORKDIR /app

# # install required packages for node image
RUN apk --no-cache add g++ make git

## copy over all files to the work directory
COPY ./ /app/

## SETUP npn registry 
RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && echo -e "//registry.npmjs.org/:_authToken=$NPM_REG_TOKEN" > /root/.npmrc
RUN npm set registry "https://registry.npmjs.org/"
RUN npm get registry 
## INSTALL node modules
RUN find /app/
RUN npm install --prefer-offline || npm install --prefer-offline --legacy-peer-deps

## copy over all files to the work directory
# ADD . /app

## BUILD stage
RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && echo -e "$BUILD_ENV" > .env
RUN source .env 
# Translate
RUN if grep -q 'VUE_APP_CROWDIN_PROJECT_ID' .env; then echo 'CROWDIN ENV EXIST'; node node_modules/@ananasbear/crowdin/app/app.js; else echo 'CROWDIN ENV DOEST NOT EXIST';fi
# build
RUN npm run build

## Delete npn registry credentials
RUN rm -f /root/.npmrc

## make image for deployment
FROM base AS stable
WORKDIR /app
COPY --from=builder /app/.output/ /app/.output/
COPY --from=builder /app/public/ /app/public/

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
ENV TZ="europe/kiev"
EXPOSE 3000
# run the build project with node
# ENTRYPOINT ["node", ".output/server/index.mjs"]
ENV PORT=3000
CMD node .output/standalone/server.js

