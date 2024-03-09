import { Request, Response } from '@/helpers/middle.helper'

export const getDefault = (_req: Request, res: Response) =>
  res.status(200).json({ success: true, message: 'Hello World!' })
