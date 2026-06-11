export interface DialogueLine {
  speaker: string
  gender?: string
  text: string
  translation?: string
  // Optional hint for idioms or jargon used in this line
  idiomHighlight?: { word: string; meaning: string }
}

export interface ListeningScenario {
  id: string
  title: string
  context: string
  difficulty: 'Intermediate' | 'Advanced' | 'Expert'
  dialogue: DialogueLine[]
  questions: {
    id: string
    text: string
    options: {
      id: string
      text: string
      isCorrect: boolean
      explanation: string
    }[]
  }[]
  dictation: {
    lineIndex: number
    textWithBlanks: string // e.g. "I spent a few hours ____ ____ trying to fix the ____ container."
    answers: string[] // e.g. ["yak", "shaving", "Docker"]
  }
  shadowing: {
    lineIndex: number
    targetText: string // The exact text they need to pronounce
  }
}

export const mockListeningScenarios: ListeningScenario[] = [
  {
    id: 'list_1',
    title: 'Morning Standup: Auth Blocker',
    context: 'A daily standup meeting between a Junior Developer (Alex) and a Tech Lead (Sam).',
    difficulty: 'Intermediate',
    dialogue: [
      { speaker: 'Sam', text: "Alright team, let's get started. Alex, what's your status?" },
      { 
        speaker: 'Alex', 
        text: "Yesterday I picked up the OAuth integration ticket. I'm currently blocked because the staging environment is down. I spent a few hours yak shaving trying to fix the local Docker container instead.",
        idiomHighlight: { word: 'yak shaving', meaning: 'Doing a series of small, seemingly unrelated tasks to solve a larger problem (usually a waste of time).' }
      },
      { 
        speaker: 'Sam', 
        text: "Got it. Let's punt the Docker issue to the DevOps channel. For now, just mock the auth response locally so you can keep building the UI.",
        idiomHighlight: { word: 'punt', meaning: 'To postpone or pass a task to someone else.' }
      },
      { speaker: 'Alex', text: "Makes sense. I'll do that and hopefully open a PR by EOD." }
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
    id: 'list_2',
    title: 'Code Review: Bikeshedding',
    context: 'Two engineers discussing a Pull Request on Slack.',
    difficulty: 'Advanced',
    dialogue: [
      { speaker: 'Dev A', text: "Hey, I left a few comments on your PR for the new payment gateway." },
      { speaker: 'Dev B', text: "Thanks. I saw the comment about renaming the 'txn_id' variable to 'transactionId'. Isn't that just bikeshedding? The logic works perfectly fine." ,
        idiomHighlight: { word: 'bikeshedding', meaning: 'Arguing over trivial details (like what color to paint a bike shed) while ignoring the core, important architecture.' }
      },
      { speaker: 'Dev A', text: "Normally I'd agree, but our new linting rules are super strict. Let's just bite the bullet and fix it now before it becomes tech debt.",
        idiomHighlight: { word: 'bite the bullet', meaning: 'To force yourself to do something difficult or unpleasant that you have been avoiding.' }
      },
      { speaker: 'Dev B', text: "Fair enough. LGTM otherwise?" },
      { speaker: 'Dev A', text: "Yeah, LGTM. Ping me when you push the rename and I'll approve." }
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
    id: 'list_3',
    title: 'Incident Call: Nuke it',
    context: 'A high-stress incident response call during a database outage.',
    difficulty: 'Expert',
    dialogue: [
      { speaker: 'Ops', text: "The primary DB CPU is pegged at 100%. Queries are timing out across the board." },
      { speaker: 'Backend', text: "It's that rogue migration script we deployed. It's locking the users table." },
      { speaker: 'Ops', text: "Can we rollback the deployment?" },
      { speaker: 'Backend', text: "No, the schema already mutated. We need to just nuke the blocked queries from the pg_stat_activity view and scale up the read replicas immediately.",
        idiomHighlight: { word: 'nuke', meaning: 'To forcefully delete or terminate something (like killing a process or dropping a table).' }
      },
      { speaker: 'Ops', text: "Copy that. Nuking the queries now. Let's touch base in 5 minutes to see if latency drops." }
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
  }
]
