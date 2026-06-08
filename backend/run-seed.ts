import { PrismaClient } from '@prisma/client'
import { DEFAULT_PRONUNCIATION_WORDS } from './src/seeders/pronunciation.seeder'
import { DEFAULT_VOCABULARY_WORDS } from './src/seeders/vocabulary.seeder'
import { DEFAULT_SCENARIO_MISSIONS } from './src/seeders/scenario.seeder'

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
  console.log('Successfully seeded ' + DEFAULT_PRONUNCIATION_WORDS.length + ' pronunciation words.')

  console.log('Seeding vocabulary words...')
  for (const word of DEFAULT_VOCABULARY_WORDS) {
    await prisma.vocabWord.upsert({
      where: { word: word.word },
      update: { 
        difficulty: word.difficulty, 
        type: word.type, 
        definition: word.definition, 
        phonetic: word.phonetic, 
        turkishMeaning: word.turkishMeaning, 
        contextSentence: word.contextSentence 
      },
      create: word,
    })
  }
  console.log('Successfully seeded ' + DEFAULT_VOCABULARY_WORDS.length + ' vocabulary words.')

  console.log('Seeding scenario missions...')
  for (const mission of DEFAULT_SCENARIO_MISSIONS) {
    await prisma.roleplayMission.upsert({
      where: { id: `seed_${mission.content.substring(0, 20)}` },
      update: { level: mission.level, content: mission.content },
      create: { ...mission, id: `seed_${mission.content.substring(0, 20)}` },
    }).catch(() => {})
  }
  console.log('Successfully seeded ' + DEFAULT_SCENARIO_MISSIONS.length + ' scenario missions.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
