# Bürgerbüro uses Node and React
# node:alpine is a slim Node installed linux vm
FROM node:alpine

# Create an application directories
RUN mkdir -p /app/frontend
RUN mkdir -p /app/backend

# changes working directory to /app/frontend
WORKDIR /app/frontend

# Copy the frontend package and package-lock.json file
COPY frontend/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY frontend/ .

# Build the app
RUN npm run build

# changes working directory to /app/backend
WORKDIR /app/backend

# Copy the backend package and package-lock.json file
COPY backend/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY backend/ .

# starts server
CMD ["npm", "run", "start"]
