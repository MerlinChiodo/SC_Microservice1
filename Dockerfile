# Bürgerbüro uses Node and React
# node:alpine is a slim Node installed linux vm
FROM node:alpine


RUN mkdir -p /var/www/frontend

ADD frontend /var/www/frontend

# changes working directory to /app
WORKDIR /var/www/frontend
# copies package.json and package-lock.json to working directory
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# runs npm install
RUN npm i
# starts server
CMD ["npm", "run", "start"]
