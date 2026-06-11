import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const scenarios = [
  // ==========================================
  // B1 - INTERMEDIATE LEVEL
  // ==========================================
  {
    title: 'Morning Standup: Auth Blocker',
    context: 'A daily standup meeting between a Junior Developer (Alex, Indian accent) and a Tech Lead (Sam, British accent).',
    level: 'B1',
    dialogue: [
      { speaker: 'Sam', accent: 'british', text: "Alright team, let's get started. Alex, what's your status?" },
      { 
        speaker: 'Alex', accent: 'indian',
        text: "Yesterday I picked up the OAuth integration ticket. I'm currently blocked because the staging environment is down. I spent a few hours yak shaving trying to fix the local Docker container instead.",
        idiomHighlight: { word: 'yak shaving', meaning: 'Doing a series of small, seemingly unrelated tasks to solve a larger problem (usually a waste of time).' }
      },
      { 
        speaker: 'Sam', accent: 'british',
        text: "Got it. Let's punt the Docker issue to the DevOps channel. For now, just mock the auth response locally so you can keep building the UI.",
        idiomHighlight: { word: 'punt', meaning: 'To postpone or pass a task to someone else.' }
      },
      { speaker: 'Alex', accent: 'indian', text: "Makes sense. I'll do that and hopefully open a PR by EOD." }
    ],
    questions: [
      {
        id: 'q1',
        text: "What does Alex mean by 'yak shaving' in this context?",
        options: [
          { id: 'o1', text: 'Shaving a literal animal as a team-building exercise.', isCorrect: false, explanation: 'Yak shaving is a software idiom, not a literal activity.' },
          { id: 'o2', text: 'Getting distracted by endless minor setup tasks instead of doing the actual work.', isCorrect: true, explanation: 'Correct! Yak shaving means getting sidetracked by a chain of dependencies (like fixing Docker just to test OAuth).' },
          { id: 'o3', text: 'Writing very clean, optimized code.', isCorrect: false, explanation: 'That would be "refactoring" or "optimizing", not yak shaving.' }
        ]
      },
      {
        id: 'q2',
        text: "What is Sam's solution to Alex's blocker?",
        options: [
          { id: 'o1', text: 'Wait for the DevOps team to fix the staging environment.', isCorrect: false, explanation: 'Sam specifically tells Alex to mock the response locally so they don\'t have to wait.' },
          { id: 'o2', text: 'Fix the Docker container immediately.', isCorrect: false, explanation: 'Sam tells Alex to "punt" (pass) the Docker issue to DevOps, not fix it themselves.' },
          { id: 'o3', text: 'Simulate the authentication response locally to continue UI development.', isCorrect: true, explanation: 'Correct! "Mock the auth response" means simulating it locally to unblock the UI work.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 1,
      textWithBlanks: "Yesterday I picked up the OAuth integration ticket. I'm currently blocked because the ____ environment is down. I spent a few hours ____ ____ trying to fix the local ____ container instead.",
      answers: ["staging", "yak", "shaving", "Docker"]
    },
    shadowing: {
      lineIndex: 2,
      targetText: "Got it. Let's punt the Docker issue to the DevOps channel. For now, just mock the auth response locally so you can keep building the UI."
    }
  },
  {
    title: 'Sprint Planning: Estimations',
    context: 'A PM and a Developer discussing ticket estimates.',
    level: 'B1',
    dialogue: [
      { speaker: 'PM', text: "Next up is the new dashboard export feature. Can you give me a ballpark figure on how long this will take?" ,
        idiomHighlight: { word: 'ballpark figure', meaning: 'A rough or approximate estimate.' }
      },
      { speaker: 'Dev', text: "Well, the backend API is already in the pipeline. I just need to build the React component." ,
        idiomHighlight: { word: 'in the pipeline', meaning: 'Currently being planned, developed, or processed.' }
      },
      { speaker: 'Dev', text: "I'd say it's about 3 story points. I can finish it by Wednesday." },
      { speaker: 'PM', text: "Perfect. Let's assign it to you for this sprint." }
    ],
    questions: [
      {
        id: 'q1',
        text: "What does the PM want when asking for a 'ballpark figure'?",
        options: [
          { id: 'o1', text: 'An exact deadline with hours and minutes.', isCorrect: false, explanation: 'A ballpark figure is an estimate, not exact.' },
          { id: 'o2', text: 'A rough estimate of the effort or time required.', isCorrect: true, explanation: 'Correct! Ballpark figure means a rough guess.' },
          { id: 'o3', text: 'A chart showing the team\'s velocity.', isCorrect: false, explanation: 'That would be a burndown or velocity chart.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 1,
      textWithBlanks: "Well, the backend API is already ____ the ____. I just need to build the ____ component.",
      answers: ["in", "pipeline", "React"]
    },
    shadowing: {
      lineIndex: 0,
      targetText: "Next up is the new dashboard export feature. Can you give me a ballpark figure on how long this will take?"
    }
  },
  {
    title: 'Pair Programming: Merge Conflict',
    context: 'Two engineers fixing a Git merge conflict together.',
    level: 'B1',
    dialogue: [
      { speaker: 'Eng 1', text: "I tried to pull your branch, but I got a huge merge conflict in the utils file." },
      { speaker: 'Eng 2', text: "Ah, sorry about that. I completely rewrote the validation logic. I didn't mean to step on your toes.",
        idiomHighlight: { word: 'step on your toes', meaning: 'To upset someone by doing something they feel is their responsibility or interfering with their work.' }
      },
      { speaker: 'Eng 1', text: "No worries. Let's just hop on a call and resolve it together before we push to prod.",
        idiomHighlight: { word: 'push to prod', meaning: 'To deploy code to the production environment where real users are.' }
      }
    ],
    questions: [
      {
        id: 'q1',
        text: "Why did Eng 2 say 'I didn't mean to step on your toes'?",
        options: [
          { id: 'o1', text: 'Because they literally stepped on their colleague\'s foot.', isCorrect: false, explanation: 'It is a metaphorical idiom.' },
          { id: 'o2', text: 'Because they accidentally deleted the database.', isCorrect: false, explanation: 'They rewrote logic, not deleted the DB.' },
          { id: 'o3', text: 'Because they interfered with the same file Eng 1 was working on.', isCorrect: true, explanation: 'Correct! Stepping on someone\'s toes in software means editing their files or interfering with their domain.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 0,
      textWithBlanks: "I tried to ____ your branch, but I got a huge merge ____ in the utils file.",
      answers: ["pull", "conflict"]
    },
    shadowing: {
      lineIndex: 2,
      targetText: "No worries. Let's just hop on a call and resolve it together before we push to prod."
    }
  },

  // ==========================================
  // B2 - UPPER INTERMEDIATE LEVEL
  // ==========================================
  {
    title: 'Code Review: Bikeshedding',
    context: 'Two engineers discussing a Pull Request on Slack — one Australian, one American.',
    level: 'B2',
    dialogue: [
      { speaker: 'Dev A', accent: 'australian', text: "Hey, I left a few comments on your PR for the new payment gateway." },
      { speaker: 'Dev B', accent: 'american', text: "Thanks. I saw the comment about renaming the 'txn_id' variable to 'transactionId'. Isn't that just bikeshedding? The logic works perfectly fine." ,
        idiomHighlight: { word: 'bikeshedding', meaning: 'Arguing over trivial details (like what color to paint a bike shed) while ignoring the core, important architecture.' }
      },
      { speaker: 'Dev A', accent: 'australian', text: "Normally I'd agree, but our new linting rules are super strict. Let's just bite the bullet and fix it now before it becomes tech debt.",
        idiomHighlight: { word: 'bite the bullet', meaning: 'To force yourself to do something difficult or unpleasant that you have been avoiding.' }
      },
      { speaker: 'Dev B', accent: 'american', text: "Fair enough. LGTM otherwise?" },
      { speaker: 'Dev A', accent: 'australian', text: "Yeah, LGTM. Ping me when you push the rename and I'll approve." }
    ],
    questions: [
      {
        id: 'q1',
        text: "Why is Dev B annoyed by the variable renaming request?",
        options: [
          { id: 'o1', text: 'Because they think it\'s a trivial detail that doesn\'t affect the core logic.', isCorrect: true, explanation: 'Correct. Dev B calls it "bikeshedding", implying it\'s a waste of time debating minor naming conventions when the code works.' },
          { id: 'o2', text: 'Because the new name breaks the payment gateway API.', isCorrect: false, explanation: 'There is no mention of the code breaking. In fact, Dev B says "The logic works perfectly fine."' },
          { id: 'o3', text: 'Because they don\'t know how to rename variables in their IDE.', isCorrect: false, explanation: 'This is highly unlikely for a software engineer.' }
        ]
      },
      {
        id: 'q2',
        text: "What does 'LGTM' stand for at the end of the conversation?",
        options: [
          { id: 'o1', text: 'Let\'s Go Team Meeting', isCorrect: false, explanation: 'LGTM is an approval acronym in code reviews.' },
          { id: 'o2', text: 'Looks Good To Me', isCorrect: true, explanation: 'Correct! "Looks Good To Me" is the standard way engineers say a Pull Request is approved.' },
          { id: 'o3', text: 'Logic Goes Through Master', isCorrect: false, explanation: 'This is a made-up phrase.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 1,
      textWithBlanks: "Thanks. I saw the comment about renaming the 'txn_id' variable to 'transactionId'. Isn't that just ____? The ____ works perfectly fine.",
      answers: ["bikeshedding", "logic"]
    },
    shadowing: {
      lineIndex: 2,
      targetText: "Normally I'd agree, but our new linting rules are super strict. Let's just bite the bullet and fix it now before it becomes tech debt."
    }
  },
  {
    title: 'Architecture Review: Legacy Code',
    context: 'A Senior Engineer explaining why a system needs a rewrite.',
    level: 'B2',
    dialogue: [
      { speaker: 'Senior', text: "The current billing module is complete spaghetti code. There are no unit tests and it relies on global variables.",
        idiomHighlight: { word: 'spaghetti code', meaning: 'Code that is tangled, unstructured, and difficult to maintain or read.' }
      },
      { speaker: 'Manager', text: "I know it's bad, but we have a tight deadline for Q3. Can we just patch the bug for now?" },
      { speaker: 'Senior', text: "If we keep kicking the can down the road, this system will collapse during Black Friday traffic. We have to refactor it.",
        idiomHighlight: { word: 'kicking the can down the road', meaning: 'Postponing a difficult decision or problem instead of dealing with it now.' }
      }
    ],
    questions: [
      {
        id: 'q1',
        text: "What is 'spaghetti code'?",
        options: [
          { id: 'o1', text: 'Code written in Italy.', isCorrect: false, explanation: 'Spaghetti code has nothing to do with geography.' },
          { id: 'o2', text: 'Code that is heavily tested and clean.', isCorrect: false, explanation: 'That is the opposite of spaghetti code.' },
          { id: 'o3', text: 'Messy, tangled, and hard-to-maintain code.', isCorrect: true, explanation: 'Correct! Spaghetti code refers to tangled control flows that are hard to follow.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 2,
      textWithBlanks: "If we keep ____ the can down the ____, this system will collapse during Black Friday traffic. We have to ____ it.",
      answers: ["kicking", "road", "refactor"]
    },
    shadowing: {
      lineIndex: 0,
      targetText: "The current billing module is complete spaghetti code. There are no unit tests and it relies on global variables."
    }
  },
  {
    title: 'Feature Planning: The Low-Hanging Fruit',
    context: 'Team deciding on what features to build next.',
    level: 'B2',
    dialogue: [
      { speaker: 'Lead', text: "We need to improve user retention. What features can we ship this week?" },
      { speaker: 'Dev', text: "Adding dark mode is definitely low-hanging fruit. The CSS variables are already set up.",
        idiomHighlight: { word: 'low-hanging fruit', meaning: 'The most easily achieved of a set of tasks, or easily solved problems.' }
      },
      { speaker: 'Lead', text: "Great idea. But let's not reinvent the wheel with a custom toggle switch. Just use the one from our UI library.",
        idiomHighlight: { word: 'reinvent the wheel', meaning: 'To waste time creating something that has already been created by someone else.' }
      }
    ],
    questions: [
      {
        id: 'q1',
        text: "Why does the Lead say 'let's not reinvent the wheel'?",
        options: [
          { id: 'o1', text: 'To encourage using an existing UI library instead of building from scratch.', isCorrect: true, explanation: 'Correct! Reinventing the wheel means wasting time building something that already exists.' },
          { id: 'o2', text: 'To warn the team about using circular buttons.', isCorrect: false, explanation: 'It is a metaphor, not about literal wheels.' },
          { id: 'o3', text: 'To cancel the dark mode feature entirely.', isCorrect: false, explanation: 'The Lead agrees with the feature but wants to use existing components.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 1,
      textWithBlanks: "Adding dark mode is definitely ____ ____ fruit. The CSS variables are already set up.",
      answers: ["low-hanging", "fruit"]
    },
    shadowing: {
      lineIndex: 2,
      targetText: "Great idea. But let's not reinvent the wheel with a custom toggle switch. Just use the one from our UI library."
    }
  },

  // ==========================================
  // C1 - ADVANCED LEVEL
  // ==========================================
  {
    title: 'Incident Call: Nuke it',
    context: 'A high-stress incident response call during a database outage — between a Nigerian DevOps engineer and a German backend developer.',
    level: 'C1',
    dialogue: [
      { speaker: 'Ops', accent: 'nigerian', text: "The primary DB CPU is pegged at 100%. Queries are timing out across the board." },
      { speaker: 'Backend', accent: 'german', text: "It's that rogue migration script we deployed. It's locking the users table." },
      { speaker: 'Ops', accent: 'nigerian', text: "Can we rollback the deployment?" },
      { speaker: 'Backend', accent: 'german', text: "No, the schema already mutated. We need to just nuke the blocked queries from the pg_stat_activity view and scale up the read replicas immediately.",
        idiomHighlight: { word: 'nuke', meaning: 'To forcefully delete or terminate something (like killing a process or dropping a table).' }
      },
      { speaker: 'Ops', accent: 'nigerian', text: "Copy that. Nuking the queries now. Let's touch base in 5 minutes to see if latency drops." }
    ],
    questions: [
      {
        id: 'q1',
        text: "What does the Backend engineer mean by 'nuke the blocked queries'?",
        options: [
          { id: 'o1', text: 'To encrypt the queries for security purposes.', isCorrect: false, explanation: 'Nuking means destroying, not encrypting.' },
          { id: 'o2', text: 'To forcefully terminate or kill the stuck database queries.', isCorrect: true, explanation: 'Correct! "Nuking" in software means aggressively stopping, killing, or deleting something.' },
          { id: 'o3', text: 'To send the queries to an external backup server.', isCorrect: false, explanation: 'This would be called "backing up" or "migrating", not nuking.' }
        ]
      },
      {
        id: 'q2',
        text: "Why can't they simply rollback the deployment to fix the issue?",
        options: [
          { id: 'o1', text: 'Because Ops doesn\'t have the administrative permissions.', isCorrect: false, explanation: 'Permissions are not mentioned as the blocker.' },
          { id: 'o2', text: 'Because the database schema has already been permanently altered (mutated).', isCorrect: true, explanation: 'Correct! The backend engineer states "the schema already mutated", meaning rolling back the code won\'t revert the database structure.' },
          { id: 'o3', text: 'Because the read replicas are already scaled up.', isCorrect: false, explanation: 'Scaling up the read replicas is proposed as the *solution* after nuking the queries, not the reason they can\'t rollback.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 3,
      textWithBlanks: "No, the ____ already mutated. We need to just ____ the blocked queries from the pg_stat_activity view and scale up the read ____ immediately.",
      answers: ["schema", "nuke", "replicas"]
    },
    shadowing: {
      lineIndex: 0,
      targetText: "The primary DB CPU is pegged at 100%. Queries are timing out across the board."
    }
  },
  {
    title: 'System Design: Scaling Bottlenecks',
    context: 'A Japanese architect and a Brazilian staff engineer discussing microservices architecture.',
    level: 'C1',
    dialogue: [
      { speaker: 'Architect', accent: 'japanese', text: "If we route all image processing through the main API gateway, it's going to become a massive bottleneck.",
        idiomHighlight: { word: 'bottleneck', meaning: 'A point of congestion in a system that slows down the overall performance.' }
      },
      { speaker: 'Staff Eng', accent: 'brazilian', text: "Agreed. It's also a single point of failure. If the gateway goes down, the entire application crashes.",
        idiomHighlight: { word: 'single point of failure', meaning: 'A part of a system that, if it fails, will stop the entire system from working.' }
      },
      { speaker: 'Architect', accent: 'japanese', text: "Exactly. We should decouple the image service and use a pub/sub queue like Kafka to handle the load asynchronously." }
    ],
    questions: [
      {
        id: 'q1',
        text: "What is a 'single point of failure' (SPOF)?",
        options: [
          { id: 'o1', text: 'A component whose failure brings down the entire system.', isCorrect: true, explanation: 'Correct! SPOF means there is no redundancy; if that one piece breaks, everything breaks.' },
          { id: 'o2', text: 'A single bug in the code that causes a test to fail.', isCorrect: false, explanation: 'That is just a bug, not a SPOF.' },
          { id: 'o3', text: 'A server that only has one CPU core.', isCorrect: false, explanation: 'This is not the definition of SPOF.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 2,
      textWithBlanks: "Exactly. We should ____ the image service and use a pub/sub ____ like Kafka to handle the load ____.",
      answers: ["decouple", "queue", "asynchronously"]
    },
    shadowing: {
      lineIndex: 1,
      targetText: "Agreed. It's also a single point of failure. If the gateway goes down, the entire application crashes."
    }
  },
  {
    title: 'Post-Mortem: Memory Leak',
    context: 'Debugging a mysterious production crash.',
    level: 'C1',
    dialogue: [
      { speaker: 'Dev', text: "The Node.js pods keep getting OOMKilled every 4 hours. The memory usage just slowly creeps up." },
      { speaker: 'Lead', text: "Sounds like a classic memory leak. Have you taken a heap snapshot to look under the hood?",
        idiomHighlight: { word: 'under the hood', meaning: 'Looking into the underlying implementation or internal workings of a system.' }
      },
      { speaker: 'Dev', text: "Yeah, but the snapshot is 2 Gigabytes. Finding the exact uncollected array is like looking for a needle in a haystack.",
        idiomHighlight: { word: 'needle in a haystack', meaning: 'Searching for something very small or hidden in a massive amount of data.' }
      },
      { speaker: 'Lead', text: "Let's filter the snapshot by detached DOM nodes. That's usually the root cause in our SSR setup." }
    ],
    questions: [
      {
        id: 'q1',
        text: "What does 'OOMKilled' mean in this context?",
        options: [
          { id: 'o1', text: 'Out Of Memory Killed: The server crashed because it ran out of RAM.', isCorrect: true, explanation: 'Correct! OOM stands for Out Of Memory, a common issue with memory leaks.' },
          { id: 'o2', text: 'Object Oriented Module Killed.', isCorrect: false, explanation: 'OOM stands for Out Of Memory.' },
          { id: 'o3', text: 'The user manually killed the process.', isCorrect: false, explanation: 'OOMKilled is usually triggered automatically by the OS or orchestrator (like Kubernetes) when memory limits are exceeded.' }
        ]
      }
    ],
    dictation: {
      lineIndex: 2,
      textWithBlanks: "Yeah, but the ____ is 2 Gigabytes. Finding the exact uncollected array is like looking for a ____ in a ____.",
      answers: ["snapshot", "needle", "haystack"]
    },
    shadowing: {
      lineIndex: 1,
      targetText: "Sounds like a classic memory leak. Have you taken a heap snapshot to look under the hood?"
    }
  }
]

async function seed() {
  console.log('Clearing existing scenarios...')
  await prisma.listeningScenario.deleteMany()

  console.log('Inserting ' + scenarios.length + ' new scenarios...')
  for (const s of scenarios) {
    await prisma.listeningScenario.create({
      data: s
    })
  }
  
  console.log('Seeding complete! Added ' + scenarios.length + ' scenarios.')
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
