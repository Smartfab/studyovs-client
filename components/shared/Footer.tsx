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
    justify-content: space-between;
    margin-top: 4px;

    > * {
      &:first-child {
        margin-right: 40px;
      }
    }
  }
  .footer-link-column {
    display: flex;
    flex-direction: column;
    @media (max-width: 700px) {
      flex-direction: row;
      margin-left: 0px;
    }
  }
  .footer-links__item {
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 16px;
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
    > * {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
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
  .address__heading {
    margin-top: 0;
    position: relative;
    display: inline-block;
    font-size: 20px;
    color: #bcbcbc;
  }
  .address__text {
    margin-top: 0;
    line-height: 30px;
  }
  .item-wrapper {
    /* width: 200px; */
  }
  @media (max-width: 700px) {
    .item-wrapper {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid gray;
      margin-top: 20px;
      width: auto;
    }
    .footer {
      > * {
        margin-right: 0;
      }
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
            <p>hello@studyovs.com</p>
            <p style={{ margin: 0 }}>corporate@studyovs.com</p>
          </div>
          <div className="item-wrapper">
            <h2 className="address__heading">California</h2>
            <p className="address__text">
              1043 Garland Ave, <br />
              San Jose, <br />
              CA 95126-3159,
              <br /> United States.
            </p>
          </div>
          <div className="item-wrapper">
            <h2 className="address__heading">Cheshire</h2>
            <p className="address__text">
              7 Greys Court, <br />
              Kingsland Grange, <br />
              Warrington, WA1 4SH, <br />
              United Kingdom
            </p>
          </div>
          <div className="item-wrapper">
            <h2 className="address__heading">Quick Links</h2>
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
        </div>
      </PaddingResizer>
    </Styles>
  )
}
