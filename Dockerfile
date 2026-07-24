# ==========================
# Base Image
# ==========================
FROM node:22-alpine

# ==========================
# Install OpenSSL
# Prisma requires OpenSSL
# ==========================
RUN apk add --no-cache openssl

# ==========================
# Working Directory
# ==========================
WORKDIR /app

# ==========================
# Copy package files
# ==========================
COPY package*.json ./

# ==========================
# Install dependencies
# ==========================
RUN npm install

# ==========================
# Copy project
# ==========================
COPY . .

# ==========================
# Generate Prisma Client
# ==========================
RUN npx prisma generate

# ==========================
# Next.js Port
# ==========================
EXPOSE 3000

# ==========================
# Start Application
# ==========================
CMD ["npm","run","dev"]