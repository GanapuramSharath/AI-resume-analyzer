# -------------------------
# Base
# -------------------------
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# -------------------------
# Dependencies
# -------------------------
FROM base AS deps

COPY package*.json ./

RUN npm ci

# -------------------------
# Builder
# -------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build

# -------------------------
# Runner
# -------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs
RUN adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node","server.js"]