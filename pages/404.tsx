import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import ColumnResizer from '../components/shared/ColumnResizer'
import Layout from '../components/shared/Layout'
import config from '../config/config'

const Styles = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .not-found__info {
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
  }

  .not-found__image {
    width: 300px;
    height: 363px;
  }
  a {
  }
`
export default function FourOhFour() {
  return (
    <Styles>
      <Layout>
        <Head>
          <title>{config.clientName} | Page Not Found</title>
        </Head>
        <ColumnResizer>
          <div className="container">
            <img src="/404__image.svg" alt="404" className="not-found__image" />
            <p className="not-found__info">OPS it seems you are on page that does not exist</p>
            <Link href="/">
              <a>Return To Home Page</a>
            </Link>
          </div>
        </ColumnResizer>
      </Layout>
    </Styles>
  )
}
