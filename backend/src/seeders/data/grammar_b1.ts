export const b1_exercises = [
  {
    title: 'Daily Standup Update',
    context: 'Slack message to your team during the morning standup.',
    level: 'B1',
    segments: [
      { text: "Hey team, I ", isClickable: false },
      { text: "am working", isClickable: true, isError: true, options: ["have been working", "was working", "worked"], correctOption: "have been working", explanation: "Use Present Perfect Continuous ('have been working') for an action that started in the past (Monday) and is STILL continuing right now." },
      { text: " on the Auth ticket ", isClickable: false },
      { text: "since Monday", isClickable: true, isError: false },
      { text: ". I expect ", isClickable: false },
      { text: "to finish", isClickable: true, isError: false },
      { text: " it by EOD.", isClickable: false }
    ]
  },
  {
    title: 'Deployment Status',
    context: 'Replying to a Project Manager about the release.',
    level: 'B1',
    segments: [
      { text: "The new feature ", isClickable: false },
      { text: "is deployed", isClickable: true, isError: true, options: ["has been deployed", "was deploying", "deploying"], correctOption: "has been deployed", explanation: "When announcing recent news or achievements, use the Present Perfect Passive ('has been deployed') rather than Present Simple Passive." },
      { text: " to the staging environment ", isClickable: false },
      { text: "successfully", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Bug Report',
    context: 'Writing a bug description in Jira.',
    level: 'B1',
    segments: [
      { text: "When the user clicks the button, the app ", isClickable: false },
      { text: "is crashing", isClickable: true, isError: true, options: ["crashes", "crashed", "has crashed"], correctOption: "crashes", explanation: "For general facts or repeated behaviors (like a bug that happens every time), use Present Simple ('crashes')." },
      { text: " consistently. I have attached ", isClickable: false },
      { text: "the logs", isClickable: true, isError: false },
      { text: " for reference.", isClickable: false }
    ]
  },
  {
    title: 'Asking for Help',
    context: 'Asking a colleague for help on Slack.',
    level: 'B1',
    segments: [
      { text: "Hey John, ", isClickable: false },
      { text: "can you to help", isClickable: true, isError: true, options: ["can you help", "could you to help", "are you help"], correctOption: "can you help", explanation: "Modal verbs like 'can', 'could', 'should' are followed by the base verb WITHOUT 'to'." },
      { text: " me debug this ", isClickable: false },
      { text: "weird issue", isClickable: true, isError: false },
      { text: " in the payment module?", isClickable: false }
    ]
  },
  {
    title: 'Code Review Response',
    context: 'Replying to a comment on your Pull Request.',
    level: 'B1',
    segments: [
      { text: "Thanks for the feedback. I ", isClickable: false },
      { text: "already fixed", isClickable: true, isError: true, options: ["have already fixed", "fix already", "am already fixing"], correctOption: "have already fixed", explanation: "With 'already', 'just', and 'yet', it is more natural to use the Present Perfect tense ('have already fixed') when referring to recent actions." },
      { text: " the typo in the ", isClickable: false },
      { text: "variable name", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Meeting Scheduling',
    context: 'Scheduling a pair programming session.',
    level: 'B1',
    segments: [
      { text: "Let's hop on a call ", isClickable: false },
      { text: "in Monday", isClickable: true, isError: true, options: ["on Monday", "at Monday", "by Monday"], correctOption: "on Monday", explanation: "Use the preposition 'on' for days of the week." },
      { text: " to discuss the ", isClickable: false },
      { text: "database migration", isClickable: true, isError: false },
      { text: " plan.", isClickable: false }
    ]
  },
  {
    title: 'Status Update',
    context: 'Updating the team on your progress.',
    level: 'B1',
    segments: [
      { text: "I haven't ", isClickable: false },
      { text: "finish", isClickable: true, isError: true, options: ["finished", "finishing", "to finish"], correctOption: "finished", explanation: "Present Perfect tense requires the past participle form of the verb ('have/has + past participle')." },
      { text: " writing the unit tests ", isClickable: false },
      { text: "yet", isClickable: true, isError: false },
      { text: ", but I will push them tomorrow.", isClickable: false }
    ]
  },
  {
    title: 'Explaining a Blocker',
    context: 'Explaining why a ticket is delayed.',
    level: 'B1',
    segments: [
      { text: "The ticket is delayed because I am waiting ", isClickable: false },
      { text: "the design team", isClickable: true, isError: true, options: ["for the design team", "on the design team", "to the design team"], correctOption: "for the design team", explanation: "The verb 'wait' is usually followed by the preposition 'for' when waiting for a person or thing." },
      { text: " to provide the ", isClickable: false },
      { text: "Figma assets", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Requesting Access',
    context: 'Asking DevOps for database access.',
    level: 'B1',
    segments: [
      { text: "Could you please give me ", isClickable: false },
      { text: "an access", isClickable: true, isError: true, options: ["access", "the accesses", "accessing"], correctOption: "access", explanation: "'Access' is an uncountable noun in this context, so it should not be preceded by 'an'." },
      { text: " to the production database? I need to ", isClickable: false },
      { text: "check some logs", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Suggesting a Solution',
    context: 'Proposing an idea in a Slack channel.',
    level: 'B1',
    segments: [
      { text: "Maybe we ", isClickable: false },
      { text: "can to use", isClickable: true, isError: true, options: ["could use", "can using", "could using"], correctOption: "could use", explanation: "Modal verbs like 'can', 'could', 'might' are followed by the base verb. 'Could use' is a polite way to suggest something." },
      { text: " Redis for caching to ", isClickable: false },
      { text: "improve performance", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Reporting a Typo',
    context: 'Notifying a colleague about a typo in the documentation.',
    level: 'B1',
    segments: [
      { text: "I noticed there is a typo ", isClickable: false },
      { text: "on the line 42", isClickable: true, isError: true, options: ["on line 42", "in the line 42", "at line 42"], correctOption: "on line 42", explanation: "We say 'on line X' without the article 'the' when referring to a specific line number." },
      { text: " of the Readme file. Should I create a ", isClickable: false },
      { text: "quick PR", isClickable: true, isError: false },
      { text: " to fix it?", isClickable: false }
    ]
  },
  {
    title: 'Confirming Understanding',
    context: 'Confirming requirements with a PM.',
    level: 'B1',
    segments: [
      { text: "Just to clarify, ", isClickable: false },
      { text: "we must to", isClickable: true, isError: true, options: ["we have to", "we must", "we need to"], correctOption: "we must", explanation: "The modal verb 'must' is followed directly by the base verb without 'to'." },
      { text: " implement the new tracking pixels before the ", isClickable: false },
      { text: "marketing campaign", isClickable: true, isError: false },
      { text: " launches, right?", isClickable: false }
    ]
  },
  {
    title: 'Apologizing for Delay',
    context: 'Apologizing for a late response.',
    level: 'B1',
    segments: [
      { text: "Sorry for the late reply. I ", isClickable: false },
      { text: "was being", isClickable: true, isError: true, options: ["was", "have been", "am"], correctOption: "was", explanation: "Use the simple past 'was' for a completed state in the past (being in a meeting)." },
      { text: " in a meeting with the client ", isClickable: false },
      { text: "all morning", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Describing a Feature',
    context: 'Explaining how a new feature works.',
    level: 'B1',
    segments: [
      { text: "This new endpoint allows users ", isClickable: false },
      { text: "download", isClickable: true, isError: true, options: ["to download", "downloading", "for downloading"], correctOption: "to download", explanation: "The verb 'allow' follows the pattern: allow + object + infinitive ('to download')." },
      { text: " their invoice history as a ", isClickable: false },
      { text: "PDF file", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Sharing a Link',
    context: 'Sharing a useful article on Slack.',
    level: 'B1',
    segments: [
      { text: "I found an interesting article about React performance. It explains how ", isClickable: false },
      { text: "we prevent", isClickable: true, isError: true, options: ["to prevent", "preventing", "prevent"], correctOption: "to prevent", explanation: "After 'how', we use the infinitive with 'to' ('how to prevent')." },
      { text: " unnecessary ", isClickable: false },
      { text: "re-renders", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Asking for Feedback',
    context: 'Asking a senior developer to review your code.',
    level: 'B1',
    segments: [
      { text: "Could you let me know if this approach makes ", isClickable: false },
      { text: "a sense", isClickable: true, isError: true, options: ["sense", "the sense", "senses"], correctOption: "sense", explanation: "The correct idiom is 'make sense', without any articles ('a' or 'the')." },
      { text: "? I'm not sure if it's the most ", isClickable: false },
      { text: "efficient way", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Discussing Timezones',
    context: 'Coordinating a meeting with a remote team.',
    level: 'B1',
    segments: [
      { text: "What time works best for you? I am available ", isClickable: false },
      { text: "in", isClickable: true, isError: true, options: ["at", "on", "by"], correctOption: "at", explanation: "We use the preposition 'at' for specific times on the clock (e.g., 'at 3 PM')." },
      { text: " 3 PM EST tomorrow. Let me know if that ", isClickable: false },
      { text: "works", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Reporting Progress',
    context: 'Updating a ticket in Jira.',
    level: 'B1',
    segments: [
      { text: "I have managed to fix the issue. The root cause ", isClickable: false },
      { text: "were", isClickable: true, isError: true, options: ["was", "is", "has been"], correctOption: "was", explanation: "'The root cause' is a singular noun, so the past tense verb should be singular ('was'), not plural ('were')." },
      { text: " a missing environment variable in the ", isClickable: false },
      { text: "Docker configuration", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Asking for Confirmation',
    context: 'Making sure you understand a requirement.',
    level: 'B1',
    segments: [
      { text: "Does this mean we need to support Internet Explorer 11? ", isClickable: false },
      { text: "I hope no", isClickable: true, isError: true, options: ["I hope not", "I don't hope", "I hope so"], correctOption: "I hope not", explanation: "The correct negative response using 'hope' is 'I hope not', not 'I hope no'." },
      { text: ", because it would add a lot of ", isClickable: false },
      { text: "complexity", isClickable: true, isError: false },
      { text: " to the CSS.", isClickable: false }
    ]
  },
  {
    title: 'Offering Help',
    context: 'Offering assistance to a new team member.',
    level: 'B1',
    segments: [
      { text: "Welcome to the team! If you have any questions about the codebase, don't hesitate ", isClickable: false },
      { text: "asking", isClickable: true, isError: true, options: ["to ask", "ask", "for asking"], correctOption: "to ask", explanation: "The verb 'hesitate' is followed by the infinitive form ('to ask')." },
      { text: " me. I'm happy to ", isClickable: false },
      { text: "help", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  }
]
