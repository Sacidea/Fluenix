import { Redis } from '@upstash/redis'

let redis: any

try {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL! || 'http://localhost:8080',
    token: process.env.UPSTASH_REDIS_REST_TOKEN! || 'dummy',
  })
} catch (e) {
  console.error('❌ Redis configuration failed')
  redis = null
}

export { redis }