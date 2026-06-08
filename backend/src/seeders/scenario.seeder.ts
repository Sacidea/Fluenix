import { Prisma } from '@prisma/client'

export const DEFAULT_SCENARIO_MISSIONS: Prisma.RoleplayMissionCreateInput[] = [
  // Technical Interview
  { category: 'interview', level: 'B2', content: 'System Design: Design a highly available, scalable rate limiter for an API gateway.' },
  { category: 'interview', level: 'C1', content: 'Architecture: Explain the tradeoffs between microservices and a monolithic architecture for a fast-growing startup.' },
  { category: 'interview', level: 'B2', content: 'Algorithms: Optimize a Python function that finds the top K frequent elements in a massive 50GB log file.' },
  { category: 'interview', level: 'C1', content: 'Database: Design a database schema for a ride-sharing application like Uber, handling millions of concurrent location updates.' },
  
  // Daily Standup
  { category: 'standup', level: 'B1', content: 'Backend Sync: You are migrating a legacy payment service to Stripe. You are blocked by a CORS issue on the staging environment.' },
  { category: 'standup', level: 'B2', content: 'Frontend Sync: You just finished implementing React Server Components, but the build time increased by 40%. Explain your next steps.' },
  { category: 'standup', level: 'B2', content: 'DevOps Sync: The production Kubernetes cluster is experiencing OOM (Out of Memory) kills. Give a concise update on your investigation.' },
  { category: 'standup', level: 'B1', content: 'QA Sync: You found a critical regression in the authentication flow. Describe the issue and how you plan to write a regression test for it.' },
  
  // Code Review
  { category: 'code_review', level: 'B2', content: 'Database Migration: You wrote a PR to add a new column to a 50GB PostgreSQL table, but you didn\'t include CONCURRENTLY in your index creation.' },
  { category: 'code_review', level: 'C1', content: 'Security Flaw: The Senior Architect noticed your new API endpoint doesn\'t validate user roles before returning sensitive PII data.' },
  { category: 'code_review', level: 'B1', content: 'Performance Issue: You used an O(N^2) nested loop to process a dataset of 100,000 records. The reviewer rejected the PR.' },
  { category: 'code_review', level: 'B2', content: 'Code Smell: Your PR contains a 500-line god function. The reviewer asked you to refactor it using the Strategy Pattern.' }
]
