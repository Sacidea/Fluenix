export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
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
      `
    }
  ]
};
