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
    },
    {
      id: "invent_simplify_a2",
      title: "6. Invent and Simplify in Interviews",
      content: `
# How to Show You Simplify Things

Amazon has a rule called **Invent and Simplify**. In a job interview, managers want to see how you make hard things easy. They do not just want to hear about complex code. They want to know you can make the team's life easier.

## Using STAR for this Rule
When you use the STAR method, your **Action** (what you did) is very important. 
Do not just say: "I wrote 1000 lines of code." That is not a good story. 
You must say: "The old system was very complicated and slow. I invented a new, simple way to do it. I deleted 500 lines of old code."

## Making Things Easy
If you make the work easier for your coworkers, you are a good leader. In your **Result** (what happened next), always share how much time or money you saved. 
For example: "My new tool simplified the work. The team saved 3 hours every day." This shows the interviewer that you truly understand "Invent and Simplify."
      `,
      vocabulary: [
        { word: "Complicated", meaning: "Hard to understand or deal with." },
        { word: "Coworker", meaning: "A person who works with you." }
      ],
      fillInBlank: {
        sentenceParts: ["The old system was very ", ". I invented a new, ", " way to do it."],
        missingWords: ["complicated", "simple"],
        wordBank: ["complicated", "bad", "simple", "expensive"]
      },
      scenario: {
        scenario: "You are answering an interview question using STAR. What is the best 'Result' to show 'Invent and Simplify'?",
        options: [
          "I used 5 different complex programming languages.",
          "My manager said good job.",
          "I simplified the database, and the team saved 10 hours a week.",
          "I worked very hard until midnight."
        ],
        answerIndex: 2,
        explanation: "Saving time by simplifying a system perfectly demonstrates this leadership principle."
      }
    },
    {
      id: "are_right_a_lot_a2",
      title: "7. Are Right, A Lot (Judgment)",
      content: `
# Showing Good Judgment

"Are Right, A Lot" means making good choices. But how do you show this in an interview? Many people think they must look perfect. They think they should never say "I was wrong." This is a big mistake!

## Listening to Other Ideas
In your STAR story, you can talk about a time you made a bad plan. But then, you listened to your team. You asked for feedback. You changed your plan because a junior developer had a better idea. 
Good leaders do not have a big ego. They only want the best result for the customer. 

## Changing Your Mind
Telling a story about changing your mind shows strong judgment. It shows the manager that you listen to the "signal" (the truth) and ignore the "noise" (your ego).
In your **Action** part, you can say: "I spoke last in the meeting to hear everyone's ideas. I realized my first idea was wrong. So, we used the team's idea." This is exactly what FAANG companies want to see.
      `,
      vocabulary: [
        { word: "Judgment", meaning: "The ability to make good decisions." },
        { word: "Ego", meaning: "A person's sense of self-esteem or self-importance." }
      ],
      fillInBlank: {
        sentenceParts: ["Good leaders do not have a big ", ". Telling a story about changing your mind shows strong ", "."],
        missingWords: ["ego", "judgment"],
        wordBank: ["ego", "money", "judgment", "code"]
      },
      scenario: {
        scenario: "How can you show 'Are Right, A Lot' in an interview story?",
        options: [
          "Tell a story where you proved everyone else was wrong.",
          "Tell a story where you listened to a better idea and changed your mind to help the customer.",
          "Never admit that you made a mistake.",
          "Say that you are always right."
        ],
        answerIndex: 1,
        explanation: "Being right a lot is about finding the best truth, even if it means changing your own mind."
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
    },
    {
      id: "invent_simplify_b1",
      title: "6. Principle: Invent and Simplify",
      content: `
# Applying "Invent and Simplify" in Interviews

The principle **Invent and Simplify** is not just about creating new products; it is about how you approach your daily work. Interviewers at FAANG companies want to see that you reduce complexity rather than adding to it. 

## Demonstrating Simplification in STAR
When structuring your STAR response, your **Action** section should highlight how you challenged the "we've always done it this way" mentality. 
Instead of talking about how you built a massive, overly complicated system, explain how you found a simpler, more elegant solution. For example, tell a story about replacing a heavy legacy process with a simple automation script. 

## Quantifying the Simplification
A strong STAR answer must prove that your invention helped the business. In your **Result** section, quantify the impact. 
Did your new process reduce server costs? Did it save the QA team 10 hours of manual testing every week? Using metrics to prove you simplified a workflow is the best way to score high marks for this leadership principle.
      `,
      vocabulary: [
        { word: "Complexity", meaning: "The state of having many different and connected parts." },
        { word: "Quantify", meaning: "To express or measure the quantity of something." }
      ],
      fillInBlank: {
        sentenceParts: ["Interviewers want to see that you reduce ", ". In your Result section, you must ", " the impact of your invention."],
        missingWords: ["complexity", "quantify"],
        wordBank: ["complexity", "quantify", "speed", "ignore"]
      },
      scenario: {
        scenario: "Which STAR 'Action' best demonstrates the Invent and Simplify principle?",
        options: [
          "I used a very complicated design pattern to impress the senior developers.",
          "I realized we were doing the same manual data entry every day, so I wrote a short Python script to automate it.",
          "I refused to use the new tools and stuck to the old manual process.",
          "I asked my manager to do the work instead."
        ],
        answerIndex: 1,
        explanation: "Writing a script to automate a repetitive task perfectly demonstrates inventing a solution that simplifies work."
      }
    },
    {
      id: "are_right_a_lot_b1",
      title: "7. Principle: Are Right, A Lot",
      content: `
# Using "Are Right, A Lot" in STAR Stories

The principle **Are Right, A Lot** evaluates your judgment. Many candidates mistakenly believe they must tell a story where they were perfect and their initial idea won the debate. This is a huge trap.

## The Power of Changing Your Mind
In reality, interviewers want to see how you handle ambiguity and how you actively work to disconfirm your own beliefs. An excellent STAR response is actually a story about a time you were *wrong* at first. 

For your **Situation**, you can describe a time you had a strong opinion about an architecture choice. But in the **Action** phase, you explain how you gathered the right people in a room, spoke last, and listened to diverse perspectives. 

## Prioritizing the Customer Over Ego
When you explain that you changed your mind because a junior developer had a better idea backed by data, you show incredible maturity. It proves that your ego does not get in the way of finding the best solution for the customer. That is the true meaning of having strong judgment and being "right, a lot."
      `,
      vocabulary: [
        { word: "Disconfirm", meaning: "To show that a belief or hypothesis is not true." },
        { word: "Maturity", meaning: "The quality of behaving in a sensible, adult way." }
      ],
      fillInBlank: {
        sentenceParts: ["Many candidates mistakenly believe they must tell a story where they were ", ". It is better to show that your ", " does not get in the way of the best solution."],
        missingWords: ["perfect", "ego"],
        wordBank: ["perfect", "ego", "wrong", "manager"]
      },
      scenario: {
        scenario: "An interviewer asks: 'Tell me about a time you disagreed with your team.' What is the best way to frame your answer?",
        options: [
          "Explain how you fought everyone until they accepted your brilliant idea.",
          "Explain how you actively listened to their data, realized your initial approach was flawed, and supported their better solution.",
          "Explain that you never disagree with your team because you are a perfect team player.",
          "Complain that your team never understands your high-level concepts."
        ],
        answerIndex: 1,
        explanation: "Showing that you can listen to data and change your mind demonstrates strong executive judgment and lack of ego."
      }
    }
  ],

  B2: [
    {
      id: "intro_b2",
      title: "1. The STAR Framework Guide",
      content: `
# Understanding the STAR Framework

The STAR method is an industry-standard framework used to evaluate candidates in behavioral interviews. It allows you to present your past experiences in a structured and quantifiable manner.

* **Situation:** Establish the context quickly.
* **Task:** Define your specific objective.
* **Action:** Detail your technical implementation and problem-solving process.
* **Result:** Explain the quantifiable outcome. Use specific metrics whenever possible.
      `,
      vocabulary: [{ word: "Quantifiable", meaning: "Able to be expressed or measured as a quantity." }],
      fillInBlank: { sentenceParts: ["Explain the ", " outcome. Use specific ", " whenever possible."], missingWords: ["quantifiable", "metrics"], wordBank: ["quantifiable", "metrics", "sad", "words"] },
      scenario: { scenario: "If the outcome was a failure, what should you say?", options: ["Lie about it.", "Share the post-mortem analysis and systemic changes.", "Blame the manager."], answerIndex: 1, explanation: "Failure is okay if you show the systemic changes you implemented." }
    },
    {
      id: "invent_simplify_b2",
      title: "2. The Challenge of Constant Invention",
      content: `
# Demonstrating "Invent and Simplify" in Interviews

Interviewers expect you to demonstrate the **Invent and Simplify** principle through your STAR stories. They don't want a history lesson; they want to see how you personally reduce complexity in your engineering environment.

## Breaking Down Complexity
When framing your **Action** phase, do not simply describe building a complex system. FAANG companies suffer from enough technical debt already. Instead, narrate a time when you encountered a convoluted legacy system or an inefficient process. How did you challenge the "we've always done it this way" mentality?

## Quantifying the Simplification
A strong STAR answer highlights your ability to innovate without over-engineering. Explain how your invention made the workflow more elegant. Your **Result** should clearly quantify the simplification: "By refactoring the monolithic architecture into microservices, I reduced deployment time by 40% and eliminated manual database locks." This proves you understand that true innovation simplifies the lives of your colleagues and customers.
      `,
      vocabulary: [
        { word: "Convoluted", meaning: "Extremely complex and difficult to follow." },
        { word: "Refactoring", meaning: "Restructuring existing computer code without changing its external behavior." }
      ],
      fillInBlank: {
        sentenceParts: ["FAANG companies suffer from enough technical ", " already. You must quantify how you reduced ", "."],
        missingWords: ["debt", "complexity"],
        wordBank: ["debt", "complexity", "money", "code"]
      },
      scenario: {
        scenario: "You are describing a system rewrite. Which narrative best captures Invent and Simplify?",
        options: [
          "I added 5 new layers of abstraction so only senior engineers could read the code.",
          "I removed redundant middleware layers, which decreased latency by 200ms and made the codebase easier for juniors to maintain.",
          "I rewrote the backend in Rust just because I wanted to learn it, even though it delayed the project.",
          "I asked the DevOps team to handle the complexity."
        ],
        answerIndex: 1,
        explanation: "Removing redundancy to decrease latency and improve maintainability is the epitome of Invent and Simplify."
      }
    },
    {
      id: "are_right_a_lot_b2",
      title: "3. Judgment: Are Right, A Lot",
      content: `
# Proving Judgment in STAR Interviews

The principle **Are Right, A Lot** is essentially a proxy for judgment. When candidates try to incorporate this into their STAR answers, they often make a critical error: they try to prove they were the smartest person in the room.

## The Trap of Infallibility
Candidates mistakenly believe that their stories must depict them as infallible visionaries whose initial ideas always "carry the day." In reality, interviewers want to see how you operate in areas of high ambiguity. They want to see you actively working to disconfirm your own beliefs.

## The Perfect STAR Narrative
An exceptional STAR response involves a **Situation** where you had strong incoming convictions, but you intentionally sought out dissenting perspectives. In your **Action**, detail how you sifted through the noise, listened to feedback (perhaps speaking last in the meeting), and pivoted your strategy based on new data. This proves that your primary loyalty is to finding the best signal for the customer, not protecting your own ego.
      `,
      vocabulary: [
        { word: "Infallible", meaning: "Incapable of making mistakes or being wrong." },
        { word: "Dissenting", meaning: "Holding or expressing opinions that are at odds with those previously or commonly held." }
      ],
      fillInBlank: {
        sentenceParts: ["Candidates mistakenly believe their stories must depict them as ", ". Instead, you should intentionally seek out ", " perspectives."],
        missingWords: ["infallible", "dissenting"],
        wordBank: ["infallible", "dissenting", "perfect", "loud"]
      },
      scenario: {
        scenario: "How should you incorporate the concept of 'sifting through noise' into your Action phase?",
        options: [
          "By explaining how you ignored your teammates' ideas because they were just 'noise'.",
          "By describing how you gathered diverse data points to find the true underlying problem before rushing to code.",
          "By turning off your Slack notifications to avoid noise.",
          "By stating that you only listen to the CEO's instructions."
        ],
        answerIndex: 1,
        explanation: "Sifting through noise means filtering out irrelevant data to focus on the root cause, demonstrating analytical depth.",
      }
    },
    {
      id: "customer_b2",
      title: "4. Principle: Customer Obsession",
      content: `
# Customer Obsession for Senior Engineers

At the B2 level, Customer Obsession means understanding the profound impact of technical choices on the end-user experience. It is not just about building features; it's about advocating for the customer when balancing technical trade-offs.

## Internal vs. External Customers
Senior engineers often build platforms for internal teams. You must show how you obsess over the developer experience (DX). 

## Your STAR Answer
When asked about a time you advocated for the customer, explain the **Action** you took to push back against a product requirement that degraded the user experience, or how you prioritized a latency fix over a shiny new feature. Your **Result** must highlight the measurable impact on customer satisfaction or retention.
      `,
      vocabulary: [
        { word: "Advocate", meaning: "To publicly recommend or support." },
        { word: "Latency", meaning: "The delay before a transfer of data begins following an instruction." }
      ],
      fillInBlank: {
        sentenceParts: ["You must ", " for the customer when balancing technical trade-offs. Prioritize a ", " fix over a new feature."],
        missingWords: ["advocate", "latency"],
        wordBank: ["advocate", "latency", "ignore", "money"]
      },
      scenario: {
        scenario: "Product Management wants to launch a feature that increases page load time by 3 seconds. What do you do?",
        options: [
          "Launch it because Product requested it.",
          "Push back with data showing how latency reduces customer retention and propose an optimized architecture.",
          "Tell them to ask the frontend team to fix it.",
          "Quit your job."
        ],
        answerIndex: 1,
        explanation: "Advocating for the customer means pushing back on requirements that harm the user experience."
      }
    },
    {
      id: "hire_develop_b2",
      title: "5. Principle: Hire and Develop the Best",
      content: `
# Raising the Engineering Bar

As you progress in your career, your impact is measured not just by the code you write, but by the engineers you elevate. FAANG companies expect senior candidates to be active mentors and rigorous interviewers.

## Mentorship in Your STAR Story
In your interviews, you must demonstrate how you develop others. Did you create a new onboarding curriculum? Did you mentor a struggling junior engineer until they were promoted?

## Setting the Standard
Your **Action** should describe the specific coaching mechanisms you used—like conducting deep-dive code reviews or hosting weekly architecture seminars. The **Result** must be the quantifiable growth of your colleagues.
      `,
      vocabulary: [
        { word: "Elevate", meaning: "To raise to a more important or impressive level." },
        { word: "Curriculum", meaning: "The subjects comprising a course of study." }
      ],
      fillInBlank: {
        sentenceParts: ["Your impact is measured by the engineers you ", ". Your Action should describe specific coaching ", "."],
        missingWords: ["elevate", "mechanisms"],
        wordBank: ["elevate", "mechanisms", "fire", "tools"]
      },
      scenario: {
        scenario: "A junior engineer submits a pull request with messy, unoptimized code. How do you handle it?",
        options: [
          "Approve it to save time.",
          "Reject it with a rude comment.",
          "Rewrite the code for them.",
          "Schedule a pairing session to walk through the logic and teach them best practices."
        ],
        answerIndex: 3,
        explanation: "Developing the best requires taking the time to mentor and teach, not just fixing things for them."
      }
    },
    {
      id: "deliver_results_b2",
      title: "6. Principle: Deliver Results",
      content: `
# Delivering Despite Setbacks

"Deliver Results" is about overcoming unforeseen roadblocks and delivering the right quality in a timely fashion. 

## The Reality of Software Engineering
Things go wrong. Servers crash, APIs change, and requirements pivot. Interviewers want to know how you react when the project goes off the rails. 

## The 'Roadblock' STAR Story
For your **Situation**, describe a project that was failing. In your **Action**, explain the pragmatic choices you made to rescue it. Did you negotiate a reduced scope? Did you work cross-functionally to unblock your team? The **Result** must show that you delivered the core value to the business despite the chaos.
      `,
      vocabulary: [
        { word: "Pragmatic", meaning: "Dealing with things sensibly and realistically." },
        { word: "Unforeseen", meaning: "Not anticipated or predicted." }
      ],
      fillInBlank: {
        sentenceParts: ["Explain the ", " choices you made to rescue the project. Deliver the core value despite ", " roadblocks."],
        missingWords: ["pragmatic", "unforeseen"],
        wordBank: ["pragmatic", "unforeseen", "emotional", "easy"]
      },
      scenario: {
        scenario: "Two weeks before launch, a critical third-party API shuts down. How do you deliver results?",
        options: [
          "Cancel the project.",
          "Blame the third party and tell the CEO it's impossible.",
          "Quickly evaluate alternative APIs, negotiate a scoped-down MVP, and rally the team to integrate it on time.",
          "Hide the failure and hope nobody notices."
        ],
        answerIndex: 2,
        explanation: "Delivering results means finding pragmatic workarounds to unforeseen problems to ensure value is delivered."
      }
    },
    {
      id: "learn_curious_b2",
      title: "7. Principle: Learn and Be Curious",
      content: `
# Continuous Learning in Tech

The technology landscape changes rapidly. "Learn and Be Curious" means you never settle into complacency. You explore new possibilities and act to explore them.

## Proving Curiosity
Don't just say "I read tech blogs." Tell a STAR story where your curiosity solved a business problem. 

## The Curiosity Narrative
Perhaps you noticed a recurring bug (Situation). Because you are curious, you dug into the open-source library's source code, found a memory leak, and contributed a patch (Action). The Result was improved performance for your company and the wider community. This proves your curiosity generates tangible value.
      `,
      vocabulary: [
        { word: "Complacency", meaning: "A feeling of smug or uncritical satisfaction with oneself." },
        { word: "Tangible", meaning: "Perceptible by touch; clear and definite; real." }
      ],
      fillInBlank: {
        sentenceParts: ["You never settle into ", ". Your curiosity must generate ", " value for the business."],
        missingWords: ["complacency", "tangible"],
        wordBank: ["complacency", "tangible", "excitement", "fake"]
      },
      scenario: {
        scenario: "Which 'Action' best demonstrates Learn and Be Curious?",
        options: [
          "I learned a new framework just for fun but never used it.",
          "I watched a tutorial on YouTube during my lunch break.",
          "I noticed our search was slow, so I researched Elasticsearch, built a prototype on my weekend, and presented it to the team.",
          "I asked my manager to pay for a course."
        ],
        answerIndex: 2,
        explanation: "Curiosity must be coupled with action that drives tangible business or technical value."
      }
    }
  ],

  C1: [
    {
      id: "intro_c1",
      title: "1. FAANG STAR Methodology",
      content: `
# Advanced STAR Methodology

At the staff and principal levels, the STAR method requires articulating complex architectural tradeoffs and proving multi-team impact. You must demonstrate high-fidelity signals regarding cultural alignment and empirical problem-solving.
      `,
      vocabulary: [{ word: "Proficiency", meaning: "A high degree of competence or skill; expertise." }],
      fillInBlank: { sentenceParts: ["Articulate the resolution using empirical, ", " metrics."], missingWords: ["quantifiable"], wordBank: ["quantifiable", "hidden"] },
      scenario: { scenario: "What is the primary purpose of the STAR method?", options: ["To test coding skills.", "To extract high-fidelity signals about cultural alignment."], answerIndex: 1, explanation: "It measures alignment with corporate values." }
    },
    {
      id: "invent_simplify_c1",
      title: "2. Executive Principle: Invent and Simplify",
      content: `
# Demonstrating "Invent and Simplify" at the Executive Level

In executive interviews, "Invent and Simplify" requires articulating how you drive systemic innovation without succumbing to architectural bloat. Interviewers are not evaluating your ability to write code; they are evaluating your capacity to eliminate operational friction across entire organizations.

## Articulating Simplification in STAR
When structuring your **Action** phase, avoid getting bogged down in localized technical implementations. Instead, narrate how you identified a convoluted, cross-functional bottleneck—perhaps a legacy deployment pipeline or a fragmented marketplace architecture. How did you challenge organizational inertia and the "not invented here" syndrome?

## Quantifying the Paradigm Shift
A principal-level STAR answer must prove that your intervention yielded a paradigm shift. Your **Result** should unequivocally quantify the simplification at scale: "By deprecating three redundant microservices and standardizing the data ingestion layer, we reduced infrastructural overhead by $400k annually and accelerated feature velocity for 5 engineering squads." This validates that your innovations systematically simplify the enterprise.
      `,
      vocabulary: [
        { word: "Bloat", meaning: "A condition where software becomes excessively large and inefficient." },
        { word: "Inertia", meaning: "A tendency to do nothing or to remain unchanged." }
      ],
      fillInBlank: {
        sentenceParts: ["You must articulate how you drive systemic innovation without succumbing to architectural ", ". Your Result should quantify the simplification at ", "."],
        missingWords: ["bloat", "scale"],
        wordBank: ["bloat", "scale", "speed", "code"]
      },
      scenario: {
        scenario: "As a Principal Engineer, how do you best demonstrate 'Invent and Simplify' in an interview?",
        options: [
          "By detailing the specific syntax of a brilliant algorithm you wrote.",
          "By explaining how you successfully managed 50 engineers to build a massive, complex platform.",
          "By describing how you identified systemic organizational friction and implemented an elegant architectural simplification that accelerated velocity across multiple teams.",
          "By claiming credit for every patent your team filed."
        ],
        answerIndex: 2,
        explanation: "At the executive level, simplification means reducing systemic friction and accelerating velocity at scale."
      }
    },
    {
      id: "are_right_a_lot_c1",
      title: "3. The Judgment Proxy: Are Right, A Lot",
      content: `
# Proving Executive Judgment in STAR Interviews

The principle **Are Right, A Lot** is rigorously scrutinized at the staff and executive levels as a direct proxy for judgment. Candidates frequently miscalibrate their STAR narratives by attempting to project an aura of omniscience, structuring their stories to show how their initial hypotheses inevitably "carried the day."

## The Trap of Omniscience
In reality, operating at high levels of ambiguity demands the humility to actively disconfirm your own biases. Interviewers are actively searching for evidence of intellectual malleability. An exceptional executive STAR response involves a **Situation** characterized by immense strategic noise and conflicting data.

## Structuring the 'Action' of Judgment
In your **Action** phase, you must detail your heuristic for sifting through this ambiguity. Explain how you orchestrated a room of dissenting experts, deliberately spoke last, and rigorously pressure-tested your incoming convictions. When you conclude your **Result** by explaining how you abandoned your initial strategy in favor of a superior, data-backed approach surfaced by your team, you demonstrate the pinnacle of executive judgment: an uncompromising allegiance to the optimal customer outcome over personal ego.
      `,
      vocabulary: [
        { word: "Omniscience", meaning: "The state of knowing everything." },
        { word: "Heuristic", meaning: "A practical approach to problem-solving, learning, or discovery." }
      ],
      fillInBlank: {
        sentenceParts: ["Candidates frequently miscalibrate by attempting to project an aura of ", ". Instead, you must explain your ", " for sifting through ambiguity."],
        missingWords: ["omniscience", "heuristic"],
        wordBank: ["omniscience", "heuristic", "perfection", "algorithm"]
      },
      scenario: {
        scenario: "An interviewer asks how you handled a critical strategic divergence. Which approach demonstrates top-tier executive judgment?",
        options: [
          "Overruling dissenters immediately to maintain project momentum.",
          "Orchestrating a structured debate where you spoke last, actively worked to disconfirm your own bias, and pivoted to the data-backed consensus.",
          "Delaying the project until the ambiguity completely vanished.",
          "Presenting a compromise that satisfied everyone's ego but diluted the customer value."
        ],
        answerIndex: 1,
        explanation: "Actively working to disconfirm biases and prioritizing the data-backed customer outcome is the core of 'Are Right, A Lot'."
      }
    },
    {
      id: "customer_c1",
      title: "4. Executive Principle: Customer Obsession",
      content: `
# Customer Obsession at Scale

At the Staff and Principal levels, Customer Obsession transcends resolving individual bugs. It requires aligning entire engineering organizations toward a cohesive, customer-centric architecture.

## Working Backwards from the Customer
You must demonstrate how you use empirical data to proxy the voice of the customer in executive meetings. Do you advocate for architectural investments (like reducing P99 latency) over feature factories? 

## The Executive STAR Narrative
Your **Action** should detail how you identified a systemic disconnect between engineering output and customer needs. Explain the mechanisms you implemented to bridge this gap. The **Result** must validate how your architectural or organizational changes directly correlated with massive increases in customer satisfaction, retention, or revenue.
      `,
      vocabulary: [
        { word: "Cohesive", meaning: "Characterized by or causing cohesion; forming a united whole." },
        { word: "Empirical", meaning: "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic." }
      ],
      fillInBlank: {
        sentenceParts: ["Aligning entire engineering organizations toward a ", " architecture requires using ", " data to proxy the voice of the customer."],
        missingWords: ["cohesive", "empirical"],
        wordBank: ["cohesive", "empirical", "fragmented", "emotional"]
      },
      scenario: {
        scenario: "The engineering team wants to adopt a trendy new database, but the migration will halt feature development for 6 months with no visible benefit to the user. What do you do?",
        options: [
          "Approve the migration to keep the engineers happy.",
          "Veto the migration by empirically proving that the architectural investment provides zero ROI for the customer experience.",
          "Let the team vote on it.",
          "Resign."
        ],
        answerIndex: 1,
        explanation: "Executives must ruthlessly protect the customer experience and veto technical investments that lack customer ROI."
      }
    },
    {
      id: "hire_develop_c1",
      title: "5. Executive Principle: Hire and Develop the Best",
      content: `
# Architecting Talent Density

At the executive echelon, "Hire and Develop the Best" means designing the organizational mechanisms that systematically elevate talent density across the company. You are no longer just a mentor; you are an architect of culture.

## Mechanisms Over Intentions
Good intentions don't scale; mechanisms do. Interviewers want to know how you codified the hiring bar. 

## The Mechanism Narrative
In your **Action**, narrate how you established technical interview rubrics, overhauled the promotion criteria, or built a company-wide engineering academy. The **Result** should be quantified not by your own code, but by the aggregate impact of the leaders you successfully cultivated and empowered.
      `,
      vocabulary: [
        { word: "Echelon", meaning: "A level or rank in an organization, a profession, or society." },
        { word: "Aggregate", meaning: "A whole formed by combining several separate elements." }
      ],
      fillInBlank: {
        sentenceParts: ["Good intentions don't scale; ", " do. Your impact is measured by the ", " success of the leaders you cultivated."],
        missingWords: ["mechanisms", "aggregate"],
        wordBank: ["mechanisms", "aggregate", "wishes", "isolated"]
      },
      scenario: {
        scenario: "Engineering velocity is dropping because the hiring bar is inconsistent across 10 different teams. What is your executive action?",
        options: [
          "Personally interview every single candidate from now on.",
          "Fire the recruiters.",
          "Design and implement a standardized technical interviewing rubric and train a core group of 'Bar Raisers' to enforce it across all teams.",
          "Tell the teams to work harder."
        ],
        answerIndex: 2,
        explanation: "Creating a scalable mechanism (rubrics and Bar Raisers) elevates talent density systematically."
      }
    },
    {
      id: "deliver_results_c1",
      title: "6. Executive Principle: Deliver Results",
      content: `
# Delivering in the Face of Enterprise Headwinds

At the Staff/Principal level, "Deliver Results" evaluates your ability to navigate intense organizational friction, secure massive cross-functional alignment, and execute high-stakes initiatives against impossible odds.

## Navigating Headwinds
You will face headwinds: budget cuts, shifting corporate strategies, and warring department heads. Your STAR story must show political acumen and strategic ruthlessness.

## The 'Turnaround' Story
Describe a **Situation** where a multi-million dollar initiative was destined for failure. Your **Action** should detail how you decisively audited the architecture, realigned the warring stakeholders, deprecated failing scopes, and established rigorous delivery mechanisms. The **Result** is the successful launch of a strategically vital product that salvaged the company's quarter.
      `,
      vocabulary: [
        { word: "Acumen", meaning: "The ability to make good judgments and quick decisions, typically in a particular domain." },
        { word: "Ruthlessness", meaning: "The quality of lacking pity or compassion for others (in a strategic sense, lacking sentimentality for bad ideas)." }
      ],
      fillInBlank: {
        sentenceParts: ["Your STAR story must show political ", " and strategic ", " when navigating enterprise headwinds."],
        missingWords: ["acumen", "ruthlessness"],
        wordBank: ["acumen", "ruthlessness", "weakness", "hesitation"]
      },
      scenario: {
        scenario: "A critical enterprise launch is 3 months behind schedule due to two teams fighting over API ownership. What is your action?",
        options: [
          "Let them resolve it naturally.",
          "Step in, mandate an architectural contract, decouple the dependencies, and enforce a unified delivery mechanism.",
          "Cancel the launch.",
          "Tell the CEO to fire both team leads."
        ],
        answerIndex: 1,
        explanation: "Executives deliver results by breaking deadlocks, mandating architectural clarity, and forcing alignment."
      }
    },
    {
      id: "learn_curious_c1",
      title: "7. Executive Principle: Learn and Be Curious",
      content: `
# Strategic Curiosity at Scale

For technology executives, "Learn and Be Curious" is not about reading HackerNews. It is about identifying macro-trends in technology and strategically maneuvering the organization to capitalize on them before the competition does.

## Capitalizing on Macro-Trends
Did you foresee the shift to cloud-native architectures? Did you recognize the disruptive potential of LLMs early on? 

## The Foresight Narrative
Your **Situation** should describe a looming existential threat or opportunity for the business. In your **Action**, articulate how your curiosity led you to deeply investigate an emerging paradigm, prototype a proof-of-concept, and systematically convince the executive board to pivot the engineering strategy. The **Result** is the organization establishing a first-mover advantage in a critical new domain.
      `,
      vocabulary: [
        { word: "Existential", meaning: "Relating to existence (in business, a threat that could destroy the company)." },
        { word: "Paradigm", meaning: "A typical example or pattern of something; a model." }
      ],
      fillInBlank: {
        sentenceParts: ["Investigate an emerging ", " and convince the board to pivot strategy to avoid a looming ", " threat."],
        missingWords: ["paradigm", "existential"],
        wordBank: ["paradigm", "existential", "minor", "book"]
      },
      scenario: {
        scenario: "You notice a new technology paradigm that could render your company's core product obsolete in 3 years. What do you do?",
        options: [
          "Ignore it; 3 years is a long time.",
          "Deeply investigate the paradigm, prototype an integration, and present a strategic pivot plan to the board of directors.",
          "Complain about it to your coworkers.",
          "Start looking for a new job."
        ],
        answerIndex: 1,
        explanation: "Strategic curiosity involves deep investigation and leading the organizational pivot to capture the opportunity."
      }
    }
  ],

  C2: [
    {
      id: "intro_c2",
      title: "1. Executive Behavioral Frameworks",
      content: `
# Executive Level STAR

At the highest echelon, you must demonstrate systemic impact. Conclude with definitive, quantifiable infrastructural impact. You must ruthlessly isolate your personal agency to prove executive impact rather than riding the coattails of your team.
      `,
      vocabulary: [{ word: "Heuristic", meaning: "A practical approach to problem-solving." }],
      fillInBlank: { sentenceParts: ["Conclude with definitive, quantifiable ", " impact."], missingWords: ["infrastructural"], wordBank: ["infrastructural", "minor"] },
      scenario: { scenario: "At the Principal level, what must you ruthlessly isolate?", options: ["Your agency and strategic interventions.", "Your team's credit."], answerIndex: 0, explanation: "You must isolate your personal agency to prove executive impact." }
    },
    {
      id: "invent_simplify_c2",
      title: "2. Advanced Corporate Strategy: Invent and Simplify",
      content: `
# Executive Strategy: Invent and Simplify

Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere and are not limited by "not invented here." As we do new things, we accept that we may be misunderstood for long periods of time.

## The Attrition of Innovation
For a lot of companies who actually make it as a company, they get through the startup stage and make it on the strength of a great innovative idea. However, for a lot of those companies, it actually becomes really difficult to invent something else new and they spend lots of time just iterating in small ways on that original invention idea that made them as a business. And it's actually difficult to sustain being successful in a dynamic world we live in and how fast technology changes if you're not constantly inventing and reinventing.

## Demonstrating Simplification in Executive Interviews
When utilizing the STAR framework at the C-level, your narrative must transcend tactical coding. You must articulate how you recognized systemic attrition of innovation within a broader organizational context. In your **Action**, detail how you dismantled convoluted organizational structures or deprecated massive legacy monoliths that were impeding velocity. Your **Result** must demonstrate a structural paradigm shift—proving that your simplification strategy catalyzed renewed innovation and fundamentally altered the company's trajectory, much like the shift from failed Auctions to the Single Detail Page.
      `,
      vocabulary: [
        { word: "Transcendent", meaning: "Beyond or above the range of normal or merely physical human experience." },
        { word: "Attrition", meaning: "The process of gradually reducing the strength or effectiveness of someone or something." }
      ],
      fillInBlank: {
        sentenceParts: ["Your narrative must transcend tactical coding and detail how you dismantled ", " organizational structures that were impeding ", "."],
        missingWords: ["convoluted", "velocity"],
        wordBank: ["convoluted", "velocity", "simple", "money"]
      },
      scenario: {
        scenario: "In an executive interview, you are asked about driving innovation. What is the most powerful STAR narrative?",
        options: [
          "Detailing how you personally wrote the core algorithm for a new product.",
          "Describing how you recognized organizational attrition, deprecated a legacy monolith, and implemented a simplified architecture that catalyzed enterprise-wide velocity.",
          "Explaining how you hired 500 new engineers to brute-force a solution.",
          "Discussing your strict adherence to the existing corporate roadmap."
        ],
        answerIndex: 1,
        explanation: "At the C-level, driving innovation means dismantling systemic barriers and simplifying architectures to catalyze velocity."
      }
    },
    {
      id: "are_right_a_lot_c2",
      title: "3. Strategic Judgment: Are Right, A Lot",
      content: `
# Executive Judgment: Are Right, A Lot

Leaders are right, a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.

## Sifting Signal from Noise in Ambiguity
We operate in high areas of ambiguity in many of the businesses that Amazon pursues. We're the first market or we're inventing in that space. Or even when we built a business that works well, we're constantly trying to figure out how to keep changing and improving the customer experience. So we always deal in areas that have lots of ambiguity, lots of noise around it. And we have to be great at this company at sifting through all the different noise and finding the signal and what really matters for customers.

## Proving Judgment in STAR Interviews
When constructing a C-level STAR narrative around judgment, candidates must avoid the trap of projecting omniscience. The pinnacle of executive judgment is not proving your initial hypothesis was correct; it is proving your rigorous adherence to empirical validation. 
In your **Action** phase, articulate the exact mechanisms you utilized to sift signal from noise amidst extreme strategic ambiguity. Detail how you fostered a culture of dissenting debate, actively worked to disconfirm your most closely held beliefs, and ultimately aligned the organization toward a data-backed paradigm shift. The true mark of an executive who is "right a lot" is the intellectual humility to let the data, not their ego, dictate the final **Result**.
      `,
      vocabulary: [
        { word: "Paradigm shift", meaning: "A fundamental change in approach or underlying assumptions." },
        { word: "Ambiguity", meaning: "The quality of being open to more than one interpretation; inexactness." }
      ],
      fillInBlank: {
        sentenceParts: ["The pinnacle of executive judgment is not proving your initial hypothesis was correct; it is proving your rigorous adherence to ", " validation amidst extreme strategic ", "."],
        missingWords: ["empirical", "ambiguity"],
        wordBank: ["empirical", "ambiguity", "emotional", "clarity"]
      },
      scenario: {
        scenario: "As a VP, you host a strategy meeting. Your team arrives at a brilliant solution that completely contradicts the strategy you prepared. How do you frame this in a STAR interview?",
        options: [
          "I frame it as a failure of my team to understand my vision.",
          "I frame it as a success, detailing how my mechanism for fostering dissenting debate successfully disconfirmed my bias and led to the optimal empirical outcome.",
          "I omit the story because it makes me look weak.",
          "I take credit for their idea in the interview."
        ],
        answerIndex: 1,
        explanation: "Fostering debate to disconfirm your own bias is the exact definition of strong executive judgment."
      }
    },
    {
      id: "customer_c2",
      title: "4. The Ultimate Metric: Customer Obsession",
      content: `
# Customer Obsession as Organizational Religion

At the highest echelons (VP/C-Suite), Customer Obsession is not a tactic; it is the fundamental operating system of the enterprise. You must demonstrate how you embed this obsession into the very DNA of the company's culture and metrics.

## Engineering the Culture
How do you ensure that an engineer 10 levels below you is making decisions aligned with the customer's best interest? 

## The Cultural Architecture Narrative
Your **Action** must detail the creation of pervasive feedback loops. Did you mandate that every executive must spend 2 days a year working in customer support? Did you re-architect the corporate OKRs so that engineering bonuses were tied strictly to customer-facing latency percentiles? Your **Result** demonstrates a fundamental shift in the company's culture, leading to unprecedented market dominance.
      `,
      vocabulary: [
        { word: "Pervasive", meaning: "Spreading widely throughout an area or a group of people." },
        { word: "Unprecedented", meaning: "Never done or known before." }
      ],
      fillInBlank: {
        sentenceParts: ["You must detail the creation of ", " feedback loops that lead to ", " market dominance."],
        missingWords: ["pervasive", "unprecedented"],
        wordBank: ["pervasive", "unprecedented", "hidden", "average"]
      },
      scenario: {
        scenario: "Engineering is hitting all their internal sprint goals, but customer churn is at an all-time high. As VP of Engineering, what is your action?",
        options: [
          "Celebrate the sprint goals; churn is a Sales problem.",
          "Radically re-architect the engineering OKRs to tie directly to customer churn and mandate direct engineer-to-customer feedback loops.",
          "Fire the bottom 10% of engineers.",
          "Hire more marketing people."
        ],
        answerIndex: 1,
        explanation: "C-Level leaders align the entire organizational incentive structure directly with the customer outcome."
      }
    },
    {
      id: "hire_develop_c2",
      title: "5. Organizational Gravity: Hire and Develop the Best",
      content: `
# Creating Organizational Gravity

Top-tier technology executives act as talent magnets. "Hire and Develop the Best" at this level means creating an organizational gravity that inevitably attracts world-class engineers who would otherwise start their own companies.

## The Magnetism Narrative
In a C-Level interview, you must articulate how you built a culture of engineering excellence that became renowned in the industry. 

## Establishing the Legacy
Your **Action** should describe your bold, unconventional strategies. Did you champion open-source initiatives that put your company on the map? Did you implement a "Principal Engineer track" that prevented top technical talent from being forced into management? The **Result** is a quantified influx of elite talent and a retention rate that defies industry averages.
      `,
      vocabulary: [
        { word: "Gravity", meaning: "Extreme or alarming importance; seriousness (or a force of attraction)." },
        { word: "Influx", meaning: "An arrival or entry of large numbers of people or things." }
      ],
      fillInBlank: {
        sentenceParts: ["You must create organizational ", " that results in an ", " of elite talent."],
        missingWords: ["gravity", "influx"],
        wordBank: ["gravity", "influx", "boredom", "exodus"]
      },
      scenario: {
        scenario: "Your best Principal Engineers are leaving to join startups because they hate managing people. How do you retain them?",
        options: [
          "Offer them a tiny raise.",
          "Force them to be managers anyway.",
          "Architect and implement a parallel 'Individual Contributor' career track with compensation and prestige equal to the VP level.",
          "Let them leave."
        ],
        answerIndex: 2,
        explanation: "Developing the best means creating institutional structures that reward elite technical talent without forcing them into management."
      }
    },
    {
      id: "deliver_results_c2",
      title: "6. Market Dominance: Deliver Results",
      content: `
# Delivering Ecosystem-Defining Results

At the C-Suite, delivering a product on time is table stakes. "Deliver Results" means successfully executing massive, multi-year initiatives that fundamentally alter the company's valuation and market position.

## The Bet-the-Company Narrative
You must narrate a time when you led a "bet-the-company" initiative. 

## The Execution Mechanism
Your **Action** should not focus on code, but on capital allocation, aggressive risk mitigation, and ruthless prioritization across a thousand-person organization. Detail how you maintained high standards and velocity over a multi-year horizon. The **Result** must be framed in terms of billions in revenue, total market disruption, or successfully pivoting the entire enterprise business model.
      `,
      vocabulary: [
        { word: "Mitigation", meaning: "The action of reducing the severity, seriousness, or painfulness of something." },
        { word: "Disruption", meaning: "Radical change to an existing industry or market due to technological innovation." }
      ],
      fillInBlank: {
        sentenceParts: ["Focus on aggressive risk ", " to achieve total market ", "."],
        missingWords: ["mitigation", "disruption"],
        wordBank: ["mitigation", "disruption", "creation", "stagnation"]
      },
      scenario: {
        scenario: "You are leading a 3-year, $500M cloud migration initiative. The board is getting anxious. How do you deliver results?",
        options: [
          "Tell them to wait 3 years for the final result.",
          "Architect the migration into quarterly deliverables that unlock tangible business value incrementally, ensuring continuous board confidence and risk mitigation.",
          "Cancel the migration to save money.",
          "Micromanage every single developer to make them code faster."
        ],
        answerIndex: 1,
        explanation: "Delivering massive results requires structuring the initiative to unlock incremental value and mitigate risk continuously."
      }
    },
    {
      id: "learn_curious_c2",
      title: "7. Existential Foresight: Learn and Be Curious",
      content: `
# Curiosity as a Corporate Survival Strategy

At the highest echelon, curiosity is what prevents the company from becoming obsolete. The C-Level "Learn and Be Curious" principle is about having the intellectual agility to abandon the cash cow when the paradigm shifts.

## Cannibalizing Your Own Business
Are you curious enough to invent the technology that will destroy your current business model before your competitors do? 

## The Disruption Narrative
Your **Situation** involves an incredibly successful legacy product. Your **Action** involves your relentless curiosity exposing an upcoming technological disruption. You then took the incredibly difficult step of convincing the board to invest heavily in this new, unproven technology, effectively cannibalizing your own legacy revenue. The **Result** is the company surviving the paradigm shift and dominating the next decade of the industry.
      `,
      vocabulary: [
        { word: "Agility", meaning: "Ability to move quickly and easily; ability to think and understand quickly." },
        { word: "Cannibalize", meaning: "Use (a machine) as a source of spare parts for another, similar machine (or in business, when a new product eats the sales of an old product)." }
      ],
      fillInBlank: {
        sentenceParts: ["Have the intellectual ", " to abandon the cash cow, even if it means you ", " your own legacy revenue."],
        missingWords: ["agility", "cannibalize"],
        wordBank: ["agility", "cannibalize", "sluggishness", "protect"]
      },
      scenario: {
        scenario: "Your company sells highly profitable DVD rentals. You notice a massive shift towards streaming internet video. What is the C-Level action?",
        options: [
          "Double down on DVD marketing because it is currently profitable.",
          "Ignore streaming because the quality is currently too low.",
          "Invest massively in building a streaming platform, willingly cannibalizing your highly profitable DVD business to ensure the company survives the paradigm shift.",
          "Sell the company immediately."
        ],
        answerIndex: 2,
        explanation: "True executive curiosity and foresight requires the courage to cannibalize current profits to secure the company's future."
      }
    }
  ]
};
