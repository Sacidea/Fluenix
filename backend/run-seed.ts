import { PrismaClient } from '@prisma/client'
import { DEFAULT_PRONUNCIATION_WORDS } from './src/seeders/pronunciation.seeder'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding pronunciation words...')
  for (const word of DEFAULT_PRONUNCIATION_WORDS) {
    await prisma.pronunciationWord.upsert({
      where: { word: word.word },
      update: { category: word.category, phonetic: word.phonetic },
      create: word,
    })
  }
  console.log('Successfully seeded ' + DEFAULT_PRONUNCIATION_WORDS.length + ' words.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
