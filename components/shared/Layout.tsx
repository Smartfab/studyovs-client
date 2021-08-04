import styled from 'styled-components'
import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import GeneralAlert from './GeneralAlert'
import { useAnalytics } from '../../context/analytics'

const Styles = styled.div`
  position: relative;
  .children {
    margin-top: 62px;
    min-height: 75vh;
  }
`
export default function Layout({
  children,
  page,
}: {
  children: React.ReactNode
  page?: 'home' | 'blog' | 'bookings' | 'payments' | 'contact'
}) {
  const { recordPageVisit, ip, device } = useAnalytics()
  useEffect(() => {
    if (ip && device) recordPageVisit(window.location.pathname)
  }, [ip, device])
  return (
    <Styles>
      <Header page={page} />
      <GeneralAlert />
      <div className="children">{children}</div>
      <Footer />
    </Styles>
  )
}
