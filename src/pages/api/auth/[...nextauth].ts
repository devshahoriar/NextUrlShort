import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
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
              console.log(user)
            }
            throw new Error('Use another sign in method')
          } catch (error) {}
        }

        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

        // if (user) {
        //   return user
        // } else {
        //   return null
        // }
      },
    }),
  ],
}
export default NextAuth(authOptions)
