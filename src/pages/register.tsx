/* eslint-disable react-hooks/rules-of-hooks */
import img2 from '@/components/2.png'
import Header from '@/components/Header'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface Res {
  message: string
  success: boolean
}

const register = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [error, setError] = useState<string>()
  const router = useRouter()
  const _hendelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill all the fields.')
      return
    }

    try {
      const { data }: { data: Res } = await axios({
        method: 'POST',
        url: '/api/auth/register',
        data: {
          email,
          pass: password,
        },
      })
      if (data.success) router.push('/login?success=true')
    } catch (error:any) {
      setError(error.response.data.message || 'Something went wrong.')
    }
  }
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container flex flex-col h-full px-4 !z-30">
        <p className="text-third text-5xl font-bold z-30 md:text-6xl xl:text-8xl mt-20 md:mt-32">
          Sign Up
        </p>
        <div className="mt-10 md:w-80">
          <form onSubmit={_hendelSubmit}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="block outline-none text-third bg-third bg-opacity-30 placeholder:text-white my-6 px-2 py-2 rounded-md w-full backdrop-blur-lg"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
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
            <h1 className="mt-5 text-[red]">{error}</h1>
          </form>
        </div>
      </div>

      <div className="fixed -right-10  w-96 bottom-0 md:right-20 xl:right-40">
        <Image src={img2} alt="art" className="object-cover h-full w-full" />
      </div>
    </div>
  )
}

export default register
