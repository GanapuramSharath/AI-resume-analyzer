# ==========================
# Base Image
# ==========================
FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# ==========================
# Install dependencies
# ==========================
COPY package*.json ./

RUN npm install

# ==========================
# Copy source
# ==========================
COPY . .

# ==========================
# Prisma
# ==========================
RUN npx prisma generate

# ==========================
# Build Next.js
# ==========================
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]