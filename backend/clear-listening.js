const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deletedSeen = await prisma.userSeenListening.deleteMany({});
  console.log(`Deleted ${deletedSeen.count} user seen records.`);

  const deletedScenarios = await prisma.listeningScenario.deleteMany({});
  console.log(`Deleted ${deletedScenarios.count} listening scenarios.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
