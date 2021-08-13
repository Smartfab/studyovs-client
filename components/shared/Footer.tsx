import styled from 'styled-components'
import React from 'react'
import { RiFacebookFill, RiInstagramFill, RiTwitterFill } from 'react-icons/ri'
import { SiTelegram } from 'react-icons/si'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import PaddingResizer from '../../styles/PaddingResizer'
import { useRouter } from 'next/router'
import Logo from './Logo'

const Styles = styled.div`
  background: #000000;
  color: #fff;
  z-index: 999999;
  margin-top: 30px;
  .footer-links {
    display: flex;
  }
  .footer-link-column {
    display: flex;
    margin-left: 20px;
    flex-direction: column;
    @media (max-width: 700px) {
      flex-direction: row;
      margin-left: 0px;
    }
  }
  .footer-links__item {
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 126.5%;
    :hover {
      font-weight: bold;
      color: #f4863a;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
  }

  .footer-socials {
    display: flex;
    margin-top: 10px;
  }
  .footer-socials__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 2px solid #e9e9e9;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 15px;
    :hover {
      background: #f4863a;
      border-color: #f4863a;
    }
  }
  .footer-socials__icon {
    color: #fff;
  }
  @media (max-width: 700px) {
    .footer {
      flex-direction: column;
    }
    .footer-links {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
    .footer-links__item {
      margin: 5px;
    }
    .footer-brand {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
    }
    .footer-socials__wrapper {
      margin: 0 10px;
    }
  }
  a {
    color: #fff;
    :hover {
      color: #f4863a;
    }
  }
`
export default function Footer() {
  const columnOneLinks: Array<{ title: string; url: string }> = [
    { title: 'Scholarships', url: 'scholarships' },
    { title: 'Blog', url: 'blogs' },
    { title: 'About Us', url: 'about-us' },
  ]
  const columnTwoLinks: Array<{ title: string; url: string }> = [
    { title: 'Payment', url: 'payment' },
    { title: 'Bookings', url: 'bookings' },
    { title: 'Contact Us', url: 'contact-us' },
  ]
  const router = useRouter()
  const socials = [
    {
      name: 'instagram',
      link: 'https://www.instagram.com/study_ovs',
      icon: <RiInstagramFill className="footer-socials__icon" />,
    },
    {
      name: 'twitter',
      link: 'https://twitter.com/study_ovs',
      icon: <RiTwitterFill className="footer-socials__icon" />,
    },
    { name: 'facebook', link: '', icon: <RiFacebookFill className="footer-socials__icon" /> },
    { name: 'telegram', link: '', icon: <SiTelegram className="footer-socials__icon" /> },
  ]
  return (
    <Styles>
      <PaddingResizer>
        <div className="footer">
          <div className="footer-brand">
            <Logo />
            <div className="footer-socials">
              {socials.map((social) => (
                <span
                  className="footer-socials__wrapper"
                  key={social.name}
                  onClick={() => router.push(social.link)}
                >
                  {social.icon}
                </span>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-link-column">
              {columnOneLinks.map((item) => (
                <span key={uuidv4()} className="footer-links__item">
                  <Link href={`/${item.url}`}>
                    <a>{item.title}</a>
                  </Link>
                </span>
              ))}
            </div>
            <div className="footer-link-column">
              {columnTwoLinks.map((item) => (
                <span key={uuidv4()} className="footer-links__item">
                  <Link href={`/${item.url}`}>
                    <a>{item.title}</a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </PaddingResizer>
    </Styles>
  )
}
