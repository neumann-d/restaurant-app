#!/bin/sh

# build frontend app
cd /usr/src/app
npm install
npm run build

# launch Node.js server to serve index.html of build/ folder
cd docker
npm install
npm start
