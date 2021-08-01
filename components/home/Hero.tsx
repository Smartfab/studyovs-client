import styled from 'styled-components'
import React, { useState } from 'react'
import { BiRightArrowCircle } from 'react-icons/bi'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import { motion } from 'framer-motion'
import PaddingResizer from '../../styles/PaddingResizer'
import { useRouter } from 'next/router'

const Styles = styled.div`
  display: flex;
  align-items: center;
  height: 500px;
  position: relative;
  .hero__content {
  }
  .title {
    font-weight: bold;
    font-size: 64px;
    line-height: 75px;
    color: #00a8e2;
    margin: 0;
    max-width: 600px;
  }
  .title__tag {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #f4863a;
    margin-top: 22px;
    margin-bottom: 32px;
  }
  .quick-search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: fit-content;
    height: 55px;
    box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 20px 15px;
  }
  .quick-search__text {
    white-space: nowrap;
    font-size: 16px;
    @media (max-width: 340px) {
      font-size: 14px;
    }
  }
  .quick-search__divider {
    margin: 0 10px;
  }
  .quick-search__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    background: rgba(245, 201, 171, 0.26);
    border-radius: 31px;
    flex-shrink: 0;
    cursor: pointer;
    :focus {
      border-radius: 31px;
    }
  }
  .quick-search__button-icon {
    color: #f4863a;
    font-size: 20px;
  }
  .country {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
  }
  .country__name {
    color: #00a8e2;
    font-weight: bold;
    cursor: pointer;
  }
  .country__drop-down {
    margin-left: 5px;
    cursor: pointer;
  }
  .country-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 55px;
    box-shadow: 0px 0px 34px rgba(0, 0, 0, 0.25);
    left: -12px;
  }
  .country-container__item {
    padding: 10px 20px;
    cursor: pointer;
  }

  .hero__bg {
    position: absolute;
    top: 0;
    z-index: -99;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 600px) {
    .title {
      font-size: 36px;
      line-height: 42px;
    }
    .quick-search {
      width: 100%;
      justify-content: space-between;
    }
    .quick-search__text {
      white-space: pre-wrap;
    }
    .hero__bg {
      display: none;
    }
  }
  @media (max-width: 600px) {
    height: 400px;
  }
`
export default function Hero() {
  const [countryName, setCountryName] = useState('USA')
  const countries = ['USA', 'Russia', 'Canada', 'UK', 'Germany', 'Others']
  const [show, setShow] = useState(false)
  const handleChangeCountryName = (selectedCountryName) => {
    setCountryName(selectedCountryName)
    setShow(false)
  }
  const router = useRouter()
  return (
    <PaddingResizer>
      <Styles>
        <div className="hero__content">
          <img src="/heroBg.svg" alt="" className="hero__bg" />
          <motion.p
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: 'spring', duration: 3 }}
            className="title"
          >
            Start your Journey to study abroad today !
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{ type: 'spring', duration: 3 }}
              className="title__tag"
            >
              Get real time assistance from professionals in starting your studying abroad journey
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3, delay: 1, duration: 3 }}
            className="quick-search"
          >
            <span className="quick-search__text">Apply to a school in</span>
            <span className="quick-search__divider">|</span>
            <div className="country">
              <span
                role="button"
                className="country__name"
                onKeyPress={() => setShow(!show)}
                onClick={() => setShow(!show)}
              >
                {countryName}
              </span>
              {show ? (
                <AiFillCaretDown
                  className="country__drop-down"
                  role="button"
                  onKeyPress={() => setShow(!show)}
                  onClick={() => setShow(!show)}
                />
              ) : (
                <AiFillCaretRight
                  className="country__drop-down"
                  role="button"
                  onKeyPress={() => setShow(!show)}
                  onClick={() => setShow(!show)}
                />
              )}
              {show && (
                <div className="country-container">
                  {countries.map((country) => (
                    <div
                      className="country-container__item"
                      role="button"
                      key={country}
                      onKeyPress={() => handleChangeCountryName(country)}
                      onClick={() => handleChangeCountryName(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <motion.div
              whileHover={{
                scale: 1.2,
                x: [-10, 10],
                transition: {
                  type: 'springs',
                  duration: 0.5,
                  mass: 0.2,
                  stiffness: 0.1,
                  yoyo: Infinity,
                  damping: 0,
                  bounce: 0.5,
                },
              }}
              className="quick-search__button"
            >
              <BiRightArrowCircle
                className="quick-search__button-icon"
                onClick={() => router.push(`universities/${countryName.toLowerCase()}`)}
              />
            </motion.div>
          </motion.div>
        </div>
      </Styles>
    </PaddingResizer>
  )
}
