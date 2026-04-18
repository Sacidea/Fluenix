import { PrismaClient } from '@prisma/client'

const DATABASE_URL = "postgresql://postgres.acodoencywnjbduxptzm:2131282.Supa@aws-1-eu-west-1.pooler.supabase.com:6543/postgres"

const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
})

export default prisma