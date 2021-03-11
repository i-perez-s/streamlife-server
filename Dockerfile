FROM node
WORKDIR /app
COPY  package*json ./
RUN npm install
RUN npm run tsc
COPY /dist .
CMD [ "npm", "start" ]