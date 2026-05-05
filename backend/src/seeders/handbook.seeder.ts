import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const rules = [
  // --- Tenses ---
  {
    category: 'Tenses',
    title: 'Present Perfect vs. Past Simple',
    explanation: 'Use Past Simple for completed actions at a specific time in the past (e.g., yesterday, in 2021). Use Present Perfect for actions that happened at an unspecified time before now, or actions that started in the past and continue to the present.',
    correctExample: 'I deployed the app yesterday. (Past Simple)\nI have already deployed the app. (Present Perfect)',
    wrongExample: 'I have deployed the app yesterday.',
    level: 'B1'
  },
  {
    category: 'Tenses',
    title: 'Present Continuous for Future Plans',
    explanation: 'Use the Present Continuous (am/is/are + V-ing) to talk about fixed arrangements and plans in the near future.',
    correctExample: 'I am meeting the client tomorrow at 10 AM.',
    wrongExample: 'I will meet the client tomorrow at 10 AM. (Grammatically okay, but less natural for fixed plans)',
    level: 'B1'
  },
  {
    category: 'Tenses',
    title: 'Present Perfect Continuous',
    explanation: 'Use Present Perfect Continuous (have/has been + V-ing) to show that an action started in the past and has continued up to the present moment.',
    correctExample: 'I have been debugging this issue for three hours.',
    wrongExample: 'I am debugging this issue for three hours.',
    level: 'B2'
  },
  
  // --- Prepositions ---
  {
    category: 'Prepositions',
    title: 'Depend On vs. Depend Of',
    explanation: 'The verb "depend" is always followed by the preposition "on". Never use "of" or "from".',
    correctExample: 'The release date depends on the QA testing.',
    wrongExample: 'The release date depends of the QA testing.',
    level: 'B1'
  },
  {
    category: 'Prepositions',
    title: 'Responsible For',
    explanation: 'The adjective "responsible" is always followed by "for" + a noun or gerund (V-ing).',
    correctExample: 'I am responsible for maintaining the database.',
    wrongExample: 'I am responsible to maintain the database.',
    level: 'B1'
  },
  {
    category: 'Prepositions',
    title: 'Congratulations On',
    explanation: 'Use "congratulations on" followed by a noun or gerund to congratulate someone for an achievement.',
    correctExample: 'Congratulations on launching the new feature!',
    wrongExample: 'Congratulations for launching the new feature.',
    level: 'B2'
  },

  // --- Modals & Politeness ---
  {
    category: 'Politeness & Modals',
    title: 'Could you vs. Can you',
    explanation: '"Could you" is a more polite and formal way to ask for something in a professional environment compared to "Can you".',
    correctExample: 'Could you please review my pull request?',
    wrongExample: 'Can you review my pull request? (A bit too direct for clients/managers)',
    level: 'B1'
  },
  {
    category: 'Politeness & Modals',
    title: 'Suggesting / Recommending',
    explanation: 'The verbs "suggest" and "recommend" are followed by a gerund (V-ing) or a "that" clause. They are NOT followed by the infinitive ("to do").',
    correctExample: 'I recommend using a different library. OR I recommend that we use...',
    wrongExample: 'I recommend to use a different library.',
    level: 'B2'
  },
  {
    category: 'Politeness & Modals',
    title: 'Modal Verbs + Base Verb',
    explanation: 'Modal verbs (can, could, should, must, might, will) are always followed directly by the base form of the verb, without "to".',
    correctExample: 'We should refactor this code.',
    wrongExample: 'We should to refactor this code.',
    level: 'B1'
  },

  // --- Uncountable Nouns ---
  {
    category: 'Uncountable Nouns',
    title: 'Software & Hardware',
    explanation: '"Software" and "Hardware" are uncountable nouns. You cannot add an "s" to make them plural. Use "pieces of software" or "applications" instead.',
    correctExample: 'We need to install this software.',
    wrongExample: 'We need to install these softwares.',
    level: 'B1'
  },
  {
    category: 'Uncountable Nouns',
    title: 'Advice & Feedback',
    explanation: '"Advice" and "Feedback" are uncountable. Do not use them with "a/an" or make them plural. Use "some advice" or "a piece of advice".',
    correctExample: 'Thank you for your feedback.',
    wrongExample: 'Thank you for your feedbacks.',
    level: 'B2'
  },
  {
    category: 'Uncountable Nouns',
    title: 'Research & Evidence',
    explanation: '"Research" and "Evidence" are uncountable. To talk about plural concepts, use "studies" or "pieces of research".',
    correctExample: 'I did some research on this bug.',
    wrongExample: 'I did a research / I did many researches on this bug.',
    level: 'B2'
  },

  // --- Conditionals ---
  {
    category: 'Conditionals',
    title: 'First Conditional (Real Future)',
    explanation: 'Use If + Present Simple, ... will + base verb. This describes a realistic future possibility.',
    correctExample: 'If we deploy this now, the server will crash.',
    wrongExample: 'If we will deploy this now, the server will crash.',
    level: 'B2'
  },
  {
    category: 'Conditionals',
    title: 'Second Conditional (Hypothetical)',
    explanation: 'Use If + Past Simple, ... would + base verb. This describes an imaginary or unlikely situation in the present/future.',
    correctExample: 'If we had more time, we would rewrite the whole module.',
    wrongExample: 'If we have more time, we would rewrite the whole module.',
    level: 'B2'
  },
  {
    category: 'Conditionals',
    title: 'Third Conditional (Past Regrets)',
    explanation: 'Use If + Past Perfect, ... would have + past participle. This describes a hypothetical situation in the past that did not happen.',
    correctExample: 'If we had caught the bug earlier, we would not have lost data.',
    wrongExample: 'If we caught the bug earlier, we would not lose data.',
    level: 'C1'
  },

  // --- Advanced Structures (C1) ---
  {
    category: 'Advanced Structures',
    title: 'Inversion for Emphasis',
    explanation: 'When starting a sentence with a negative or limiting adverb (Not only, Rarely, Seldom) for dramatic effect, invert the subject and the auxiliary verb (like in a question).',
    correctExample: 'Not only did the database crash, but the backups failed too.',
    wrongExample: 'Not only the database crashed, but the backups failed too.',
    level: 'C1'
  },
  {
    category: 'Advanced Structures',
    title: 'Subjunctive Mood',
    explanation: 'After verbs or adjectives expressing necessity (demand, insist, crucial, essential), use the base form of the verb for all subjects.',
    correctExample: 'It is crucial that the server be upgraded immediately.',
    wrongExample: 'It is crucial that the server is upgraded immediately.',
    level: 'C1'
  },
  {
    category: 'Advanced Structures',
    title: 'Looking Forward To',
    explanation: 'The phrase "look forward to" ends with a preposition ("to"), so it must be followed by a noun or a gerund (V-ing), not an infinitive.',
    correctExample: 'I look forward to hearing from you.',
    wrongExample: 'I look forward to hear from you.',
    level: 'B2'
  }
]

async function seed() {
  console.log('Clearing existing grammar rules...')
  await prisma.grammarRule.deleteMany()

  console.log('Inserting ' + rules.length + ' new grammar rules...')
  for (const rule of rules) {
    await prisma.grammarRule.create({
      data: rule
    })
  }
  
  console.log('Seeding complete! Added ' + rules.length + ' handbook rules.')
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
