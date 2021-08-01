import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import PaddingResizer from '../../styles/PaddingResizer'
import Logo from './Logo'

const Styles = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav__item {
    margin-left: 27px;
    font-weight: 600;
    cursor: pointer;
    :hover {
      color: #00a8e2;
    }
  }
  .signup {
    width: 121px;
    height: 39px;
    font-size: 16px;
    line-height: 19px;
    color: #f4863a;
    background: rgba(245, 201, 171, 0.26);
    border-radius: 31px;
    padding: 10px 33px;
    cursor: pointer;
    margin-left: 36px;
    font-weight: bold;
  }
`

export default function MobileHeader() {
  const router = useRouter()
  return (
    <PaddingResizer>
      <Styles>
        <Logo />
        <div className="nav__link">
          <span className="nav__item">Home</span>
          <span className="nav__item">Scholarships</span>
          <span className="nav__item">Blog</span>
          <span className="nav__item">About Us</span>
          <span className="nav__item">Contact Us</span>
          <span
            tabIndex={0}
            role="button"
            onKeyPress={() => router.push('/application')}
            onClick={() => router.push('/application')}
            className="signup"
          >
            Sign Up
          </span>
        </div>
      </Styles>
    </PaddingResizer>
  )
}
