import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import bcrypt from 'bcryptjs'
import prisma from '../../../../prisma/db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@ss.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any

        if (email && password) {
          try {
            const user = await prisma.user.findUnique({
              where: {
                email: email,
              },
            })

            if (user?.pass === null) {
              throw new Error('Use another sign in method')
            }
            if (bcrypt.compareSync(password, user?.pass as string)) {
              const u: any = {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                image: user?.image,
              }

              return u
            } else {
              throw new Error('Wrong password')
            }
          } catch (error: any) {
            if (error.code === 'P2025') {
              throw new Error('User Not Found')
            }
            if (error.message) {
              throw new Error(error.message)
            }
            throw new Error('Something went wrong')
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: any
      user: any
      token: any
    }) {
      session.user.id = user?.id || token?.id

      return session
    },
    jwt({ token, user }: any) {
      if (user?.id) {
        token.id = user?.id || token?.sub
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
}


export default NextAuth(authOptions)
