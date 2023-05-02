/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Header = () => {
  const { data, status } = useSession()

  return (
    <header >
      <div className="container flex justify-between items-center my-6  p-2 md:p-0 sm:p-0">
        <Link href="/">
          <h1 className="text-primary text-3xl font-black xl:text-5xl">urls</h1>
        </Link>
        <div className="flex gap-2 md:gap-4">
          {status === 'authenticated' ? (
            <img
              src={data.user?.image as string}
              className="object-cover h-14 w-14 rounded-full"
              alt="User"
            />
          ) : (
            <>
              <Link
                href="/login"
                className="hover:bg-primary px-2 py-2 rounded-md hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:bg-primary px-2 py-2 rounded-md hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
