/* eslint-disable @next/next/no-img-element */
import { getServerSession, } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { signOut } from "next-auth/react"

const profile = ({ user }) => {

  return (
    <main className="h-screen w-full">
      <div className="container">
        <div className="w-full mt-24 flex flex-col justify-center items-center">
          <img
            src={
              user?.image
                ? user?.image
                : 'https://robohash.org/' + user?.name + '.png'
            }
            className="object-cover h-32 w-32 rounded-full border border-secondry"
            alt="User"
          />
          <h1 className='mt-5 text-2xl font-bold'>{user.name}</h1>
          <p>{user.email}</p>
          <button className='underline mt-3' onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: session.user,
    }, // will be passed to the page component as props
  }
}

export default profile
