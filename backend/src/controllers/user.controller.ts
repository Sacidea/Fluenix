import { Request, Response } from 'express'
import { IUserService } from '../interfaces/IUserService'

export class UserController {
  constructor(private userService: IUserService) {}

  public getUser = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const user = await this.userService.getUser(userId)
      res.json(user)
    } catch (err) {
      console.error('getUser error:', err)
      const errMessage = err instanceof Error ? err.message : String(err)
      res.status(404).json({ error: 'Failed to get user', detail: errMessage })
    }
  }

  public updateLevel = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const { email, name, level } = req.body

      if (!email) {
        return res.status(400).json({ error: 'Email is required for syncing user' })
      }

      const updatedUser = await this.userService.syncUserWithLevel(userId, email, name, level)
      res.json(updatedUser)
    } catch (err) {
      console.error('updateLevel error:', err)
      const errMessage = err instanceof Error ? err.message : String(err)
      res.status(400).json({ error: 'Failed to update user level', detail: errMessage })
    }
  }
}

