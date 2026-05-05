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
      id: "invent_simplify_a2",
      title: "2. Invent and Simplify",
      content: `
# Invent and Simplify

Amazon has a rule called **Invent and Simplify**. Leaders must find new ideas and make things easy. 

## One Idea is Not Enough
Many companies start with one good idea. But later, it is very hard to find a new idea. In the technology world, things change very fast. If you do not invent new things, your company will fail. You cannot just use your first idea forever.

## Amazon's Inventions
Amazon always tries to invent. Sometimes they make completely new things, like AWS (Cloud) or Alexa. 
Other times, they change old things. For example, Amazon saw that customers liked buying from other sellers on eBay. Amazon managers talked about this a lot. They were worried. Would other sellers be nice to the customers? But they decided to do it because it was good for the buyers. They wanted lower prices and more choices for the customer.
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
      id: "invent_simplify_b1",
      title: "2. Principle: Invent and Simplify",
      content: `
# Invent and Simplify

The leadership principle **Invent and Simplify** means leaders expect innovation from their teams. They look for new ideas everywhere and they accept that people might misunderstand them at first.

## The Challenge of Reinvention
Many companies survive the startup stage because they have one great innovative idea. However, it becomes very difficult to invent something else. Instead of making new things, they just iterate and make small changes to the original idea. In a fast-changing world, you must constantly reinvent yourself to stay successful.

## Whole Cloth vs. Reinvention
Amazon has been very vigilant about inventing for 29 years. Sometimes this is "whole cloth" invention, which means creating something completely new from nothing, like AWS (cloud computing) or Alexa. 
Other times, it means reinventing an existing business. For example, Amazon noticed customers liked eBay because of third-party sellers. Amazon debated animatedly if they should allow third-party sellers too. People were resistant because they worried about customer service. Eventually, they decided to build a marketplace because broader selection and lower prices are better for the customer.
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
    }
  ],

  B2: [
    {
      id: "invent_simplify_b2",
      title: "1. The Challenge of Constant Invention",
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
    }
  ],

  C1: [
    {
      id: "invent_simplify_c1",
      title: "1. Executive Principle: Invent and Simplify",
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
    }
  ],

  C2: [
    {
      id: "invent_simplify_c2",
      title: "1. Advanced Corporate Strategy: Invent and Simplify",
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
    }
  ]
};
