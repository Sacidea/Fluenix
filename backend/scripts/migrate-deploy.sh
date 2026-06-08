#!/bin/bash
# ========================================
# PRODUCTION PRISMA MIGRATION SCRIPT
# ========================================
# WARNING: NEVER run `prisma db push` or `prisma migrate dev` in production.
# This script ensures we safely apply migrations and generate the client.

echo "🚀 Starting Production Database Migration..."

# 1. Apply migrations safely (this doesn't reset the DB like `dev` or `push` might)
echo "📦 Applying pending migrations..."
npx prisma migrate deploy

# 2. Generate Prisma Client
echo "⚙️ Generating Prisma Client..."
npx prisma generate

echo "✅ Database is ready for production."
