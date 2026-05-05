import { PrismaClient } from '@prisma/client'
import { a2_exercises } from './data/grammar_a2'
import { b1_exercises } from './data/grammar_b1'
import { b2_exercises } from './data/grammar_b2'
import { c1_exercises } from './data/grammar_c1'
import { c2_exercises } from './data/grammar_c2'
import { handbook_rules } from './data/handbook_rules'
import { handbook_extra_tenses } from './data/handbook_extra_tenses'
import { handbook_extra_grammar } from './data/handbook_extra_grammar'

const prisma = new PrismaClient()

async function seed() {
  console.log('Clearing existing grammar exercises...')
  await prisma.grammarExercise.deleteMany()

  console.log('Clearing existing handbook rules...')
  await prisma.grammarRule.deleteMany()

  const allExercises = [
    ...a2_exercises,
    ...b1_exercises,
    ...b2_exercises,
    ...c1_exercises,
    ...c2_exercises
  ]

  console.log('Inserting ' + allExercises.length + ' new exercises...')
  for (const ex of allExercises) {
    await prisma.grammarExercise.create({
      data: ex
    })
  }

  console.log('Inserting handbook rules...')
  const allRules = [
    ...handbook_rules,
    ...handbook_extra_tenses,
    ...handbook_extra_grammar
  ]
  console.log('Inserting ' + allRules.length + ' new handbook rules...')
  for (const rule of allRules) {
    await prisma.grammarRule.create({
      data: rule
    })
  }
  
  console.log('Seeding complete! Added ' + allExercises.length + ' exercises and ' + allRules.length + ' rules.')
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
