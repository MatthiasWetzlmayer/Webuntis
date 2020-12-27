FROM node:12.16.0
COPY . .
RUN npm install
CMD node index.js
EXPOSE 8080