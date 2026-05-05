export interface BehavioralQuestion {
  id: string;
  category: string; // e.g. "Ownership", "Conflict Resolution", "Failure"
  question: string;
  context: string;
  tips: string[];
}

export const behavioralQuestions: BehavioralQuestion[] = [
  {
    id: "star-1",
    category: "Handling Failure (Ownership)",
    question: "Tell me about a time you made a significant mistake or caused a production issue. How did you handle it?",
    context: "FAANG companies want to see if you take ownership of mistakes without blaming others. They look for how quickly you mitigated the issue, what the root cause was, and how you prevented it from happening again.",
    tips: [
      "Situation: Describe the system and what went wrong.",
      "Task: What was your responsibility in that moment?",
      "Action: Detail the exact technical and communicative steps you took to fix it.",
      "Result: What was the outcome? Did you write a post-mortem? Did you add new CI/CD checks?"
    ]
  },
  {
    id: "star-2",
    category: "Conflict Resolution (Earn Trust)",
    question: "Describe a situation where you completely disagreed with a senior engineer or manager about a technical decision.",
    context: "This tests 'Disagree and Commit' and 'Earn Trust'. They want to see how you handle technical disagreements using data, not ego.",
    tips: [
      "Situation: What was the technical disagreement?",
      "Task: What was the goal you were both trying to achieve?",
      "Action: How did you present your case? (e.g., wrote a design doc, ran benchmarks).",
      "Result: How was it resolved? Did you win? If not, how did you commit to their idea?"
    ]
  },
  {
    id: "star-3",
    category: "Initiative (Bias for Action)",
    question: "Tell me about a time you saw a problem that wasn't your responsibility, but you stepped in to fix it anyway.",
    context: "Testing 'Bias for Action' and 'Ownership'. Engineers who only do their Jira tickets aren't FAANG material. They want proactive problem solvers.",
    tips: [
      "Situation: What was the broken process, tech debt, or issue you noticed?",
      "Task: Why was it important to fix? What was the risk of ignoring it?",
      "Action: How did you fix it while still doing your main job?",
      "Result: What was the quantifiable impact? (e.g., saved 10 hours a week for the team)."
    ]
  },
  {
    id: "star-4",
    category: "Tight Deadlines (Deliver Results)",
    question: "Tell me about a time you had to deliver a critical project under an impossibly tight deadline.",
    context: "Testing 'Deliver Results'. How do you prioritize? Do you cut scope, work 100 hours, or communicate risk?",
    tips: [
      "Situation: What was the project and why was the deadline so tight?",
      "Task: What was your exact role in delivering it?",
      "Action: How did you prioritize features? Did you negotiate scope? What technical shortcuts did you consciously take?",
      "Result: Did you launch on time? What was the business impact?"
    ]
  },
  {
    id: "star-5",
    category: "Deep Dive (Technical Depth)",
    question: "Give me an example of a time you had to dive deep into a complex, unfamiliar codebase or system to solve a critical bug.",
    context: "Testing 'Dive Deep'. Can you handle legacy code or undocumented systems without giving up?",
    tips: [
      "Situation: What was the critical bug and why was the system unfamiliar?",
      "Task: What was the specific technical challenge in finding the root cause?",
      "Action: What tools did you use? (e.g., strace, profilers, reading logs). How did you isolate the bug?",
      "Result: What was the fix and how much did it improve the system?"
    ]
  }
];
