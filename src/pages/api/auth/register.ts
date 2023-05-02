import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '../../../../prisma/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  const { email, pass } = req.body
  if (email && pass) {
    const hash = bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
    try {
      await prisma.user.create({
        data: {
          email: email,
          pass: hash,
        },
      })
      res.status(200).json({ message: 'User created', success: true })
      return
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' })
      return
    }
  }


}
