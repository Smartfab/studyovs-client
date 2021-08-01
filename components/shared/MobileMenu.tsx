import { motion } from 'framer-motion'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Styles = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: hidden;
  z-index: 999999;
  background: #121212;
  .mobile-menu-close-button {
    width: 35px;
    height: 35px;
    background: #f4863a;
    border-radius: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    position: absolute;
    right: 14px;
    top: 17px;
  }
  .mobile-menu-close-button__icon {
  }
  .mobile-menu-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .mobile-menu-nav__item {
    font-size: 25px;
    margin-bottom: 10px;
  }
  .mobile-menu-nav__apply-now {
    min-width: 121px;
    height: 39px;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    background: #f4863a;
    border-radius: 31px;
    padding: 10px 33px;
    cursor: pointer;
    margin-top: 36px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
`
export default function MobileMenu({ handleShowMobileMenu }) {
  const router = useRouter()
  const navs = [
    { title: 'Home', url: '/' },
    { title: 'Scholarships', url: '/scholarships' },
    { title: 'Blog', url: '/blogs/' },
    { title: 'Payment', url: '/payment/' },
    { title: 'About Us', url: '/about-us' },
    { title: 'Contact Us', url: '/contact-us' },
  ]

  const handleNavLink = (destination) => {
    router.push(destination)
    handleShowMobileMenu(false)
  }
  return (
    <Styles initial={{ x: '-100vw' }} animate={{ x: 0 }}>
      <div
        role="button"
        onKeyPress={() => handleShowMobileMenu(false)}
        onClick={() => handleShowMobileMenu(false)}
        tabIndex={0}
        className="mobile-menu-close-button"
      >
        <AiOutlineClose className="mobile-menu-close-button__icon" />
      </div>
      <div className="mobile-menu-nav">
        {navs.map((nav) => (
          <span
            role="button"
            key={nav.title}
            className="mobile-menu-nav__item"
            onKeyPress={() => handleNavLink(nav.url)}
            onClick={() => handleNavLink(nav.url)}
            tabIndex={0}
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
          className="mobile-menu-nav__apply-now"
          onKeyPress={() => {
            router.push('/application')
            handleShowMobileMenu(false)
          }}
          onClick={() => {
            router.push('/application')
            handleShowMobileMenu(false)
          }}
          tabIndex={0}
        >
          Apply Now
        </motion.span>
      </div>
    </Styles>
  )
}
