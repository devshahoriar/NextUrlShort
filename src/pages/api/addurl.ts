// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ShortUniqueId from 'short-unique-id'
import prisma from '../../../prisma/db'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

type Data = {
  message?: string
  url?: any
  short?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
  const session: any = await getServerSession(req, res, authOptions)

  const { url } = req.body

  if (url) {
    const uid = new ShortUniqueId({ length: 6 })
    const urlId = uid()
    const d = {
      url: url,
      uid: urlId,
      ...(session?.user?.id && { userId: session.user.id }),
    }

    try {
      const saveUrl = await prisma.url.create({
        data: d,
      })
      res.json({ message: 'Url saved', url: saveUrl, short: saveUrl.uid })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.json({ message: 'No url provided' })
  }
}
