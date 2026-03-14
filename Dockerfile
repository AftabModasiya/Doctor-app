# ---------- BASE ----------
FROM node:24-alpine AS base
WORKDIR /app

RUN npm install -g turbo


# ---------- PRUNE ----------
FROM base AS pruner

COPY . .

RUN turbo prune --scope=doctor-api --scope=doctor-web --docker


# ---------- INSTALL ----------
FROM base AS installer

WORKDIR /app

COPY --from=pruner /app/out/json/ .

# ensure lockfile exists
COPY package-lock.json ./package-lock.json

# install ALL deps (needed for build)
RUN npm install


# ---------- BUILD ----------
FROM base AS builder

WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .

RUN npx turbo run build


# ---------- RUNNER ----------
FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "apps/server/dist/api/main.js"]
