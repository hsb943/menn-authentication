# Use Node.js base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy the app source
COPY . .

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app (output goes to .next/)
RUN npm run build

# -------------------
# Serve with Next.js
# -------------------
FROM node:20-alpine

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app ./

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose Next.js port
EXPOSE 3000

CMD ["npm", "start"]


