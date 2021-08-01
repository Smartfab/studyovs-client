import React from 'react'
import Layout from '../components/shared/Layout'
import PageHeader from '../components/shared/PageHeader'
import config from '../config/config'
import Head from 'next/head'
import ColumnResizer from '../components/shared/ColumnResizer'

import styled from 'styled-components'

const Styles = styled.div`
  p {
    line-height: 40px;
    margin-bottom: 40px;
  }
  ul {
    li {
      margin-bottom: 20px;
    }
  }
`
export default function ContactIndexPage() {
  return (
    <Styles>
      <Head>
        <title>{config.clientName} | About Us</title>
      </Head>
      <Layout>
        <PageHeader imgUrl="/about.svg" title="About Us" />
        <ColumnResizer>
          <p>
            STUDYOVS is an educational agency specializing in assisting ambitious students who
            aspire to study in universities around the world. Our mission is to connect students to
            the  best destinations of their choice irrespective of the seeming odds. We do
            everything possible to achieve this because we believe students should have sound
            education with a broad perspective of the world.
          </p>
          <p>
            This grants them exposure as well as opportunities that abound in such experience. The
            smooth journey of our aspiring students across the globe is our foremost priority in the
            ever inter-connecting and diverse world.
          </p>
          <p>We offer a range of services which includes:</p>
          <ul>
            <li>Counselling on selection of courses as needed</li>
            <li> Admission applications</li>
            <li> Ensuring admission acceptance</li>
            <li> Financial guidance</li>
            <li> Scholarship offers  globally</li>
            <li> Invitation letters and Visa issuance</li>
            <li> Flight tickets reservations</li>
            <li> City Navigation </li>
            <li> Hotel reservations</li>
            <li> Services on University registrations</li>
          </ul>
          <p>
            We continue working tirelessly to develop new resources and services on international
            travel opportunities for our aspiring students to ensure they get the best, exciting and
            unforgettable experiences
          </p>
        </ColumnResizer>
      </Layout>
    </Styles>
  )
}
