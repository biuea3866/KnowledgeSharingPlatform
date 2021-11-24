FROM node:16.13.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY pacakge.json /app/package.json

RUN npm install
RUN npm install react-scripts@3.0.1 -g

CMD ["npm", "start"]