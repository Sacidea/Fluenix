import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function test() {
  try {
    const p = await prisma.pronunciationWord.findMany()
    console.log("Success! Found:", p.length)
  } catch (err) {
    console.error("PRISMA ERROR:", err)
  } finally {
    await prisma.$disconnect()
  }
}
test()
