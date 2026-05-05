export interface VocabularyWord {
  word: string;
  meaning: string;
}

export interface FillInBlankExercise {
  sentenceParts: string[]; 
  missingWords: string[]; 
  wordBank: string[]; 
}

export interface ScenarioExercise {
  scenario: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  vocabulary: VocabularyWord[];
  fillInBlank: FillInBlankExercise;
  scenario: ScenarioExercise;
}

export const starReadingData: Record<string, ReadingPassage[]> = {
  A2: [
    {
      id: "intro",
      title: "1. The STAR Method Basics",
      content: `
# The STAR Method for Interviews

Amazon and other big tech companies use the **STAR method**. It helps you answer questions well. In a job interview, managers do not just want to hear "I am a good worker." They want to hear a real story. They want to know exactly what you did in a difficult situation. The STAR method gives you a map to tell your story.

## S is for Situation
First, you talk about the problem. Where were you working? What was happening? Keep it short. For example: "Last year, our main website stopped working during a big sale." This sets the scene so the interviewer understands the problem.

## T is for Task
Second, you talk about your job. What did you need to do to fix the problem? What was your goal? For example: "My job was to find the error in the database and bring the website back online."

## A is for Action
Third, you talk about the steps you took. This is the most important part of your story. You must say "I did this", not "We did this". If you say "we", the manager does not know what *you* did. Say: "I checked the server logs, I saw the memory error, and I restarted the database."

## R is for Result
Finally, what happened after your action? Did you fix the problem? Did you save time or money? Use numbers if you can. For example: "The website came back online in ten minutes. I saved the company a lot of money during the sale."
      `,
      vocabulary: [
        { word: "Situation", meaning: "The place or time when the problem happened." },
        { word: "Goal", meaning: "Something you want to do successfully in the future." }
      ],
      fillInBlank: {
        sentenceParts: ["I ", " the server logs, I ", " the memory error, and I ", " the database."],
        missingWords: ["checked", "saw", "restarted"],
        wordBank: ["saw", "we", "restarted", "checked", "deleted"]
      },
      scenario: {
        scenario: "The interviewer asks: 'What did you do when the website stopped?' What is the best STAR 'Action' reply?",
        options: [
          "We worked really hard to fix it as a team.",
          "I checked the error logs and restarted the main server.",
          "It was the DevOps team's fault, so I waited for them.",
          "I was very stressed but I tried my best."
        ],
        answerIndex: 1,
        explanation: "This answer uses 'I' and gives specific technical details about the action taken."
      }
    },
    {
      id: "action_deep_dive",
      title: "2. Focus on Your Actions",
      content: `
# Detail Your Actions

In the STAR method, the **Action** part is the most important. You must spend 50% of your time here. If your interview is 5 minutes long, spend 2 or 3 minutes talking about your actions. 

## Use "I", not "We"
Many engineers say "We fixed the bug." They think this shows they are good team players. But this is bad for interviews. The manager wants to know what **you** did. Did you write the code? Did you test the code? Did you review the code? If you say "we", they cannot give you a score.

## Talk about technical details
Do not just say "I solved it." Explain *how* you solved it. 
* Did you write a new script? 
* Which programming language did you use? 
* Did you restart the server? 
* How did you find the bug? 
Tell the manager your exact thoughts. Show them you understand the technology.
      `,
      vocabulary: [
        { word: "Details", meaning: "Small pieces of information about something." },
        { word: "Score", meaning: "The number of points a candidate gets in a test or interview." }
      ],
      fillInBlank: {
        sentenceParts: ["The manager wants to know what ", " did. If you say '", "', they cannot give you a score."],
        missingWords: ["you", "we"],
        wordBank: ["we", "I", "they", "you"]
      },
      scenario: {
        scenario: "The interviewer asks: 'How did you solve the bug?' What is the best reply?",
        options: [
          "I solved it very quickly because I am smart.",
          "We fixed it together in the afternoon.",
          "I wrote a Python script to find the error and then I updated the database.",
          "I told my manager about it."
        ],
        answerIndex: 2,
        explanation: "This provides the 'how' with specific technical details (Python script, updated database) and uses 'I'."
      }
    },
    {
      id: "ownership",
      title: "3. Leadership: Ownership",
      content: `
# Taking Ownership

Amazon has a rule called **Ownership**. This means you take care of the product like it is yours. Owners do not say "that is not my job."

## Fixing things you didn't break
Good engineers help even if it is not their task. Imagine you are working on a new feature. You look at old code written by someone else. The old code is messy and slow. An owner will fix the old code, too. They will not say "I did not write this, so I will not fix it."

## Making mistakes
Everyone makes mistakes. But owners do not hide them. If you break the production server, what do you do? An owner will say:
1. "I made a mistake."
2. "I fixed it quickly."
3. "I wrote a test so it does not happen again."
Do not blame your team. Do not blame the customer. Take the blame and fix the problem. That is what leaders do.
      `,
      vocabulary: [
        { word: "Ownership", meaning: "Taking responsibility for the success or failure of something." },
        { word: "Blame", meaning: "To say that someone else caused the problem." }
      ],
      fillInBlank: {
        sentenceParts: ["If you break the server, do not ", " your team. ", " the blame and ", " the problem."],
        missingWords: ["blame", "Take", "fix"],
        wordBank: ["hide", "fix", "blame", "Take", "cry"]
      },
      scenario: {
        scenario: "Your new code causes a crash in the live app. What do you tell your manager?",
        options: [
          "It's not my fault, the old code was bad.",
          "I made a mistake. I rolled back the code and I am writing a test for it now.",
          "I don't know who did it.",
          "We should fire the QA team for missing this."
        ],
        answerIndex: 1,
        explanation: "A true owner takes the blame immediately and focuses on the solution."
      }
    },
    {
      id: "customer",
      title: "4. Leadership: Customer Obsession",
      content: `
# Customer Obsession

Big tech companies love customers. You must show that you care about the users. This principle is called **Customer Obsession**.

## You are a developer, but you serve the customer
You might think: "I am a backend developer. I do not talk to customers." That is wrong. The code you write helps the customer. If your code is slow, the customer waits. If your code is fast, the customer is happy.

## How to show it in an interview
When an interviewer asks you a question, think about the user. 
* "I noticed the app was slow for the users, so I changed the database query."
* "I added a new button because users were confused."

Always put the customer first in your stories. Show the interviewer that you work hard to make the customer happy, not just to write cool code.
      `,
      vocabulary: [
        { word: "Obsession", meaning: "Thinking about someone or something all the time." },
        { word: "Backend", meaning: "The part of the software that runs on the server." }
      ],
      fillInBlank: {
        sentenceParts: ["I noticed the app was ", " for the users, so I ", " the database query."],
        missingWords: ["slow", "changed"],
        wordBank: ["deleted", "changed", "slow", "fast"]
      },
      scenario: {
        scenario: "You are asked to build a new feature. Which reason shows 'Customer Obsession'?",
        options: [
          "I built it because I wanted to learn a new programming language.",
          "I built it because my manager told me to.",
          "I built it because users complained that the old process was too slow.",
          "I built it because it looked cool."
        ],
        answerIndex: 2,
        explanation: "Customer Obsession means your actions are driven by the user's needs and pain points."
      }
    },
    {
      id: "hire_develop",
      title: "5. Hire and Develop the Best",
      content: `
# Building Great Teams

There is a leadership principle called **Hire and Develop the Best**. Leaders want to find smart people and help them grow. Building something big is never the result of one person. It is always a great team.

## Raising the Bar
When you hire someone, you must ask: "Does this person raise the bar?" This means: are they better than the people we have now? If the answer is no, do not hire them. Even if you are in a hurry, you must wait for the best person.

## Developing People
Half of this rule is about hiring. The other half is about developing people. If you are a senior engineer, you must help junior engineers. You must teach them. You must review their code and give them good feedback. In an interview, tell a story about a time you helped a junior engineer become better.
      `,
      vocabulary: [
        { word: "Raise the bar", meaning: "To increase the standard or level of quality." },
        { word: "Feedback", meaning: "Information about how someone is doing, used to help them improve." }
      ],
      fillInBlank: {
        sentenceParts: ["When you hire someone, you must ask: 'Does this person ", " the ", "?'"],
        missingWords: ["raise", "bar"],
        wordBank: ["drop", "raise", "code", "bar"]
      },
      scenario: {
        scenario: "You are interviewing a candidate. They are 'okay' but not great. Your team is very busy and needs help today. What do you do?",
        options: [
          "Hire them immediately because we need help.",
          "Do not hire them, because they do not raise the bar.",
          "Hire them and hope they get better.",
          "Let them join for one week as a test."
        ],
        answerIndex: 1,
        explanation: "You must never lower the hiring bar, even if the team is under time pressure."
      }
    }
  ],

  B1: [
    {
      id: "intro",
      title: "1. Mastering the STAR Method",
      content: `
# Mastering the STAR Method for Tech Interviews

Big tech companies like Amazon expect you to use the **STAR method** in behavioral interviews. It is a way to structure your answers so they are clear, professional, and easy to follow. Interviewers use this method to evaluate your past behavior, because past behavior is the best predictor of future success.

## The STAR Breakdown
* **Situation (Durum):** Explain the context of your story. For example, "During a server migration last month, our main database crashed." Keep this part brief. Provide enough detail so the interviewer understands the scale of the problem.
* **Task (Görev):** What was your specific responsibility? Explain the goal you were trying to achieve. "As the lead backend developer, I had to identify the root cause and restore the data."
* **Action (Aksiyon):** This is the core of your answer. Detail the exact steps **you** took to solve the problem. Explain your thought process and the technical decisions you made.
* **Result (Sonuç):** What was the final outcome? Try to use data and metrics. For example, "I restored the database in 15 minutes and reduced the load time by 30%." Tell them what you learned.
      `,
      vocabulary: [
        { word: "Predictor", meaning: "Something that can show what will happen in the future." },
        { word: "Metrics", meaning: "Numbers and data used to measure success." }
      ],
      fillInBlank: {
        sentenceParts: ["Past behavior is the best ", " of future success. The STAR method helps you structure your answers so they are ", " and easy to follow."],
        missingWords: ["predictor", "clear"],
        wordBank: ["mistake", "clear", "predictor", "boring"]
      },
      scenario: {
        scenario: "The interviewer says: 'Tell me about a time you solved a difficult problem.' How should you BEGIN your answer?",
        options: [
          "I always solve problems by working hard.",
          "Once, during a server migration, our main database crashed.",
          "I used Python and SQL to fix a bug.",
          "I think the most important thing is to stay calm."
        ],
        answerIndex: 1,
        explanation: "You should begin with the 'Situation' to set the context of a specific past story."
      }
    },
    {
      id: "action_deep_dive",
      title: "2. Nailing the 'Action' Section",
      content: `
# The Core of Your Answer: Action

The **Action** section should be the longest and most detailed part of your story. Interviewers want to hear about your problem-solving skills and how you handle difficult situations.

## Avoid the "We" trap
It is great to be a team player. But in an interview, they are hiring *you*, not your team. If you constantly say "we decided" or "we implemented," the interviewer will stop you and ask, "But what did *you* specifically do?" Always highlight your personal contributions. Say "I wrote the script," "I designed the architecture," or "I convinced my manager."

## Technical Depth and Trade-offs
Instead of saying "I fixed the database," explain the process. "I checked the error logs in AWS CloudWatch. I found that a missing index was causing slow queries. I added the index and monitored the CPU usage." 
      `,
      vocabulary: [
        { word: "Trade-off", meaning: "A balance achieved between two desirable but incompatible features." },
        { word: "Architecture", meaning: "The complex structure or design of a software system." }
      ],
      fillInBlank: {
        sentenceParts: ["Always highlight your personal ", ". Instead of saying '", " fixed it', explain the exact process you used."],
        missingWords: ["contributions", "we"],
        wordBank: ["mistakes", "contributions", "I", "we"]
      },
      scenario: {
        scenario: "You are describing how a team project was completed. What is the most FAANG-appropriate way to explain the coding part?",
        options: [
          "We all sat in a room and coded the solution together.",
          "The team successfully launched the feature on time.",
          "I personally wrote the authentication module while the team handled the frontend.",
          "I watched my senior developer fix the bug."
        ],
        answerIndex: 2,
        explanation: "This isolates your personal contribution ('I personally wrote...') while still acknowledging the team context."
      }
    },
    {
      id: "ownership",
      title: "3. Principle: Ownership",
      content: `
# Showing True Ownership

**Ownership** is a key Amazon Leadership Principle. Leaders think long-term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company. They never say "that's not my job."

## Beyond your daily tasks
To show ownership, talk about a time you fixed a problem that nobody asked you to fix. For example, if you noticed that the onboarding documentation for new developers was outdated. It wasn't your job to fix it, but you took the initiative to rewrite it during your free time because you knew it would help the company.

## Owning mistakes
True owners do not pass the blame. If you push a bug to production, you own it. Explain how you discovered the bug, how you immediately rolled back the deployment, and most importantly, how you created an automated test to prevent the same bug from happening again. This shows accountability.
      `,
      vocabulary: [
        { word: "Initiative", meaning: "The ability to assess and initiate things independently." },
        { word: "Accountability", meaning: "The fact or condition of being accountable; responsibility." }
      ],
      fillInBlank: {
        sentenceParts: ["True owners do not pass the ", ". If you push a bug to production, you must show ", " by fixing it and writing a test."],
        missingWords: ["blame", "accountability"],
        wordBank: ["code", "accountability", "blame", "excuses"]
      },
      scenario: {
        scenario: "You notice the onboarding documentation is completely wrong, but your manager hasn't asked you to fix it. What do you do?",
        options: [
          "Complain about it to the new developers.",
          "Ignore it, because it is the HR department's job.",
          "Take the initiative to rewrite it in your free time.",
          "Tell your manager to assign it to someone else."
        ],
        answerIndex: 2,
        explanation: "True ownership means taking initiative to fix broken things, even if it's 'not your job'."
      }
    },
    {
      id: "customer",
      title: "4. Principle: Customer Obsession",
      content: `
# Customer Obsession in Tech

Even backend engineers need to care about the customer. **Customer Obsession** means starting with the customer and working backwards. Although leaders pay attention to competitors, they obsess over customers.

## Working Backwards
When you are designing a new system, you shouldn't just choose the newest technology because it is fun. You should ask: "How does this improve the user experience?" If you are asked about a technical decision in an interview, relate it to the user.
* "I chose to cache the data in Redis because users were waiting 5 seconds for the page to load, which was unacceptable."

## Internal Customers
If you work on internal tools or DevOps, your "customers" are the other developers in your company. You can show customer obsession by explaining how you made their lives easier. "I automated the deployment pipeline because the frontend team was spending two hours a day doing manual deployments."
      `,
      vocabulary: [
        { word: "Obsess", meaning: "Preoccupy or fill the mind of someone continually." },
        { word: "Internal", meaning: "Existing or occurring within an organization." }
      ],
      fillInBlank: {
        sentenceParts: ["Customer obsession means starting with the customer and working ", ". You should ask how your code improves the user ", "."],
        missingWords: ["backwards", "experience"],
        wordBank: ["forwards", "backwards", "experience", "money"]
      },
      scenario: {
        scenario: "You are a DevOps engineer building a tool for the Frontend developers. How do you apply Customer Obsession?",
        options: [
          "I build it using the most complex code possible to impress them.",
          "I treat the Frontend developers as my internal customers and automate tasks to save them time.",
          "I focus on the external users and ignore the Frontend team.",
          "I tell them to build the tool themselves."
        ],
        answerIndex: 1,
        explanation: "Your 'customers' can be internal teams. Automating their workflows is true customer obsession."
      }
    },
    {
      id: "hire_develop",
      title: "5. Hire and Develop the Best",
      content: `
# Hire and Develop the Best

Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent and willingly move them throughout the organization. Building something world-class is never the result of an individual; it requires a great team of smart, inventive, and strategic people.

## Raising the Bar
When you are in a hiring meeting, you have to ask yourself: "Does this person raise the bar?" If the answer is no, you should not hire them. Even if you have time pressure to hire people to get moving on a project, you must never lower the bar. Working with people you respect and admire is the most important thing.

## Developing Talent
The other half of this principle is about developing people. As a senior engineer or manager, you must take seriously your role in coaching others. You have to be thoughtful about what a person does well and what they need to grow. In an interview, share a story about how you mentored a junior colleague and helped them get promoted.
      `,
      vocabulary: [
        { word: "Exceptional", meaning: "Unusually good; outstanding." },
        { word: "Mentor", meaning: "Advise or train someone, especially a younger colleague." }
      ],
      fillInBlank: {
        sentenceParts: ["Even if you have time ", ", you must never ", " the hiring bar."],
        missingWords: ["pressure", "lower"],
        wordBank: ["pressure", "increase", "lower", "money"]
      },
      scenario: {
        scenario: "A junior developer keeps making the same SQL error. As a leader, what should you do?",
        options: [
          "Fix the error for them quietly every time.",
          "Report them to the manager for being slow.",
          "Schedule a coaching session to explain SQL indexing and mentor them.",
          "Write a script that bans them from the database."
        ],
        answerIndex: 2,
        explanation: "Leaders actively coach and develop others, providing mechanisms for them to grow."
      }
    }
  ],

  B2: [
    {
      id: "intro",
      title: "1. The STAR Framework Guide",
      content: "Content identical to previous...",
      vocabulary: [{ word: "Quantifiable", meaning: "Able to be expressed or measured as a quantity." }],
      fillInBlank: { sentenceParts: ["Explain the ", " outcome. Use specific ", " whenever possible."], missingWords: ["quantifiable", "metrics"], wordBank: ["quantifiable", "metrics", "sad", "words"] },
      scenario: { scenario: "If the outcome was a failure, what should you say?", options: ["Lie about it.", "Share the post-mortem analysis and systemic changes.", "Blame the manager."], answerIndex: 1, explanation: "Failure is okay if you show the systemic changes you implemented." }
    }
  ],
  C1: [
    {
      id: "intro",
      title: "1. FAANG STAR Methodology",
      content: "Content identical to previous...",
      vocabulary: [{ word: "Proficiency", meaning: "A high degree of competence or skill; expertise." }],
      fillInBlank: { sentenceParts: ["Articulate the resolution using empirical, ", " metrics."], missingWords: ["quantifiable"], wordBank: ["quantifiable", "hidden"] },
      scenario: { scenario: "What is the primary purpose of the STAR method?", options: ["To test coding skills.", "To extract high-fidelity signals about cultural alignment."], answerIndex: 1, explanation: "It measures alignment with corporate values." }
    }
  ],
  C2: [
    {
      id: "intro",
      title: "1. Executive Behavioral Frameworks",
      content: "Content identical to previous...",
      vocabulary: [{ word: "Heuristic", meaning: "A practical approach to problem-solving." }],
      fillInBlank: { sentenceParts: ["Conclude with definitive, quantifiable ", " impact."], missingWords: ["infrastructural"], wordBank: ["infrastructural", "minor"] },
      scenario: { scenario: "At the Principal level, what must you ruthlessly isolate?", options: ["Your agency and strategic interventions.", "Your team's credit."], answerIndex: 0, explanation: "You must isolate your personal agency to prove executive impact." }
    }
  ]
};
