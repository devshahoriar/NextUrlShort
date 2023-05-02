import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import 'react-tooltip/dist/react-tooltip.css'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
   return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
