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
      title: "6. Invent and Simplify",
      content: `
# Invent and Simplify

Amazon has a leadership rule called **Invent and Simplify**. Leaders must find new ideas. They must also make things easy. They look for good ideas everywhere. Sometimes, when you do something new, people will not understand you. That is okay.

## One Idea is Not Enough
Many companies start with one very good idea. Because of this idea, they become a real business. But later, it becomes very hard to find a new idea. Many companies just make very small changes to their first idea. 
In the technology world, things change very fast. If you do not invent new things, your company cannot stay successful. You must always reinvent yourself.

## Amazon's New Inventions
For 29 years, Amazon has tried hard to invent new things. Sometimes, they make completely new things from zero. For example, AWS (Cloud computing) or Alexa (a device that understands your voice). 

## Changing the Old Business
Other times, Amazon does not make something from zero. Instead, they completely change their old business. The Amazon Marketplace is a good example.
Many years ago, Amazon saw that customers liked eBay. On eBay, many different people could sell things. Amazon managers talked about this a lot. They asked: "Should we let other people sell things on Amazon?"
Many people at Amazon said no. They were worried. They said: "Will these other sellers be nice to our customers?" But they fought about it and finally decided to do it. Why? Because more choices and lower prices are always better for the customer.

## Failing Before Winning
But making the Marketplace was very hard. First, Amazon tried to build an "Auctions" website, just like eBay. It failed completely. Nobody used it.
Then, Amazon made a special place on the website called "Z-Shops" for other sellers. That failed too.
Finally, Amazon invented the "Single Detail Page". This means all sellers use the same page for one product. This was a huge success. They failed many times, but they did not stop inventing.
      `,
      vocabulary: [
        { word: "Invent", meaning: "To make or design something new." },
        { word: "Simplify", meaning: "To make something easy to understand or do." }
      ],
      fillInBlank: {
        sentenceParts: ["Amazon always tries to ", ". Sometimes they make completely ", " things, like Alexa."],
        missingWords: ["invent", "new"],
        wordBank: ["invent", "fail", "old", "new"]
      },
      scenario: {
        scenario: "Your team is using an old, slow process. You have a new, simple idea, but your team is scared to change. What do you do?",
        options: [
          "I do not share my idea because they are scared.",
          "I complain to the manager.",
          "I explain how the new idea will simplify our work and build a small test.",
          "I quit my job."
        ],
        answerIndex: 2,
        explanation: "Leaders find ways to simplify and are not afraid to suggest new inventions, even if others are hesitant."
      }
    },
    {
      id: "are_right_a_lot_a2",
      title: "7. Are Right, A Lot",
      content: `
# Are Right, A Lot

Amazon leaders make good choices. This rule is called **Are Right, A Lot**. Leaders have good instincts. They ask other people for their ideas. They also try to prove that their own ideas are wrong.

## Making the Right Choice
You can do many things right in your job. But if you make a bad choice about the customer experience, you will have a big problem. 
At Amazon, work is sometimes very confusing. There are many new things and many unknowns. There is a lot of "noise" (too much information). A leader must look through all the noise. They must find the "signal"—the true thing that is important for the customer.

## A Big Misunderstanding
When Amazon first made this rule, people misunderstood it. They thought: "If I am right a lot, my idea must always win." They thought they must always win every argument in a meeting.

But this is not true. The real goal is to find the best answer for the customer. It does not matter whose idea it is. It can be your idea, or your friend's idea.

## How to Find the Best Answer
To find the best answer, you need the right people in a room. You need them to give feedback. This is why good leaders often speak last in a meeting. They want to hear everyone else first. 

A good leader asks: "Is my idea really the best? Is there another way to do this? Can we do better for the customer?" They listen to different perspectives. Often, a leader does not need to speak at all. The team talks and finds the best answer together. A leader only cares about one thing: getting the best answer for the customer.
      `,
      vocabulary: [
        { word: "Confusing", meaning: "Hard to understand." },
        { word: "Argument", meaning: "When people disagree and talk angrily." }
      ],
      fillInBlank: {
        sentenceParts: ["It is not about your ", ". It is about finding the best answer for the ", "."],
        missingWords: ["ego", "customer"],
        wordBank: ["ego", "money", "customer", "winner"]
      },
      scenario: {
        scenario: "You are in a meeting. You have an idea, but your friend has a better idea for the customer. What do you do?",
        options: [
          "I argue until they choose my idea.",
          "I support my friend's idea because it is better for the customer.",
          "I stop talking and leave the room.",
          "I say my idea is still the best."
        ],
        answerIndex: 1,
        explanation: "The goal is the best outcome for the customer, not winning the argument."
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
# Principle: Invent and Simplify

The leadership principle **Invent and Simplify** means leaders expect innovation from their teams. They look for new ideas everywhere. They are not limited by thinking "we didn't invent this, so we won't use it." They also accept that when you do new things, people might misunderstand you for a long time.

## The Challenge of Reinvention
Many companies survive the startup stage because they have one great innovative idea. However, it becomes very difficult for them to invent something else. Instead of making new things, they just iterate and make small changes to the original idea. In a dynamic, fast-changing world, it is impossible to stay successful if you do not constantly reinvent yourself.

## Whole Cloth vs. Reinvention
Amazon has been very vigilant about inventing for 29 years. Sometimes this is "whole cloth" invention, which means creating something completely new from nothing, like AWS (cloud computing) or Alexa. 

Other times, it means completely reinventing an existing business. A great example is the Amazon Marketplace. In the late nineties, Amazon noticed customers were responding well to companies like eBay, which had third-party sellers. Amazon debated animatedly inside the company if they should allow third-party sellers too. 
People were resistant. They worried that third-party sellers would not take good care of the customers. Eventually, Amazon decided to build a marketplace because having a broader selection and lower prices is always better for the customer.

## The Struggle of Implementation
However, the implementation was very difficult. First, Amazon tried to build an auctions website like eBay. That was a "me too" offering that failed miserably. 
Then, they took all the third-party sellers and put them in a separate area called "Z-Shops." That failed too. 
Finally, they invented the "single detail page," where all sellers offer their product on the exact same page. This changed everything and became a massive success. They failed multiple times, but they never stopped trying to simplify the customer experience.
      `,
      vocabulary: [
        { word: "Iterate", meaning: "To do something again and again, usually to improve it." },
        { word: "Resistant", meaning: "Opposed to something; wanting to prevent it." }
      ],
      fillInBlank: {
        sentenceParts: ["In a fast-changing world, you must constantly ", " yourself. Amazon noticed customers liked eBay because of ", " sellers."],
        missingWords: ["reinvent", "third-party"],
        wordBank: ["reinvent", "third-party", "ignore", "slow"]
      },
      scenario: {
        scenario: "You suggest a new automated tool that will save time, but your coworkers say 'We have never done it that way.' How do you show Invent and Simplify?",
        options: [
          "I agree with them and keep using the manual process.",
          "I build a small prototype to prove the new tool works and simplifies our tasks.",
          "I tell them they are wrong and force them to use it.",
          "I ask HR to talk to them."
        ],
        answerIndex: 1,
        explanation: "Building a prototype shows innovation and provides proof that the new idea simplifies the work."
      }
    },
    {
      id: "are_right_a_lot_b1",
      title: "7. Principle: Are Right, A Lot",
      content: `
# Principle: Are Right, A Lot

The principle **Are Right, A Lot** is about having strong judgment. Leaders have good instincts. They seek diverse perspectives and actively work to disconfirm their own beliefs. 
In business, you can do many things right, but if you make the wrong decision on a key question for the customer experience, you will have a massive issue.

## Ambiguity and Finding the Signal
At Amazon, we operate in areas with high ambiguity. This means things are not clear and there are many unknowns. Whether we are inventing a new space or improving an old business, there is a lot of noise. You must be great at sifting through all the different noise to find the true signal—the core thing that really matters to customers.

## The Misinterpretation
When this principle was first introduced, people misunderstood it. They thought, "If I am right a lot, it means my idea must carry the day and win every debate." 
The reality is very different. We just want the best possible answer for the customer, whoever's idea it is. It is not about your ego or winning an argument.

## Seeking Diverse Perspectives
To get the best answer, leaders bring the right people into a room to give feedback. This is why leaders often speak last in meetings. They want everybody's input first. 
Often, leaders are questioning their own incoming opinions. They ask themselves: "Are my closely held beliefs really right? Is there another way to think about this? Can we do better for customers?" 
The key is to listen to different perspectives. In many of the best meetings, the leader never even has to express an opinion because the team sorts it out for themselves. The only thing that matters is getting to the best possible answer.
      `,
      vocabulary: [
        { word: "Judgment", meaning: "The ability to make good decisions." },
        { word: "Ambiguity", meaning: "A situation where things are not clear or have more than one meaning." }
      ],
      fillInBlank: {
        sentenceParts: ["In areas with high ", ", leaders must listen to different ", " before they speak."],
        missingWords: ["ambiguity", "perspectives"],
        wordBank: ["ambiguity", "noise", "perspectives", "money"]
      },
      scenario: {
        scenario: "You are leading a project meeting. What is the best way to show you 'Are Right, A Lot'?",
        options: [
          "Speak first and tell everyone what to do.",
          "Speak last, ask for feedback, and change your mind if someone has a better idea.",
          "Only invite people who agree with you.",
          "Never change your mind."
        ],
        answerIndex: 1,
        explanation: "Leaders speak last to gather diverse perspectives and ensure the best idea wins, not just their own."
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
# Invent and Simplify: A Deep Dive

Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by "not invented here." As we do new things, we accept that we may be misunderstood for long periods of time.

## Sustaining Success
For a lot of companies, they get through the startup stage and make it as a business on the strength of a great innovative idea. However, it actually becomes really difficult to invent something else new. They spend lots of time just iterating in small ways on that original invention. It's incredibly difficult to sustain success in a dynamic world if you're not constantly inventing and reinventing.

## The Marketplace Debate
Pioneering AWS and cloud computing is a good example of "whole cloth" invention. But in other cases, it's about reinventing an existing business. In the late nineties, Amazon noticed customers were responding well to companies like eBay that had third-party sellers offering a broad selection. 
Amazon debated very animatedly whether they should have a marketplace offering. People were resistant because Amazon had strong relationships with publishers, and they didn't believe third-party sellers would take care of customers as well as Amazon did. Eventually, they fought through this resistance and built the marketplace because having a broader selection and lower prices was ultimately better for customers.
      `,
      vocabulary: [
        { word: "Vigilant", meaning: "Keeping careful watch for possible danger or difficulties." },
        { word: "Animatedly", meaning: "Full of life, action, or spirit; passionately." }
      ],
      fillInBlank: {
        sentenceParts: ["People were ", " because they didn't believe third-party sellers would take care of customers. However, Amazon ", " through this to build the marketplace."],
        missingWords: ["resistant", "fought"],
        wordBank: ["happy", "resistant", "fought", "slept"]
      },
      scenario: {
        scenario: "You want to integrate an open-source library that solves a major problem, but your senior dev says 'We only use code we write ourselves (Not Invented Here)'. What do you say?",
        options: [
          "You are right, I will write it from scratch and waste 3 weeks.",
          "I will quietly use it and not tell anyone.",
          "I will explain that leaders look for new ideas everywhere and are not limited by 'not invented here', showing how it simplifies our architecture.",
          "I will escalate the issue to the CTO immediately."
        ],
        answerIndex: 2,
        explanation: "True leaders are externally aware and leverage external tools to simplify their internal architecture."
      }
    },
    {
      id: "are_right_a_lot_b2",
      title: "3. Judgment: Are Right, A Lot",
      content: `
# Judgment and Ambiguity

Leaders are right, a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs. This principle is very much a proxy for judgment. You can do a lot of things right, but if you make the wrong decisions on the key questions for customer experience, you will have an issue.

## Sifting Through the Noise
We operate in areas of high ambiguity. When we invent in a new space, or even when we improve an existing business, we are surrounded by noise. We have to be great at sifting through all the different noise and finding the signal—what really matters for customers.

## The Common Misinterpretation
When this principle was first put in place, people often got it wrong. They misinterpreted it and thought, "Well, if I'm really great at being right a lot, my idea has to be the one that carries the day in a debate."

The reality is that we are all trying to get to the best possible answer for customers, whoever's idea it is. We need to get the right people in a room to give feedback. This is often why, as leaders, we speak last in the room. We want everybody's input. The key is to listen to different perspectives, question your most closely held beliefs, and then think about the best answer.
      `,
      vocabulary: [
        { word: "Proxy", meaning: "A figure that can be used to represent the value of something in a calculation." },
        { word: "Sifting", meaning: "Examining something thoroughly so as to isolate that which is most important." }
      ],
      fillInBlank: {
        sentenceParts: ["We have to be great at ", " through all the different noise and finding the ", "."],
        missingWords: ["sifting", "signal"],
        wordBank: ["ignoring", "sifting", "signal", "problem"]
      },
      scenario: {
        scenario: "You are absolutely certain your database schema is correct, but a junior developer points out a potential flaw. What does 'Are Right, A Lot' require you to do?",
        options: [
          "Ignore the junior developer because you have more experience.",
          "Work to disconfirm your own beliefs by testing their theory.",
          "Tell them your idea must 'carry the day' in the debate.",
          "Change the schema immediately without testing."
        ],
        answerIndex: 1,
        explanation: "Leaders actively work to disconfirm their beliefs and seek diverse perspectives."
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
# Invent and Simplify: The Amazon Philosophy

Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere and are not limited by "not invented here." As we do new things, we accept that we may be misunderstood for long periods of time.

## The Dilemma of the Startup
So for a lot of companies who actually make it as a company, they get through the startup stage and make it on the strength of a great innovative idea. However, for a lot of those companies, it actually becomes really difficult to invent something else new and they spend lots of time just iterating in small ways on that original invention idea. And it's actually difficult to sustain being successful in a dynamic world how fast technology changes if you're not constantly inventing and reinventing.

## Whole Cloth vs. Reinvention
Over 29 years, Amazon has been very vigilant and very strong at continuing to invent and simplify. In some cases, it's been whole cloth invention—pioneering AWS and cloud computing, or a device that does natural language understanding like Alexa.

And in many other cases, what we've done instead of whole cloth invention, is just completely reinvented our existing business and the customer experience associated with it. A really good example is our marketplace business. In the late nineties, being externally aware, we noticed customers were responding well to companies like eBay and half.com that had third-party sellers offering broad selection and a variety of price points. 

We debated very animatedly inside the company whether we should have a marketplace offering. People were resistant in part because we had set up relationships with distributors and publishers, and we didn't know whether they would be keen on us allowing third-party sellers. We also couldn't really believe that anybody else would take care of customers as well as we did. Eventually, we decided we were going to build a marketplace offering because having much broader selection and lower prices was better for customers.
      `,
      vocabulary: [
        { word: "Whole cloth", meaning: "Made entirely from nothing; completely new." },
        { word: "Pioneering", meaning: "Involving new ideas or methods; being the first to do something." }
      ],
      fillInBlank: {
        sentenceParts: ["Instead of whole cloth invention, we completely ", " our existing business. We debated very ", " inside the company."],
        missingWords: ["reinvented", "animatedly"],
        wordBank: ["destroyed", "reinvented", "animatedly", "quietly"]
      },
      scenario: {
        scenario: "As an engineering leader, you propose a radical architectural shift. The board warns you that the market won't understand it and it might drop the stock price temporarily. How do you align this with Invent and Simplify?",
        options: [
          "Cancel the project to protect the stock price.",
          "Water down the innovation so it's easier to explain.",
          "Proceed with the shift, accepting that as we do new things, we may be misunderstood for long periods of time.",
          "Keep the architecture exactly as it is to avoid risk."
        ],
        answerIndex: 2,
        explanation: "The principle explicitly states: 'As we do new things, we accept that we may be misunderstood for long periods of time.'"
      }
    },
    {
      id: "are_right_a_lot_c1",
      title: "3. The Judgment Proxy: Are Right, A Lot",
      content: `
# Are Right, A Lot: A Proxy for Judgment

Leaders are right, a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs. 

So the "Are Right, A Lot" leadership principle is very much a proxy for judgment. And the truth is that you can do a lot of things right, but if you make the wrong decisions on really the key questions we have to answer for ourselves—for customer experience in the business—you're going to have an issue.

## Operating in High Ambiguity
And we operate in high areas of ambiguity in many of the businesses that Amazon pursues. We're the first market or we're inventing in that space. Or even when we built a business that works well, we're constantly trying to figure out how to keep changing and improving the customer experience. So we always deal in areas that have lots of ambiguity, lots of noise around it. And we have to be great at this company at sifting through all the different noise and finding the signal and what really matters for customers.

## Misinterpreting the Principle
And I remember when we first put this leadership principle in place, people often got it wrong and what people misinterpreted was they thought, "Well, if I'm really great at the leadership principle of being right a lot, it means when we're debating something, my idea has to be the one that carries the day because after all, I would be right a lot."

And the reality is what we're all trying to do is to get to the best possible answer for customers, whoever's idea it is. What we need to do when we're thinking about a hard issue is we need to get the right people in a room to give feedback. It's often why as leaders, we speak last in the room. We want everybody's input. We are seeking to try and find a different way. I often question my most closely held beliefs on a particular topic to see, are they really right? Is there another way to think about it?
      `,
      vocabulary: [
        { word: "Proxy", meaning: "A figure that can be used to represent the value of something in a calculation." },
        { word: "Disconfirm", meaning: "To show that a belief or hypothesis is not true." }
      ],
      fillInBlank: {
        sentenceParts: ["People misinterpreted the principle, thinking their idea had to ", " the day. In reality, leaders work to ", " their own beliefs."],
        missingWords: ["carry", "disconfirm"],
        wordBank: ["carry", "disconfirm", "lose", "verify"]
      },
      scenario: {
        scenario: "You have a strong instinct about a product launch strategy. How do you apply 'Are Right, A Lot'?",
        options: [
          "Push the strategy through rapidly because your instincts are usually right.",
          "Actively seek out dissenting opinions and data that disconfirms your instinct before proceeding.",
          "Let a junior member make the decision to avoid blame.",
          "Delay the launch indefinitely until ambiguity reaches zero."
        ],
        answerIndex: 1,
        explanation: "Leaders with strong judgment actively work to disconfirm their beliefs by seeking diverse perspectives."
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

## The Marketplace Implementation Struggle
I think over the 29 years that we've started, Amazon thus far, we have been very vigilant and very strong at continuing to invent and simplify across our business. And in some cases, it's been whole cloth invention, like pioneering AWS.

And in many other cases, what we've done instead of whole cloth invention, is just completely reinvented our existing business. A really good example of that is our marketplace business. In the late nineties, being externally aware, we noticed customers were responding well to companies like eBay and half.com. We debated very animatedly inside the company whether we should have a marketplace offering. The reasons people were resistant were in part because of our relationships with publishers, and we didn't know whether they would be keen on us allowing third-party sellers. We also couldn't really believe that anybody else would take care of customers as well as we did. And so we really fought this and eventually we decided that we were going to build a marketplace offering. Because at the end of the day, having much broader selection and lower prices was better for customers. And we're always going to shade on what we think customers want most.

Then we really struggled with the right implementation. What we started with was trying to build an auctions website like eBay. That was a complete 'me too' offering that failed miserably. Then we said, OK, we'll take all our third-party seller selection and we'll put it in a separate area of our website called Z-Shops. And that failed too. Finally, we invented the single detail page, which changed everything.
      `,
      vocabulary: [
        { word: "Me too offering", meaning: "A product created simply to match a competitor, lacking unique value." },
        { word: "Attrition", meaning: "The process of gradually reducing the strength or effectiveness of someone or something." }
      ],
      fillInBlank: {
        sentenceParts: ["We tried to build an auctions website like eBay, but that was a complete '", "' offering that failed ", "."],
        missingWords: ["me too", "miserably"],
        wordBank: ["me too", "innovative", "miserably", "happily"]
      },
      scenario: {
        scenario: "You launch a highly anticipated feature, but it fails miserably like Amazon's Auctions. What is the executive C-level approach to this failure according to the principle?",
        options: [
          "Fire the engineering team responsible for the implementation.",
          "Cover up the failure and pretend it was a limited test.",
          "Accept the failure, iterate rapidly, and pivot the implementation mechanism (like moving from Auctions to Z-Shops to Single Detail Page) without abandoning the core customer obsession.",
          "Revert to the original business model and stop inventing."
        ],
        answerIndex: 2,
        explanation: "Failure in implementation (like Auctions or Z-Shops) is an acceptable part of the invention process. Leaders pivot the mechanism while maintaining the goal."
      }
    },
    {
      id: "are_right_a_lot_c2",
      title: "3. Strategic Judgment: Are Right, A Lot",
      content: `
# Executive Judgment: Are Right, A Lot

Leaders are right, a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.

So the right a lot leadership principle is very much proxy for judgment. And the truth is that you can do a lot of things right, but if you make the wrong decisions on really the key questions we have to answer for ourselves—for customer experience in the business—you're going to have an issue.

## Sifting Signal from Noise in Ambiguity
We operate in high areas of ambiguity in many of the businesses that Amazon pursues. We're the first market or we're inventing in that space. Or even when we built a business that works well, we're constantly trying to figure out how to keep changing and improving the customer experience. So we always deal in areas that have lots of ambiguity, lots of noise around it. And we have to be great at this company at sifting through all the different noise and finding the signal and what really matters for customers.

## The Paradigm Shift in Debate
I remember when we first put this leadership principle in place, people often got it wrong and what people misinterpreted was they thought, "well, if I'm really great at the leadership principle of being right a lot, it means when we're debating something, my idea has to be the one that carries the day because after all, I would be right a lot."

And the reality is what we're all trying to do is we're trying to get to the best possible answer for customers, whoever's idea it is. And so what we need to do when we're thinking about a hard issue is we need to get the right people in a room to give feedback. It's often why as leaders, we speak last in the room. We want everybody's input. A lot of times in those meetings, what leaders are doing is questioning their incoming opinion, and they're seeking to try and find a different way. 

I often question my most closely held beliefs on a particular topic to see, are they really right? Is there another way to think about it? Can we do better for customers? The key is to get the right people involved in giving feedback, listen to the different perspectives, and then think about what is the best possible answer. In many of the best meetings I'm in, I never even have to express an opinion. The team has sorted it out for themselves. All we care about as leaders is getting to the best possible answer. That's our job.
      `,
      vocabulary: [
        { word: "Paradigm shift", meaning: "A fundamental change in approach or underlying assumptions." },
        { word: "Ambiguity", meaning: "The quality of being open to more than one interpretation; inexactness." }
      ],
      fillInBlank: {
        sentenceParts: ["In areas with lots of ambiguity and noise, leaders must be great at sifting to find the ", ". To do this, leaders actively work to ", " their most closely held beliefs."],
        missingWords: ["signal", "disconfirm"],
        wordBank: ["signal", "disconfirm", "noise", "protect"]
      },
      scenario: {
        scenario: "As a VP, you host a strategy meeting. Your team arrives at a brilliant solution that completely contradicts the strategy you prepared. What is the appropriate executive action?",
        options: [
          "Veto the team's solution because it undermines your authority.",
          "Adopt the team's solution without expressing your original opinion, because the goal is the best customer outcome.",
          "Compromise by mixing both strategies, even if it dilutes the impact.",
          "Fire the team members who opposed your strategy."
        ],
        answerIndex: 1,
        explanation: "As stated: 'In many of the best meetings I'm in, I never even have to express an opinion. The team has sorted it out for themselves.'"
      }
    }
  ]
};
