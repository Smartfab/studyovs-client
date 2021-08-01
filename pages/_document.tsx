import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets } from '@material-ui/styles'
import React from 'react'
import { GA_TRACKING_ID } from '../lib/gtag'
import config from '../config/config'

const { isProduction } = config
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    const materialSheets = new ServerStyleSheets()
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {materialSheets.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <Head>
            {/* Enable google analytics on production only */}
            {isProduction && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });`,
                  }}
                />
              </>
            )}
          </Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
