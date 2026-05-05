export interface VocabularyWord {
  word: string;
  meaning: string;
}

export interface ReadingQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  vocabulary: VocabularyWord[];
  questions: ReadingQuestion[];
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
      questions: [
        {
          question: "Which part of the STAR method is the most important?",
          options: ["Situation", "Task", "Action", "Result"],
          answerIndex: 2,
          explanation: "The Action part is where you show the interviewer exactly what YOU did to solve the problem."
        }
      ]
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

## Communication is an Action
Sometimes, talking is an action. If you had to call the DevOps team in the middle of the night, that is an action. If you wrote an email to the customer to say sorry, that is an action. Do not forget to include these soft skills in your story.
      `,
      vocabulary: [
        { word: "Details", meaning: "Small pieces of information about something." },
        { word: "Score", meaning: "The number of points a candidate gets in a test or interview." }
      ],
      questions: [
        {
          question: "Why should you say 'I' instead of 'We'?",
          options: ["Because 'We' is bad grammar.", "Because the manager wants to know your specific contribution.", "Because team players are not hired at Amazon.", "Because 'I' makes the story shorter."],
          answerIndex: 1,
          explanation: "Interviewers need to evaluate your specific skills, not the skills of your team."
        }
      ]
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
      questions: [
        {
          question: "What should you do if you break the production server?",
          options: ["Hide the mistake.", "Blame the team.", "Take the blame and fix it.", "Ignore it."],
          answerIndex: 2,
          explanation: "A true owner takes responsibility for mistakes and focuses on finding a solution."
        }
      ]
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
      questions: [
        {
          question: "How can a backend developer show Customer Obsession?",
          options: ["By talking on the phone with customers.", "By ignoring the database.", "By writing fast code so the user does not wait.", "By writing complex code."],
          answerIndex: 2,
          explanation: "Even if you don't talk to customers, your code's performance directly affects their experience."
        }
      ]
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
      questions: [
        {
          question: "What does it mean to 'raise the bar' when hiring?",
          options: ["To hire someone very quickly.", "To hire someone who increases the team's average quality.", "To hire someone who is a beginner.", "To lower expectations."],
          answerIndex: 1,
          explanation: "Raising the bar means adding someone who elevates the overall standard of the team."
        }
      ]
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
* **Situation (Durum):** Explain the context of your story. For example, "During a server migration last month, our main database crashed." Keep this part brief. Provide enough detail so the interviewer understands the scale of the problem, but don't waste time on unnecessary background information.
* **Task (Görev):** What was your specific responsibility? Explain the goal you were trying to achieve. "As the lead backend developer, I had to identify the root cause and restore the data without losing any customer transactions."
* **Action (Aksiyon):** This is the core of your answer. Detail the exact steps **you** took to solve the problem. Explain your thought process and the technical decisions you made.
* **Result (Sonuç):** What was the final outcome? Try to use data and metrics. For example, "I restored the database in 15 minutes and reduced the load time by 30%." Tell them what you learned from the experience.
      `,
      vocabulary: [
        { word: "Predictor", meaning: "Something that can show what will happen in the future." },
        { word: "Metrics", meaning: "Numbers and data used to measure success." }
      ],
      questions: [
        {
          question: "Why do interviewers ask about your past behavior?",
          options: ["Because they want to know your personal life.", "Because past behavior is the best predictor of future success.", "Because they want to check your memory.", "Because they want to find your mistakes."],
          answerIndex: 1,
          explanation: "Companies believe that how you handled a situation in the past is how you will handle a similar situation if hired."
        }
      ]
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

Furthermore, explain *why* you chose that action. In software engineering, there are always trade-offs. Did you choose a fast temporary fix because the system was down? Or did you choose a slower, permanent fix? Explain your reasoning to show maturity.
      `,
      vocabulary: [
        { word: "Trade-off", meaning: "A balance achieved between two desirable but incompatible features." },
        { word: "Architecture", meaning: "The complex structure or design of a software system." }
      ],
      questions: [
        {
          question: "What should you do instead of just saying 'I fixed the database'?",
          options: ["Say 'We fixed the database.'", "Talk about a different topic.", "Explain the exact technical process and reasoning you used.", "Skip to the Result section."],
          answerIndex: 2,
          explanation: "Interviewers need to hear your technical depth and the trade-offs you considered during your decision-making."
        }
      ]
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
      questions: [
        {
          question: "How can you demonstrate Ownership outside of your daily tasks?",
          options: ["By leaving exactly at 5 PM.", "By fixing an issue or updating documentation even if nobody asked you to.", "By only doing the tasks assigned by your manager.", "By telling someone else to fix it."],
          answerIndex: 1,
          explanation: "Ownership means acting on behalf of the entire company, not just doing what is explicitly assigned to you."
        }
      ]
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
      questions: [
        {
          question: "Who are the 'customers' for a DevOps engineer?",
          options: ["Only people who buy the product.", "The CEO.", "Other developers inside the company who use their tools.", "Competitors."],
          answerIndex: 2,
          explanation: "In tech, your customer is anyone who consumes your work, including internal development teams."
        }
      ]
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
      questions: [
        {
          question: "According to the passage, what should you do if a candidate does not 'raise the bar'?",
          options: ["Hire them anyway if there is time pressure.", "Do not hire them under any circumstances.", "Hire them as an intern.", "Let the team vote."],
          answerIndex: 1,
          explanation: "The text emphasizes that you must never lower the hiring bar, even if you are under time pressure to deliver a project."
        }
      ]
    }
  ],

  B2: [
    {
      id: "intro",
      title: "1. The STAR Framework Guide",
      content: `
# The STAR Method: A Guide for Software Engineers

The **STAR method** is the standard framework required for behavioral interviews at FAANG companies like Amazon. It ensures your responses are highly structured, clear, and focused on demonstrating how your past experiences align with core leadership principles.

## The STAR Framework Explained
* **Situation (10%):** Set the scene efficiently. Briefly explain the specific project, architecture, or outage you were involved in. Focus on the scale and criticality of the scenario to establish the stakes.
* **Task (10%):** Define the challenge. Clearly state what you were responsible for and what the ultimate business or technical goal was.
* **Action (60%):** This is the most critical part of your narrative. Detail the specific, concrete technical steps **you** took to address the task. Emphasize your individual decision-making process, even when working in a cross-functional team.
* **Result (20%):** Explain the quantifiable outcome. Use specific metrics whenever possible (e.g., "reduced API latency by 20%," or "prevented 50 hours of manual work per month"). Crucially, if the outcome was a failure, share the post-mortem analysis and the systemic changes you implemented.
      `,
      vocabulary: [
        { word: "Quantifiable", meaning: "Able to be expressed or measured as a quantity." },
        { word: "Post-mortem", meaning: "An analysis or discussion of an event held soon after it has occurred, especially a failure." }
      ],
      questions: [
        {
          question: "What is the recommended time allocation for the 'Action' phase?",
          options: ["10%", "20%", "60%", "100%"],
          answerIndex: 2,
          explanation: "The Action phase should consume approximately 60% of your answer, as it demonstrates your specific problem-solving skills."
        }
      ]
    },
    {
      id: "action_deep_dive",
      title: "2. Deep Dive: The Action Phase",
      content: `
# Articulating Your Technical Actions

When describing your **Actions**, you must strike a delicate balance between high-level architectural strategy and low-level technical execution. Interviewers are looking for evidence of both technical depth and practical problem-solving.

## The "I" vs "We" Dilemma
While software engineering is inherently collaborative, using "We" too often dilutes your personal impact and creates a red flag for interviewers. They need to know exactly what you coded, what you designed, or who you influenced. Replace "We decided to use microservices" with "I advocated for a microservices architecture and wrote the initial proof-of-concept."

## Demonstrating Technical Depth
Avoid generic statements like "I optimized the database." Instead, provide the technical narrative: "I analyzed the slow query logs using AWS Performance Insights, identified a missing compound index on the users table, and ran a zero-downtime migration which reduced query time from 2 seconds to 50 milliseconds." This level of detail proves your technical competence and hands-on experience.
      `,
      vocabulary: [
        { word: "Articulating", meaning: "Expressing an idea or feeling fluently and coherently." },
        { word: "Dilute", meaning: "Make something weaker in force, content, or value." }
      ],
      questions: [
        {
          question: "Why is 'I optimized the database' considered a poor statement in an interview?",
          options: ["It lacks technical depth and specific narrative detail.", "It is too arrogant.", "It reveals company secrets.", "Databases cannot be optimized."],
          answerIndex: 0,
          explanation: "Interviewers need specific details, such as the tools used (AWS Performance Insights) and the specific fix (compound index)."
        }
      ]
    },
    {
      id: "ownership",
      title: "3. Leadership: Ownership & Bias for Action",
      content: `
# Demonstrating Ownership and Bias for Action

Amazon evaluates candidates heavily on **Ownership** and **Bias for Action**. Owners think long-term and do not sacrifice long-term value for short-term results. Speed matters in business, and many decisions are reversible, meaning they do not require extensive study.

## Proactive Problem Solving
Ownership means looking beyond the boundaries of your Jira tickets or sprint planning. Did you notice a recurring deployment error that was frustrating the team, and write a bash script to automate the resolution over the weekend? That demonstrates both Ownership (caring about the system's health) and Bias for Action (moving quickly to solve it without waiting for permission).

## Handling Production Incidents
When critical systems fail, an owner steps up immediately. If you caused an outage, explain how you led the incident response, effectively communicated the status to stakeholders, and subsequently wrote a thorough, blameless post-mortem to improve system resilience. Taking accountability without defensiveness is the hallmark of a mature engineer.
      `,
      vocabulary: [
        { word: "Reversible", meaning: "Able to be turned the other way or undone." },
        { word: "Resilience", meaning: "The capacity to recover quickly from difficulties; toughness." }
      ],
      questions: [
        {
          question: "What does 'Bias for Action' imply about decision making?",
          options: ["All decisions require months of study.", "Speed matters, and many decisions are reversible and don't require extensive study.", "You should never make decisions without your manager.", "You should act recklessly without thinking."],
          answerIndex: 1,
          explanation: "Bias for Action acknowledges that speed is crucial in business and that calculated risks are necessary when decisions are reversible."
        }
      ]
    },
    {
      id: "customer",
      title: "4. Leadership: Customer Obsession",
      content: `
# Technical Customer Obsession

Many backend or infrastructure engineers mistakenly believe they don't interact with customers. However, in modern tech organizations, your "customer" might be another internal development team, a third-party vendor using your API, or the ultimate end-user. Leaders start with the customer and work backwards.

## Working Backwards in System Design
When answering system design or behavioral questions, always ground your architectural choices in the customer's pain point. 
For example: "Our frontend team (my internal customer) was struggling with inconsistent data structures from our legacy REST APIs, which was slowing down their release cycle. Therefore, I designed and implemented a GraphQL federation layer to standardize their queries, reducing their integration time by half."

Connecting abstract architectural refactoring directly to a tangible improvement in user experience or developer velocity is what separates average coders from senior engineering leaders.
      `,
      vocabulary: [
        { word: "Federation", meaning: "A group of computing or routing systems acting as a single entity." },
        { word: "Tangible", meaning: "Perceptible by touch; clear and definite; real." }
      ],
      questions: [
        {
          question: "What is an example of 'Working Backwards' in system design?",
          options: ["Choosing GraphQL because it is a trendy technology.", "Starting with the customer's pain point and designing an architecture to solve it.", "Building a feature before checking if the customer wants it.", "Focusing entirely on competitors."],
          answerIndex: 1,
          explanation: "Working backwards means identifying the specific problem a customer is facing before selecting the technical solution."
        }
      ]
    },
    {
      id: "hire_develop",
      title: "5. Hire and Develop the Best",
      content: `
# Hire and Develop the Best

Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent and willingly move them throughout the organization to maximize their impact. As Amazon states, anybody who has been a part of building something world-class knows it's never the result of an individual—it requires a great team consisting of smart, inventive, and strategic people who exhibit high ownership.

## Maintaining the Hiring Bar
When participating in a hiring loop, you must constantly ask yourself and your team: "Does this candidate raise the bar?" If the answer is no, you should not hire them. Even under extreme time pressure to staff a critical project, lowering the hiring bar is a critical mistake. Working with people you respect and admire is essential for long-term success.

## The Responsibility of Development
The reality is that hiring is only half of the equation; the other half is developing people. As a leader or senior engineer, you must be organized and thoughtful about what a person does well and where they need to grow. In interviews, be prepared to discuss how you have actively mentored peers, conducted rigorous code reviews, or invented mechanisms (like internal training sessions) to elevate your team's overall capability.
      `,
      vocabulary: [
        { word: "Equation", meaning: "A situation or problem in which several factors must be taken into account." },
        { word: "Rigorous", meaning: "Extremely thorough, exhaustive, or accurate." }
      ],
      questions: [
        {
          question: "According to the 'Hire and Develop the Best' principle, what is true about building something world-class?",
          options: ["It is usually the result of one brilliant individual.", "It requires lowering the hiring bar to get more people fast.", "It is never the result of an individual; it requires a great team.", "It only requires good managers, not developers."],
          answerIndex: 2,
          explanation: "The text states that building something big, hard, and world-class is never the result of an individual, but of a great team."
        }
      ]
    }
  ],

  C1: [
    {
      id: "intro",
      title: "1. FAANG STAR Methodology",
      content: `
# Comprehensive Guide to the STAR Method

In top-tier engineering interviews, technical proficiency alone is insufficient to secure an offer. The **STAR method** is the universally mandated framework for behavioral rounds, meticulously designed to extract high-fidelity signals about your alignment with corporate values, such as Amazon's Leadership Principles.

## Deconstructing the Framework
* **Situation:** Establish the operational or architectural context with precision. Briefly outline the architectural landscape, the scale of the system, or the business criticality of the scenario without getting bogged down in extraneous details.
* **Task:** Delineate your specific strategic mandate. What was the existential threat to the deliverable, or what organizational objective were you tasked with resolving?
* **Action:** This constitutes the crux of your narrative. Elaborate on the deliberate engineering decisions, architectural trade-offs, and concrete execution steps **you** spearheaded to navigate ambiguity.
* **Result:** Articulate the resolution using empirical, quantifiable metrics. For instance, "My caching strategy slashed p99 latency by 45% and reduced infrastructure overhead by $20k annually." 
      `,
      vocabulary: [
        { word: "Proficiency", meaning: "A high degree of competence or skill; expertise." },
        { word: "Extraneous", meaning: "Irrelevant or unrelated to the subject being dealt with." }
      ],
      questions: [
        {
          question: "What is the primary purpose of the STAR method in top-tier interviews?",
          options: ["To test coding skills.", "To extract high-fidelity signals about your alignment with corporate values.", "To trick candidates.", "To evaluate your resume formatting."],
          answerIndex: 1,
          explanation: "Behavioral rounds use STAR to measure cultural fit and alignment with principles like ownership and customer obsession."
        }
      ]
    },
    {
      id: "action_deep_dive",
      title: "2. Executing the Action Phase",
      content: `
# Engineering Nuance in the Action Phase

The Action phase is the crucible where you validate your seniority. Interviewers are actively listening for your capacity to navigate ambiguity, manage competing priorities, and make calculated architectural trade-offs.

## Highlighting Trade-offs and Constraints
A senior engineer doesn't merely implement the theoretical "best" solution; they implement the most pragmatic one given the constraints. Detail exactly why you selected a NoSQL database over a relational one. Discuss the constraints you faced—whether it was impending deadlines, legacy technical debt, or budgetary limitations—and how you successfully navigated them without compromising system integrity.

## Isolating Your Impact and Influence
Ruthlessly eliminate the word "we" when describing critical inflection points in your narrative. If you led a cross-functional team, explain your specific leadership and influence mechanisms: "I mentored the junior developers, unblocked their PRs by rewriting the CI pipeline, and established the testing conventions that the entire department subsequently adopted."
      `,
      vocabulary: [
        { word: "Crucible", meaning: "A situation of severe trial, or in which different elements interact, leading to the creation of something new." },
        { word: "Pragmatic", meaning: "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations." }
      ],
      questions: [
        {
          question: "How does a senior engineer approach implementing solutions?",
          options: ["They always implement the theoretically perfect solution.", "They implement the most pragmatic solution given the constraints.", "They wait for the manager to decide.", "They copy solutions from previous companies."],
          answerIndex: 1,
          explanation: "Senior engineers must balance theory with real-world constraints like time, budget, and legacy technical debt."
        }
      ]
    },
    {
      id: "ownership",
      title: "3. Ownership at Scale",
      content: `
# Systemic Ownership and Initiative

At the C1 level, **Ownership** transcends individual tasks and sprint deliverables. It requires taking responsibility for systemic health, long-term architectural viability, and team culture. Owners do not sacrifice long-term value for short-term results.

## Identifying Architectural Decay
Discuss a scenario where you identified latent architectural decay—such as a tightly coupled legacy service that was silently degrading performance—and proactively conceptualized an elegant, scalable solution. Crucially, explain how you generated buy-in and convinced product management to allocate resources to this non-feature technical debt.

## Fostering a Blameless Culture
If discussing a catastrophic failure, emphasize how you fostered a blameless culture during the subsequent post-mortem. True owners focus on systemic safeguards—like implementing circuit breakers, automated rollbacks, or enhanced telemetry—rather than finding a scapegoat. They ensure the organization learns organically from the failure.
      `,
      vocabulary: [
        { word: "Transcends", meaning: "Goes beyond the range or limits of something." },
        { word: "Scapegoat", meaning: "A person who is blamed for the wrongdoings, mistakes, or faults of others." }
      ],
      questions: [
        {
          question: "What is a characteristic of fostering a blameless culture during a post-mortem?",
          options: ["Finding the individual who caused the outage and firing them.", "Focusing on systemic safeguards rather than finding a scapegoat.", "Hiding the details from management.", "Ignoring the outage completely."],
          answerIndex: 1,
          explanation: "True owners look for systemic flaws (like lack of circuit breakers) instead of blaming individuals for errors."
        }
      ]
    },
    {
      id: "customer",
      title: "4. Customer Obsession & Invent",
      content: `
# Customer Obsession as an Architectural Driver

For Staff and Senior engineers, **Customer Obsession** is not a marketing buzzword; it is a fundamental architectural driver. Leaders start with the customer and work backwards, earning and keeping customer trust.

## Empathy in Engineering Execution
Illustrate how qualitative user feedback or quantitative telemetry directly influenced a major refactoring effort. 
"By analyzing our latency percentiles, I realized our p99 users in Southeast Asia were experiencing severe database timeouts. Rather than patching the frontend, I orchestrated a multi-region read-replica strategy with eventual consistency to fundamentally optimize their experience."

## Invent and Simplify
Pair customer obsession with the principle to "Invent and Simplify." How did you abstract complex, messy backend orchestration logic into a seamless, intuitive API for your internal integration teams? True innovation often involves removing complexity rather than adding new features.
      `,
      vocabulary: [
        { word: "Telemetry", meaning: "The process of recording and transmitting the readings of an instrument." },
        { word: "Eventual consistency", meaning: "A model used in distributed computing to achieve high availability." }
      ],
      questions: [
        {
          question: "In the example provided, how did the engineer solve the severe database timeouts for users in Southeast Asia?",
          options: ["By adding a loading spinner to the frontend.", "By ignoring the p99 users.", "By orchestrating a multi-region read-replica strategy.", "By sending an apology email."],
          answerIndex: 2,
          explanation: "The engineer used architectural changes (multi-region read-replicas) to solve a fundamental latency issue for remote users."
        }
      ]
    },
    {
      id: "hire_develop",
      title: "5. Raising the Organizational Bar",
      content: `
# Hire and Develop the Best

Leaders are expected to raise the performance bar with every single hire and promotion. They must recognize exceptional talent and invent mechanisms for development. As Amazon dictates, building something world-class is never the result of an individual; it requires a team of people who are smart, inventive, strategic, and capable of diving deep into the details.

## The Imperative of the Hiring Bar
During hiring loops, the critical question is always: "Does this candidate raise the bar?" If the answer is no, a leader must unequivocally reject the candidate. Even under the immense pressure of tight project deadlines, lowering the hiring bar is an unacceptable compromise. Working with people you respect and admire is the foundation of a high-functioning engineering culture.

## Cultivating Leadership
The principle explicitly states that leaders develop leaders. As a senior individual contributor, your impact is measured not just by the code you write, but by the engineers you elevate. Be prepared to articulate your specific strategies for coaching others. Did you establish an internal engineering blog, lead architecture review boards, or design a structured mentorship program? You must demonstrate that you are organized and thoughtful about identifying what your peers do well and precisely what they need to grow.
      `,
      vocabulary: [
        { word: "Unequivocally", meaning: "In a way that leaves no doubt." },
        { word: "Curriculum", meaning: "The subjects comprising a course of study in a school or college." }
      ],
      questions: [
        {
          question: "How is the impact of a senior individual contributor measured according to the text?",
          options: ["Only by the lines of code they write.", "By how many hours they work.", "Not just by the code they write, but by the engineers they elevate.", "By the number of bugs they fix."],
          answerIndex: 2,
          explanation: "Senior contributors must demonstrate leadership by coaching, mentoring, and developing the peers around them."
        }
      ]
    }
  ],

  C2: [
    {
      id: "intro",
      title: "1. Executive Behavioral Frameworks",
      content: `
# Mastering Behavioral Assessments at the Principal Level

For Staff and Principal engineering echelons, behavioral interviews represent the definitive, high-stakes hurdle. The **STAR method** transcends its role as a mere conversational heuristic; it operates as a rigorous, analytical framework utilized by evaluators to extrapolate your macroscopic systemic impact, architectural foresight, and innate alignment with foundational paradigms like Amazon's Leadership Principles.

## The Anatomy of a High-Signal Narrative
* **Situation:** Establish the operational or architectural context with extreme concision. Frame the paradigm, the scale of the distributed infrastructure, and the exact systemic catalyst (e.g., a cascading failure across microservices threatening an SLA breach).
* **Task:** Crystallize your strategic mandate. What was the existential threat to the organizational deliverable, and what precise technical objective were you obligated to execute?
* **Action:** This is the analytical core. You must elucidate the nuanced architectural trade-offs, the empirical justification for your decisions, and the exact execution vectors **you** drove across decentralized teams.
* **Result:** Conclude with definitive, quantifiable business or infrastructural impact (e.g., "yielded a 3x throughput optimization and a $150K reduction in annualized operational expenditure").
      `,
      vocabulary: [
        { word: "Heuristic", meaning: "A practical approach to problem-solving or learning, typically not perfect but sufficient." },
        { word: "Elucidate", meaning: "Make something clear; explain." }
      ],
      questions: [
        {
          question: "At the Principal level, what does the STAR method primarily extrapolate?",
          options: ["Your ability to write boilerplate code.", "Your macroscopic systemic impact and architectural foresight.", "Your memorization of algorithms.", "Your formatting of resume."],
          answerIndex: 1,
          explanation: "Evaluators use STAR to assess large-scale influence, leadership alignment, and deep architectural capabilities at executive levels."
        }
      ]
    },
    {
      id: "action_deep_dive",
      title: "2. The Complexity of the Action",
      content: `
# Navigating Multi-Dimensional Execution

At the Principal level, your actions rarely involve merely writing code in isolation. Your "Action" narrative must comprehensively encompass organizational influence, cross-team alignment, and macroscopic architectural pivots.

## Driving Consensus Amidst Friction
Elucidate how you navigated friction constructively. When faced with decentralized, autonomous engineering pods utilizing disparate tech stacks, how did you drive a unified architectural standard? Mention specific high-leverage artifacts: RFCs, comprehensive architecture decision records (ADRs), and targeted proof-of-concepts used to dismantle opposition through empirical data.

## The Illusion of "We"
Even as an architectural lead orchestrating a 50-person department, you must ruthlessly isolate your agency. Focus explicitly on your strategic interventions: "I redefined the global SLA parameters," or "I vetoed the monolithic migration in favor of the strangler fig pattern based on my rigorous risk assessment." Diffusing credit into "the team" dilutes the specific leadership signal interviewers are actively trying to extract.
      `,
      vocabulary: [
        { word: "Disparate", meaning: "Essentially different in kind; not allowing comparison." },
        { word: "Strangler fig pattern", meaning: "A software architecture pattern for migrating from a legacy system to a new system." }
      ],
      questions: [
        {
          question: "How should a Principal engineer handle describing teamwork in an interview?",
          options: ["Give all credit to the team.", "Ruthlessly isolate their personal agency and strategic interventions.", "Pretend they worked completely alone.", "Complain about the team's inefficiency."],
          answerIndex: 1,
          explanation: "While teamwork is acknowledged, the interviewer must understand your specific architectural decisions and leadership impact."
        }
      ]
    },
    {
      id: "ownership",
      title: "3. Existential Ownership",
      content: `
# Embodying Existential Ownership

Principal engineers exhibit a level of **Ownership** that borders on a founder-level mentality. They identify systemic rot and architectural limitations years before they impact the bottom line, acting unequivocally on behalf of the entire enterprise.

## Overhauling Entrenched Paradigms
Narrate instances where you proactively identified impending bottlenecks in a hyper-growth environment. Did you foresee that the current database sharding topology would catastrophically fail at a projected 10x scale? Crucially, how did you evangelize the preemptive, multi-quarter rewrite against extreme pushback from product management, successfully aligning technical necessity with business continuity?

## Fostering Systemic Resilience
Discuss how you championed operational excellence at an organizational scale. Describe your implementation of advanced observability matrices, automated chaos engineering protocols, and strict error-budgeting policies to fundamentally alter the engineering culture and risk-tolerance of your division.
      `,
      vocabulary: [
        { word: "Evangelize", meaning: "Preach or advocate for a concept or paradigm enthusiastically." },
        { word: "Topology", meaning: "The way in which constituent parts are interrelated or arranged." }
      ],
      questions: [
        {
          question: "What is an example of 'founder-level mentality' in engineering?",
          options: ["Ignoring technical debt to ship features faster.", "Identifying and fixing systemic architectural rot years before it impacts the bottom line.", "Delegating all code reviews to juniors.", "Focusing only on UI improvements."],
          answerIndex: 1,
          explanation: "Existential ownership means possessing the foresight to prevent long-term systemic catastrophes."
        }
      ]
    },
    {
      id: "customer",
      title: "4. Customer Obsession via Architecture",
      content: `
# Translating Customer Needs into Distributed Systems

At the highest echelon, **Customer Obsession** is indistinguishable from visionary product engineering. Leaders work vigorously to earn and keep customer trust, utilizing customer needs to dictate the underlying architectural topologies.

## Anticipatory Architecture
You must demonstrate the ability to anticipate customer needs long before they manifest as explicit feature requests. 
"Recognizing that our enterprise clients would eventually mandate strict data sovereignty compliance, I architected our new asynchronous data pipeline to support seamless, dynamic multi-tenant isolation from day one. This proactive architecture subsequently secured three major government contracts."

## Disagree and Commit in Practice
When customer empathy conflicts with engineering purity, how do you resolve the dichotomy? Detail a scenario where you compromised on architectural elegance—perhaps incurring calculated technical debt—to deliver critical, timely value to the market, thereby showcasing a highly pragmatic bias for action and an unwavering commitment to the customer over dogma.
      `,
      vocabulary: [
        { word: "Dichotomy", meaning: "A division or contrast between two things that are or are represented as being opposed or entirely different." },
        { word: "Sovereignty", meaning: "Supreme power or authority; in tech, often referring to data jurisdiction." }
      ],
      questions: [
        {
          question: "What does resolving the dichotomy between customer empathy and engineering purity sometimes require?",
          options: ["Ignoring the customer to maintain perfect code.", "Incurring calculated technical debt to deliver critical value quickly.", "Quitting the project.", "Rewriting the entire application from scratch."],
          answerIndex: 1,
          explanation: "A pragmatic leader will prioritize the customer's immediate needs, even if it means sacrificing perfect architectural elegance temporarily."
        }
      ]
    },
    {
      id: "hire_develop",
      title: "5. Hire and Develop the Best",
      content: `
# Institutionalizing Excellence: Hire and Develop the Best

Leaders raise the performance bar with every hire and promotion. Building something world-class and complex is never the result of an individual; it necessitates a team composed of people who are smart, inventive, strategic, and obsessed with what matters to customers.

## The Uncompromising Hiring Bar
When participating in hiring loops or calibration meetings, the paramount question is: "Does this individual raise the bar?" If the answer is no, a hire must not be made. Even under intense time pressure to staff critical initiatives, lowering the bar degrades the organizational culture. The most important decision a leader makes is who they hire; it dictates the future trajectory of the business.

## Inventing Mechanisms for Development
The principle dictates that leaders take seriously their role in coaching others and actively invent mechanisms for development. As a Principal, your responsibility extends beyond ad-hoc mentorship. You must articulate how you have institutionalized growth. Did you design a comprehensive engineering onboarding curriculum? Did you establish a 'Career Choice' equivalent for your department? You must demonstrate a systematic, thoughtful approach to analyzing what individuals do well and orchestrating the necessary opportunities for them to scale their capabilities.
      `,
      vocabulary: [
        { word: "Paramount", meaning: "More important than anything else; supreme." },
        { word: "Ad-hoc", meaning: "Created or done for a particular purpose as necessary, not systematic." }
      ],
      questions: [
        {
          question: "What is expected of a Principal engineer regarding the development of others?",
          options: ["To provide occasional ad-hoc mentorship.", "To focus exclusively on their own code.", "To invent systemic mechanisms for development, like onboarding curricula.", "To fire anyone who makes a mistake."],
          answerIndex: 2,
          explanation: "At the highest levels, leaders must institutionalize growth by creating scalable systems (mechanisms) to develop talent."
        }
      ]
    }
  ]
};
