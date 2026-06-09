FROM node:20-alpine AS base

# Install pnpm and native build tools
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache python3 make g++ linux-headers openssl && corepack enable

FROM base AS builder
# Set working directory
WORKDIR /app

# Copy the whole monorepo to handle workspace dependencies
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY patches ./patches
COPY packages ./packages
COPY apps ./apps
COPY backend ./backend

# Install dependencies only for backend and its local packages
RUN pnpm install --frozen-lockfile --filter backend... --config.ignore-scripts=false

# Generate Prisma client and build the backend
WORKDIR /app/backend
RUN pnpm prisma generate
RUN pnpm build

# ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/package.json ./backend/
COPY --from=builder /app/backend/prisma ./backend/prisma

WORKDIR /app/backend
EXPOSE 3001

# Default command
CMD ["pnpm", "start"]
