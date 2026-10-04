# -------------------------------------------------------------
# Stage 1: Build the entire monorepo with pnpm
# -------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm matching package.json (pnpm@10.26.1)
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

# Copy monorepo configuration files first for better caching
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY artifacts/dien-chan-adn/package.json ./artifacts/dien-chan-adn/
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY lib/db/package.json ./lib/db/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY scripts/package.json ./scripts/

# Install all dependencies using pnpm (supports catalog: protocol)
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build all workspace packages (Vite frontend and esbuild backend)
RUN pnpm -r --if-present run build

# -------------------------------------------------------------
# Stage 2: Production Runner
# -------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Enable pnpm for running DB migrations if needed
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

# Copy built application and node_modules from builder
COPY --from=builder /app /app

EXPOSE 3000

# Run schema sync (if database connection string is present) and start the server
CMD sh -c 'if [ -n "$DATABASE_URL" ] || [ -n "$POSTGRES_URL" ]; then echo "Syncing database schema..."; pnpm --filter @workspace/db run push || true; fi; node --enable-source-maps artifacts/api-server/dist/index.mjs'
