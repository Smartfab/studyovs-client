import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoMdMenu } from 'react-icons/io'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MobileMenu from './MobileMenu'
import Logo from './Logo'

const Styles = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: fixed;
  background: #fff;
  top: 0;
  z-index: 999;
  width: 100%;
  .nav__item {
    margin-left: 27px;
    font-weight: 400;
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
  .mobile-icon {
    width: 35px;
    height: 35px;
    background: rgba(245, 201, 171, 0.26);
    border-radius: 31px;
    display: none;
  }
  @media (max-width: 820px) {
    .nav__link {
      display: none;
    }
    .mobile-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f4863a;
      flex-shrink: 0;
      font-size: 20px;
    }
  }
  .mobile-menu {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #000000;
    z-index: 999999999999;
  }
  .header__wrapper {
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  .home,
  .blog,
  .bookings,
  .payments,
  .contact {
    color: #f4863a;
    font-weight: bold;
  }
`

export default function Header({ page }) {
  const router = useRouter()
  const mobileMenuExitAnimation = useAnimation()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const navs = [
    { title: 'Home', url: '/', isActive: 'home' },
    { title: 'Blog', url: '/blogs', isActive: 'blog' },
    { title: 'Bookings', url: '/bookings', isActive: 'bookings' },
    { title: 'Payment', url: '/payment', isActive: 'payment' },
    { title: 'Contact Us', url: '/contact-us', isActive: 'contact' },
  ]

  const handleNavLink = (destination) => {
    router.push(destination)
  }

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    }
    if (!showMobileMenu) {
      document.body.style.overflow = 'unset'
    }
    return null
  }, [showMobileMenu])

  const handleShowMobileMenu = (show) => {
    setShowMobileMenu(show)
    if (!show) {
      mobileMenuExitAnimation.start({
        x: '-100vw',
        transition: {
          duration: 0.3,
          delay: 0.2,
          type: 'spring',
          bounce: 3,
        },
      })
    }
  }

  return (
    <Styles>
      <div className="header__wrapper">
        <Logo />
        <div className="nav__link">
          {navs.map((nav) => (
            <span
              role="button"
              key={nav.title}
              className={`nav__item ${nav.isActive === page && page}`}
              onKeyPress={() => handleNavLink(nav.url)}
              onClick={() => handleNavLink(nav.url)}
            >
              {nav.title}
            </span>
          ))}

          <motion.span
            whileHover={{
              backgroundColor: '#f4863a',
              color: '#fff',
              x: [1, 0],
              transition: {
                duration: 1,
              },
            }}
            className="signup"
            tabIndex={0}
            role="button"
            onKeyPress={() => router.push('/application')}
            onClick={() => router.push('/application')}
          >
            Apply Now
          </motion.span>
        </div>
        <div
          role="button"
          className="mobile-icon"
          onKeyPress={() => handleShowMobileMenu(true)}
          onClick={() => handleShowMobileMenu(true)}
        >
          <IoMdMenu />
        </div>
        {showMobileMenu && (
          <div className="mobile-menu">
            <MobileMenu handleShowMobileMenu={handleShowMobileMenu} />
          </div>
        )}
      </div>
    </Styles>
  )
}
