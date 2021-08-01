import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import config from '../config/config'
import * as gtag from '../lib/gtag'
import AnalyticsProvider from '../context/analytics'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <AnalyticsProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
            <title>{config.clientName}</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <ToastContainer />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AnalyticsProvider>
    </>
  )
}
export default MyApp
