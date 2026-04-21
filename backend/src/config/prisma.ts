import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true })

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL!,
})

export default prisma