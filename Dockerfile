# Bürgerbüro uses Node and React
# node:alpine is a slim Node installed linux vm
FROM node:alpine
# changes working directory to /app
WORKDIR /app
# copies package.json and package-lock.json to working directory
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# runs npm install
RUN npm i
# starts server
CMD ["npm", "run", "start"]
