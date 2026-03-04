# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build the app with Vite
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static build
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]
