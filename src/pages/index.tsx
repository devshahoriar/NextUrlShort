import img1 from '@/components/1.png'
import Header from '@/components/Header'
import Image from 'next/image'
import { useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { MdViewSidebar } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string>()
  const [url, setUrl] = useState<string>()
  const [noUrlError, setNoUrlError] = useState<string>()

  const _hendelShort = () => {
    setNoUrlError("")
    const regex =
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
    if (regex.exec(url as string)) {
      
    } else {
      setNoUrlError('Url not valid.')
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container px-2 h-full flex flex-col justify-center">
        <p className="text-third text-5xl font-bold z-30 md:text-6xl xl:text-8xl">
          When <br /> the shorter,
        </p>
        <div className="w-full bg-third bg-opacity-20 mt-8 rounded-md flex flex-col py-5 gap-4 relative md:flex-row md:items-center">
          <div className="flex gap-2 mx-2 z-30">
            <span className="h-7 w-7 bg-[#F16059] block rounded-full"></span>
            <span className="h-7 w-7 bg-[#FABF3F] block rounded-full"></span>
            <span className="h-7 w-7 bg-primary block rounded-full"></span>
            <span className="h-7 w-9 flex rounded-md justify-center items-center text-black bg-white ml-5">
              <BiLeftArrow />
            </span>
            <span className="h-7 w-9 flex rounded-md justify-center items-center text-black bg-white">
              <BiRightArrow />
            </span>
            <span className="h-7 w-9 flex rounded-md justify-center items-center text-black bg-white ml-5">
              <MdViewSidebar />
            </span>
          </div>
          <div className="bg-white bg-opacity-30 backdrop-blur-md mx-2 rounded-md flex gap-2 items-center py-2 z-30 flex-1">
            <span className="h-5 w-5 bg-third  block rounded-full ml-1 xl:ml-2"></span>
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="outline-none flex-1 mr-2 bg-white bg-opacity-50 rounded-sm xl:text-xl"
              placeholder="Your long Url : https://longlonglong.url/long/longggg?l=long"
            />
          </div>
          <div className="absolute right-0 top-[50%] w-52 -translate-y-1/2 md:w-64">
            <Image
              src={img1}
              alt="art"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div
          onClick={() => shortUrl && navigator.clipboard.writeText(shortUrl)}
          className="z-30 mt-3  h-7 cursor-pointer w-fit truncate max-w-full "
        >
          <Tooltip
            id="gg"
            place="right"
            className="!bg-third !z-50 !opacity-0 md:!opacity-100"
          />
          <p
            data-tooltip-id="gg"
            data-tooltip-content="Click to copy."
            className="underline text-secondry font-semibold hover:opacity-80"
          >
            {shortUrl}
          </p>
          <p className="text-[#FF0000]">{noUrlError}</p>
        </div>
        <p className="text-third text-5xl font-bold mt-3 z-30 md:text-6xl  xl:text-8xl">
          the better.
        </p>
        <button
          onClick={() => _hendelShort()}
          className="bg-secondry z-30 rounded-md mt-4 bg-opacity-75 text-xl py-3 backdrop-blur-sm text-white active:translate-y-1 md:w-60 xl:text-2xl md:bg-opacity-100 hover:bg-opacity-80"
        >
          Short
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  }
}
