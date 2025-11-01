FROM node:20.19.4-alpine3.22


RUN addgroup react && adduser -S -G react front
USER front

WORKDIR /app/
RUN mkdir datos
COPY --chown=front:react package*.json .

RUN npm install

COPY --chown=front:react . .

EXPOSE 5173

CMD [ "npm","run", "dev" ]