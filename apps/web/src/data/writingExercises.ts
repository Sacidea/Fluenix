export type WritingExerciseId = 'pr_description' | 'commit_message' | 'email'

export interface WritingExercise {
  id: WritingExerciseId
  label: string
  icon: string
  desc: string
  color: string
  bg: string
  border: string
  prompt: string
}

export const writingExercises: WritingExercise[] = [
  {
    id: 'pr_description',
    label: 'PR Description',
    icon: 'GitPullRequest',
    desc: 'Write a pull request description',
    color: '#6366f1',
    bg: '#f5f7ff',
    border: '#c7d2fe',
    prompt: `You have just implemented a feature that adds user authentication using JWT tokens to a Node.js REST API. The changes include: new middleware for token validation, login/register endpoints, and password hashing with bcrypt. Write a professional PR description for this change.`,
  },
  {
    id: 'commit_message',
    label: 'Commit Message',
    icon: 'GitCommit',
    desc: 'Write a clear commit message',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    border: '#bae6fd',
    prompt: `You fixed a bug where the user profile image was not updating correctly after upload. The issue was in the image processing service — it was caching old URLs. Write a proper git commit message following conventional commits format.`,
  },
  {
    id: 'email',
    label: 'Technical Email',
    icon: 'Mail',
    desc: 'Write a professional tech email',
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#a7f3d0',
    prompt: `You need to inform your team that the production deployment scheduled for Friday has been postponed to Monday. The reason is that the QA team found a critical bug in the payment module. Write a professional email to your team.`,
  },
]
