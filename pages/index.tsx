import Head from 'next/head'
import React from 'react'
import Hero from '../components/home/Hero'
import Scholarship from '../components/home/Scholarship'
import Services from '../components/home/Services'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Layout from '../components/shared/Layout'
import NewsLetter from '../components/shared/NewsLetter'
import RecentArticles from '../components/shared/RecentArticles'
import config from '../config/config'

export default function Home() {
  return (
    <>
      <Head>
        <title>{config.clientName} | Home</title>
      </Head>
      <Layout page="home">
        <Hero />
        <Services />
        <Scholarship />
        <WhyChooseUs />
        <RecentArticles />
        <NewsLetter />
      </Layout>
    </>
  )
}
