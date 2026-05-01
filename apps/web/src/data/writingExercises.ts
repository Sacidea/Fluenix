export type WritingExerciseId = 'pr_description' | 'commit_message' | 'email'

export interface WritingMission {
  id: string
  title: string
  context: string
  referenceData: string
}

export interface WritingExercise {
  id: WritingExerciseId
  label: string
  icon: string
  desc: string
  color: string
  bg: string
  border: string
  missions: WritingMission[]
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
    missions: [
      {
        id: 'pr_auth',
        title: 'Implement JWT Authentication',
        context: 'You added JWT-based authentication to the Node.js API, including login/register endpoints and bcrypt password hashing. Write a professional PR description explaining the changes and security choices.',
        referenceData: `diff --git a/src/auth.ts b/src/auth.ts
+ import jwt from 'jsonwebtoken';
+ import bcrypt from 'bcrypt';
+ 
+ export const login = async (req, res) => {
+   const user = await db.findUser(req.body.email);
+   if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
+     return res.status(401).send("Unauthorized");
+   }
+   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
+   res.json({ token });
+ }`
      },
      {
        id: 'pr_perf',
        title: 'Optimize Database Queries',
        context: 'You removed an N+1 query problem in the user feed endpoint by implementing Dataloader. The response time dropped from 800ms to 45ms. Write a PR description highlighting the performance win.',
        referenceData: `diff --git a/src/feed.ts b/src/feed.ts
- const posts = await db.getPosts();
- for (let post of posts) {
-   post.author = await db.getUser(post.authorId); // N+1 Issue
- }
+ const posts = await db.getPosts();
+ const authorIds = posts.map(p => p.authorId);
+ const authors = await userLoader.loadMany(authorIds);
+ posts.forEach((post, i) => post.author = authors[i]);`
      }
    ]
  },
  {
    id: 'commit_message',
    label: 'Commit Message',
    icon: 'GitCommit',
    desc: 'Write a clear commit message',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    border: '#bae6fd',
    missions: [
      {
        id: 'commit_cache_bug',
        title: 'Fix Image Caching Bug',
        context: 'You fixed a bug where the user profile image was not updating after upload due to aggressive CDN caching. Write a proper git commit message following conventional commits format.',
        referenceData: `Jira Ticket: PROJ-842
User reports: "I upload a new profile picture, but the old one still shows."
Root Cause: The S3 upload service wasn't sending the cache-invalidation header to CloudFront.
Fix: Added CacheControl: 'max-age=0' to the S3 putObject parameters.`
      },
      {
        id: 'commit_typo',
        title: 'Fix Typo in Environment Variables',
        context: 'The staging environment crashed because a variable was named DATABASE_ULR instead of DATABASE_URL. Write a conventional commit message for this hotfix.',
        referenceData: `diff --git a/docker-compose.staging.yml b/docker-compose.staging.yml
-      - DATABASE_ULR=postgres://user:pass@db:5432/main
+      - DATABASE_URL=postgres://user:pass@db:5432/main`
      }
    ]
  },
  {
    id: 'email',
    label: 'Technical Email',
    icon: 'Mail',
    desc: 'Write a professional tech email',
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#a7f3d0',
    missions: [
      {
        id: 'email_delay',
        title: 'Postpone Deployment',
        context: 'You need to inform your team that the production deployment scheduled for Friday has been postponed to Monday because QA found a critical bug in the payment module. Write a professional email.',
        referenceData: `To: Engineering Team, Product Managers
Topic: Production Deployment Delay
Reason: Critical bug in Stripe Webhook handler causing duplicate charges.
Action: Hotfix being developed today. Deployment pushed to Monday 10:00 AM.`
      },
      {
        id: 'email_api_deprecation',
        title: 'API Deprecation Notice',
        context: 'You need to notify third-party clients that the v1 API will be deprecated in 6 months. They need to migrate to the new v2 GraphQL API. Write a polite but firm notice email.',
        referenceData: `To: API Consumers
Topic: v1 REST API Deprecation
Timeline: 6 months (Sunset date: Nov 1st)
Alternative: v2 GraphQL API is now stable. Documentation linked.`
      }
    ]
  }
]
