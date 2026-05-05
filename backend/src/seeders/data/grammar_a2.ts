export const a2_exercises = [
  {
    title: 'Server Status Update',
    context: 'Messaging the team about the server.',
    level: 'A2',
    segments: [
      { text: "The server ", isClickable: false },
      { text: "are down", isClickable: true, isError: true, options: ["is down", "be down", "am down"], correctOption: "is down", explanation: "'The server' is singular (it), so we use the singular verb 'is'." },
      { text: " right now. I ", isClickable: false },
      { text: "will fix", isClickable: true, isError: false },
      { text: " it.", isClickable: false }
    ]
  },
  {
    title: 'Daily Meeting',
    context: 'Telling your manager what you do every day.',
    level: 'A2',
    segments: [
      { text: "Every morning, I ", isClickable: false },
      { text: "checks", isClickable: true, isError: true, options: ["check", "checking", "am check"], correctOption: "check", explanation: "For habits with 'I', we use the base form of the verb ('check' without 's')." },
      { text: " the error logs ", isClickable: false },
      { text: "before", isClickable: true, isError: false },
      { text: " the stand-up.", isClickable: false }
    ]
  },
  {
    title: 'Asking a Question',
    context: 'Asking a teammate how to run a project.',
    level: 'A2',
    segments: [
      { text: "How ", isClickable: false },
      { text: "you start", isClickable: true, isError: true, options: ["do you start", "are you start", "start you"], correctOption: "do you start", explanation: "In Present Simple questions, we use the helper verb 'do' before the subject (you)." },
      { text: " the local database ", isClickable: false },
      { text: "on your machine", isClickable: true, isError: false },
      { text: "?", isClickable: false }
    ]
  },
  {
    title: 'Past Action',
    context: 'Explaining what happened yesterday.',
    level: 'A2',
    segments: [
      { text: "Yesterday, I ", isClickable: false },
      { text: "find", isClickable: true, isError: true, options: ["found", "finded", "finding"], correctOption: "found", explanation: "'Find' is an irregular verb. Its past tense form is 'found'." },
      { text: " a big bug in the ", isClickable: false },
      { text: "login page", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  },
  {
    title: 'Simple Future Plan',
    context: 'Telling the team your plan for tomorrow.',
    level: 'A2',
    segments: [
      { text: "Tomorrow, we ", isClickable: false },
      { text: "are going deploy", isClickable: true, isError: true, options: ["are going to deploy", "go to deploy", "going to deploy"], correctOption: "are going to deploy", explanation: "For planned future actions, we use 'be going to + verb'." },
      { text: " the new version ", isClickable: false },
      { text: "to production", isClickable: true, isError: false },
      { text: ".", isClickable: false }
    ]
  }
];
