import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  .logo {
    width: 24px;
    height: 35px;
  }
  .logo__text {
    margin-left: 5px;
    font-size: 25px;
  }
  .logo__study {
    font-weight: 400;
    color: #0baee6;
  }
  .logo__ovs {
    font-weight: 800;
    color: #f4863a;
  }
`
export default function Logo() {
  const router = useRouter()
  return (
    <Styles onClick={() => router.push('/')} onKeyPress={() => router.push('/')}>
      <img src="/logo-icon.png" alt="" className="logo" />
      <div className="logo__text">
        <span className="logo__study">STUDY</span>
        <span className="logo__ovs">OVS</span>
      </div>
    </Styles>
  )
}
