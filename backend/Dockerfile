# Use official Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install only prod dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Expose the port your backend listens on
EXPOSE 8000

# Start the backend
CMD ["node", "app.js"]

