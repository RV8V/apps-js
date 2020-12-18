FROM node
COPY . /src
WORKDIR /src
RUN npm install --production
EXPOSE 3000
CMD node server.js
