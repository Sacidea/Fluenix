const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const s = await prisma.listeningScenario.findMany({ select: { title: true }});
  console.log(s);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
