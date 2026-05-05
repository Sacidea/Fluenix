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

Amazon and big tech companies use the **STAR method**. It helps you answer questions well.

## What is STAR?
* **S is for Situation.** You talk about the problem. Where were you working? Keep it short.
* **T is for Task.** You talk about your job. What did you need to do to fix the problem?
* **A is for Action.** You talk about the steps you took. Say "I did this", not "We did this".
* **R is for Result.** What happened after your action? Use numbers if you can (like "I saved 10 hours").
      `
    },
    {
      id: "action",
      title: "2. The 'Action' Phase",
      content: `
# Focus on Your Actions

In the STAR method, the **Action** part is the most important. You must spend 50% of your time here.

## Use "I", not "We"
Many engineers say "We fixed the bug." This is bad for interviews. The manager wants to know what **you** did. 

## Talk about technical details
* Did you write a new script?
* Did you restart the server?
* Did you talk to the customer?

Always explain *how* you solved the problem.
      `
    },
    {
      id: "ownership",
      title: "3. Leadership: Ownership",
      content: `
# Taking Ownership

Amazon has a rule called **Ownership**. This means you take care of the product like it is yours.

## Don't say "It was not my job"
Good engineers help even if it is not their task. If you see a broken code, you fix it. 

## Making mistakes
If you break production, do not hide it. Say:
1. "I made a mistake."
2. "I fixed it quickly."
3. "I wrote a test so it does not happen again."
      `
    },
    {
      id: "customer",
      title: "4. Leadership: Customer Obsession",
      content: `
# Customer Obsession

Big tech companies love customers. You must show that you care about the users.

## How to show it
When an interviewer asks you a question, think about the user.
* "I noticed the app was slow for the users."
* "I changed the design because users were confused."

Always put the customer first in your stories.
      `
    },
    {
      id: "failure",
      title: "5. Handling Failure",
      content: `
# How to Talk About Failure

Interviewers will ask: "Tell me about a time you failed." Do not say "I never fail." Everyone fails.

## The right way to answer
* Choose a real failure.
* Explain why it happened.
* Explain how you fixed it.
* Explain what you learned from it.

Learning from a mistake is very good. It shows you are growing.
      `
    }
  ],

  B1: [
    {
      id: "intro",
      title: "1. Mastering the STAR Method",
      content: `
# Mastering the STAR Method

Big tech companies like Amazon expect you to use the **STAR method** in interviews. It is a way to structure your answers clearly.

## The STAR Breakdown
* **Situation:** Explain the context. "During a server migration, the database crashed." Keep this brief.
* **Task:** What was your specific responsibility? Explain your goal.
* **Action:** Detail the exact steps **you** took. Use "I" instead of "We".
* **Result:** What was the final outcome? Use data. "I reduced the load time by 30%."
      `
    },
    {
      id: "action",
      title: "2. Nailing the 'Action' Section",
      content: `
# The Core of Your Answer: Action

The **Action** section should be the longest part of your story. Interviewers want to hear about your problem-solving skills.

## What to include
Instead of saying "I fixed the database", explain the process:
* "I checked the error logs."
* "I found a missing index."
* "I added the index and tested it."

## Avoid the "We" trap
It is great to be a team player. But in an interview, they are hiring *you*, not your team. Always highlight your personal contributions.
      `
    },
    {
      id: "ownership",
      title: "3. Principle: Ownership",
      content: `
# Showing True Ownership

**Ownership** is a key Amazon Leadership Principle. Leaders don't say "that's not my job."

## Beyond your daily tasks
To show ownership, talk about a time you fixed a problem that nobody asked you to fix. For example, if you saw old, messy code and you cleaned it up during your free time.

## Owning mistakes
If you cause a bug, own it. Explain how you fixed it and how you created an automated test to prevent it from happening again.
      `
    },
    {
      id: "customer",
      title: "4. Principle: Customer Obsession",
      content: `
# Customer Obsession in Tech

Even backend engineers need to care about the customer. Customer Obsession means working backwards from what the user needs.

## Examples in interviews
If you are asked about a technical decision, relate it to the user experience.
* "I chose to cache the data because users were waiting 5 seconds for the page to load."
* "I built a new API because the mobile team needed faster data."

Always connect your code to a real human benefit.
      `
    },
    {
      id: "failure",
      title: "5. Discussing Past Failures",
      content: `
# The "Failure" Question

"Tell me about a time you failed." This is a classic behavioral question. 

## A safe structure
1. **Be honest:** Choose a real technical or project failure.
2. **Take responsibility:** Don't blame your manager or the client.
3. **Show the fix:** How did you recover the situation?
4. **The lesson:** This is the most important part. What new process did you create because of this failure?
      `
    }
  ],

  B2: [
    {
      id: "intro",
      title: "1. The STAR Framework Guide",
      content: `
# The STAR Method: A Guide for Software Engineers

The **STAR method** is the standard framework required for behavioral interviews at FAANG companies. It ensures your responses are structured and focused.

## The STAR Framework Explained
* **Situation:** Set the scene efficiently. Briefly explain the specific project or outage. Focus on the scale and criticality.
* **Task:** Define the challenge. Clearly state what you were responsible for.
* **Action:** This is the most critical part (about 60% of your time). Detail the specific technical steps **you** took. 
* **Result:** Explain the quantifiable outcome. Use metrics (e.g., "reduced latency by 20%").
      `
    },
    {
      id: "action",
      title: "2. Deep Dive: The Action Phase",
      content: `
# Articulating Your Technical Actions

When describing your **Actions**, you must strike a balance between high-level strategy and low-level technical details.

## The "I" vs "We" Dilemma
While software engineering is collaborative, using "We" too often dilutes your personal impact. Interviewers need to know exactly what you coded, designed, or communicated.

## Technical Depth
Don't just say "I optimized the database." Say, "I analyzed the slow query logs, identified a missing compound index, and ran a migration which reduced query time from 2 seconds to 50 milliseconds." This proves your technical competence.
      `
    },
    {
      id: "ownership",
      title: "3. Leadership: Ownership & Bias for Action",
      content: `
# Demonstrating Ownership and Bias for Action

Amazon evaluates candidates heavily on **Ownership** and **Bias for Action**.

## Proactive Problem Solving
Ownership means looking beyond your Jira tickets. Did you notice a recurring deployment error and write a script to automate it? That is Bias for Action.

## Handling Production Incidents
When things go wrong, an owner steps up. If you caused an outage, explain how you led the incident response, communicated with stakeholders, and wrote a thorough blameless post-mortem to improve system resilience.
      `
    },
    {
      id: "customer",
      title: "4. Leadership: Customer Obsession",
      content: `
# Technical Customer Obsession

Many engineers think they don't interact with customers. But your "customer" might be another internal team, a developer using your API, or the end-user.

## Working Backwards
When answering system design or behavioral questions, always start with the customer's pain point. 
"Our frontend team (my customer) was struggling with inconsistent data structures, so I designed a GraphQL layer to standardize their queries."

Connecting architectural choices to user experience is the hallmark of a senior engineer.
      `
    },
    {
      id: "failure",
      title: "5. Navigating the Failure Question",
      content: `
# The Anatomy of a Good Failure Story

Interviewers ask about failure to test your humility, self-awareness, and resilience.

## The Recipe for Success
1. **The Mistake:** Describe a time you made a poor technical choice or missed a deadline.
2. **The Impact:** Be transparent about the negative consequences.
3. **The Pivot:** How did you mitigate the damage?
4. **The Systemic Change:** What did you change in your workflow, CI/CD pipeline, or team communication to guarantee it never happens again? (e.g., "I implemented strict branch protection rules").
      `
    }
  ],

  C1: [
    {
      id: "intro",
      title: "1. FAANG STAR Methodology",
      content: `
# Comprehensive Guide to the STAR Method

In top-tier engineering interviews, technical proficiency alone is insufficient. The **STAR method** is the universally mandated framework designed to extract high-fidelity signals about your alignment with corporate values.

## Deconstructing the Framework
* **Situation:** Establish the context with precision. Outline the architectural landscape or the business criticality without getting bogged down in extraneous details.
* **Task:** Delineate your specific mandate. What was the existential threat to the deliverable?
* **Action:** Elaborate on the deliberate engineering decisions, architectural trade-offs, and concrete execution steps **you** spearheaded.
* **Result:** Articulate the resolution using empirical, quantifiable metrics.
      `
    },
    {
      id: "action",
      title: "2. Executing the Action Phase",
      content: `
# Engineering Nuance in the Action Phase

The Action phase is where you validate your seniority. Interviewers are listening for your ability to navigate ambiguity and make calculated trade-offs.

## Highlighting Trade-offs
A senior engineer doesn't just implement the "best" solution; they implement the most pragmatic one. Detail why you chose a NoSQL database over a relational one. Discuss the constraints you faced (time, budget, technical debt) and how you navigated them.

## Isolating Your Impact
Ruthlessly eliminate the word "we" when describing critical decisions. If you led a team, explain your leadership actions: "I mentored the junior developers, unblocked their PRs, and established the testing conventions."
      `
    },
    {
      id: "ownership",
      title: "3. Ownership at Scale",
      content: `
# Systemic Ownership and Initiative

At the C1 level, **Ownership** transcends individual tasks. It means taking responsibility for systemic health and team culture.

## Identifying Architectural Decay
Discuss a scenario where you identified latent architectural decay (e.g., a tightly coupled legacy service) and proactively conceptualized an elegant, scalable solution. How did you convince management to allocate resources to this non-feature work?

## The Blameless Culture
If discussing a failure, emphasize how you fostered a blameless culture during the post-mortem. True owners focus on systemic safeguards—like implementing circuit breakers or better telemetry—rather than finding a scapegoat.
      `
    },
    {
      id: "customer",
      title: "4. Customer Obsession & Invent",
      content: `
# Customer Obsession as an Architectural Driver

For Staff and Senior engineers, **Customer Obsession** is an architectural driver. 

## Empathy in Engineering
Illustrate how qualitative user feedback or quantitative telemetry directly influenced a major refactoring effort. 
"By analyzing our latency percentiles, I realized our p99 users in Asia were experiencing severe timeouts. I orchestrated a multi-region read-replica strategy to optimize their experience."

## Invent and Simplify
Pair customer obsession with "Invent and Simplify." How did you abstract complex, messy backend logic into a seamless, intuitive API for your internal integration teams?
      `
    },
    {
      id: "failure",
      title: "5. Leveraging Failure for Systemic Growth",
      content: `
# Leveraging Catastrophe for Growth

When a senior engineer fails, the blast radius is often large. Interviewers want to see how you handle immense pressure.

## The Narrative Arc
Detail a catastrophic outage or a failed product launch. 
1. Avoid defensive posturing; objectively state where your judgment lapsed.
2. Detail the immediate incident response (e.g., rolling back deployments, applying hotfixes).
3. Conclude with the systemic paradigm shifts you instituted. Did you introduce chaos engineering? Did you mandate stricter SLA monitoring? The failure must be a catalyst for institutional growth.
      `
    }
  ],

  C2: [
    {
      id: "intro",
      title: "1. Executive Behavioral Frameworks",
      content: `
# Mastering Behavioral Assessments at the Principal Level

For Staff and Principal engineering roles, behavioral interviews are the definitive hurdle. The **STAR method** is not merely a conversational heuristic; it is a rigorous, analytical framework utilized by evaluators to extrapolate your systemic impact and architectural foresight.

## The Anatomy of a High-Signal Narrative
* **Situation:** Frame the paradigm, the scale of the infrastructure, and the exact catalyst (e.g., a cascading failure across microservices).
* **Task:** Crystallize your strategic mandate. What was the existential threat to the deliverable?
* **Action:** You must elucidate the nuanced architectural trade-offs, the empirical justification for your decisions, and the exact execution vectors **you** drove across multiple cross-functional teams.
* **Result:** Conclude with definitive, quantifiable infrastructural impact (e.g., "yielded a 3x throughput optimization and a $150K reduction in annualized AWS expenditure").
      `
    },
    {
      id: "action",
      title: "2. The Complexity of the Action",
      content: `
# Navigating Multi-Dimensional Execution

At the Principal level, your actions rarely involve just writing code. Your "Action" narrative must encompass organizational influence, cross-team alignment, and macroscopic architectural pivots.

## Driving Consensus
Elucidate how you navigated friction constructively. When faced with decentralized, autonomous teams using disparate tech stacks, how did you drive a unified architectural standard? Mention specific artifacts: RFCs, architecture decision records (ADRs), and proof-of-concepts.

## The Illusion of "We"
Even as an architectural lead orchestrating a 50-person department, you must isolate your agency. Focus on your strategic interventions: "I redefined the SLA parameters," or "I vetoed the monolithic migration in favor of the strangler fig pattern based on my risk assessment."
      `
    },
    {
      id: "ownership",
      title: "3. Existential Ownership",
      content: `
# Embodying Existential Ownership

Principal engineers exhibit a level of **Ownership** that borders on founder-level mentality. They identify systemic rot before it impacts the bottom line.

## Overhauling Paradigms
Narrate instances where you proactively identified impending bottlenecks in a hyper-growth environment. Did you foresee that the current database sharding strategy would fail at 10x scale? How did you evangelize the preemptive rewrite against extreme pushback from product management?

## Fostering Resilience
Discuss how you championed operational excellence. Describe your implementation of advanced observability matrices, chaos engineering protocols, and strict error-budgeting to fundamentally alter the engineering culture of your organization.
      `
    },
    {
      id: "customer",
      title: "4. Customer Obsession via Architecture",
      content: `
# Translating Customer Needs into Distributed Systems

At the highest echelon, **Customer Obsession** is indistinguishable from visionary product engineering. 

## Anticipatory Architecture
You must demonstrate the ability to anticipate customer needs before they manifest as feature requests. 
"Recognizing that enterprise clients would eventually demand data sovereignty, I architected our new data pipeline to support seamless, dynamic multi-tenant isolation from day one, which secured three major contracts."

## Disagree and Commit
When customer empathy conflicts with engineering purity, how do you resolve it? Detail a scenario where you compromised on architectural elegance to deliver critical, timely value to the market, showcasing a pragmatic bias for action.
      `
    },
    {
      id: "failure",
      title: "5. Institutional Learning from Failure",
      content: `
# Institutionalizing the Post-Mortem

When a Principal engineer discusses failure, the stakes are typically organizational or existential.

## The Paradigm Shift
Describe a multi-million dollar miscalculation, a failed multi-year migration, or a catastrophic security vulnerability. 
The focus should entirely be on the institutional learning. How did you spearhead the root-cause analysis without breeding a culture of fear? How did you transform a massive failure into an operational turning point for the entire engineering division, perhaps by writing new organizational mandates or overhauling the CI/CD deployment paradigms globally?
      `
    }
  ]
};
