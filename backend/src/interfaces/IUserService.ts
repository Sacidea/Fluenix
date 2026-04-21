import { User } from '@prisma/client'

export interface IUserService {
  syncUserWithLevel(
    userId: string,
    email: string,
    name: string | undefined,
    level: string
  ): Promise<User>

  setLevel(userId: string, level: string): Promise<User>

  getUser(userId: string): Promise<User | { id: string; level: string }>
}
