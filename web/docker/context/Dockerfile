FROM node:lts-slim
RUN mkdir -p /opt/node-app/ && touch /opt/node-app/package.json && touch /opt/node-app/server.js
WORKDIR /opt/node-app
EXPOSE 3000
CMD ["npm", "run", "dev"]