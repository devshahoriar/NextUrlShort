/* eslint-disable react-hooks/rules-of-hooks */
import Header from '@/components/Header'
import LoginButton from '@/components/LoginButton'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import img2 from '@/components/2.png'
import { useRouter } from 'next/router'
import { getProviders, signIn } from 'next-auth/react'
import { useEffect } from 'react'

const login = () => {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const providers = await getProviders()
      console.log(providers)
    }
    run()
  }, [])

  const { success } = router.query
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col h-full px-4 !z-30">
        <p className="text-third text-5xl font-bold z-30 md:text-6xl xl:text-8xl mt-20 md:mt-32">
          Sign In With Email
        </p>
        <div className="mt-10 md:w-80">
          <form>
            <input
              type="email"
              placeholder="Email"
              className="block outline-none text-third bg-third bg-opacity-30 placeholder:text-white my-6 px-2 py-2 rounded-md w-full backdrop-blur-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="block outline-none text-third bg-third bg-opacity-30 placeholder:text-white my-6 px-2 py-2 rounded-md w-full backdrop-blur-lg"
            />
            <button
              type="submit"
              className="bg-secondry text-white px-5 py-2 rounded-md hover:bg-opacity-90 active:translate-y-1"
            >
              Sign In
            </button>
            {success && <h1 className="mt-3 text-[green]">Account Created!</h1>}
          </form>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <LoginButton
            onClick={() => signIn('google', { callbackUrl: '/' })}
            icon={<FcGoogle />}
          >
            Google
          </LoginButton>
          <LoginButton
            onClick={() => signIn('github', { callbackUrl: '/' })}
            icon={<FaGithub />}
          >
            Github
          </LoginButton>
        </div>
      </div>

      <div className="fixed -right-10  w-96 bottom-0 md:right-20 xl:right-40">
        <Image src={img2} alt="art" className="object-cover h-full w-full" />
      </div>
    </div>
  )
}

export default login
