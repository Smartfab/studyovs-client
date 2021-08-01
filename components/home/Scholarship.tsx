import Grid from '@material-ui/core/Grid'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import PaddingResizer from '../../styles/PaddingResizer'
import OutlinedButton from '../shared/OutlinedButton'

const Styles = styled.div`
  margin: 100px 0;
  overflow: hidden;
  .scholarship__tagline {
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    margin: 0;
    margin-bottom: 30px;
    max-width: 500px;
  }
  .scholarship__caption {
    left: 214px;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    margin: 0;
    margin-bottom: 25px;
  }
  .colorizer {
    color: #f4863a;
  }
  .scholarship {
    z-index: 99999;
  }

  @media (max-width: 700px) {
    .scholarship {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
    }
    .scholarship__tagline {
      font-size: 36px;
      width: 100%;
    }
    .scholarship-illustration {
      display: none;
    }
    .scholarship__tagline {
      width: 100%;
    }
    .scholarship {
      display: flex;
      justify-content: center;
    }
  }
`

export default function Scholarship() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const animationLeft = useAnimation()
  const animationRight = useAnimation()
  const router = useRouter()
  useEffect(() => {
    if (inView) {
      animationLeft.start({
        x: 0,
      })
      animationRight.start({
        x: 0,
      })
    }
  }, [inView, animationLeft, animationRight])

  const transition = {
    type: 'spring',
    duration: 1,
    stiffness: 200,
  }
  return (
    <section ref={ref}>
      <PaddingResizer>
        <Styles>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <motion.div
                initial={{ x: '-100vw' }}
                animate={animationLeft}
                transition={transition}
                className="scholarship"
              >
                <p className="scholarship__tagline">
                  Find an affodable <span className="colorizer">path</span> to a{' '}
                  <span className="colorizer">college</span> college degreee through{' '}
                  <span className="colorizer">scholarship</span>
                </p>
                <p className="scholarship__caption">
                  we help search and curate international scholarship programs and grant that will
                  give you the most value
                </p>
                <OutlinedButton
                  description="Handle redirect to scholarship"
                  action="click"
                  pagePath={process.browser ? window.location.pathname : ''}
                  title="Explore Scholarships"
                  align="left"
                  onClick={() => router.push('/scholarships')}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <motion.img
                animate={animationRight}
                initial={{
                  x: '100vw',
                }}
                transition={transition}
                src="/scholarship-illustration.svg"
                alt=""
                className="scholarship-illustration"
              />
            </Grid>
          </Grid>
        </Styles>
      </PaddingResizer>
    </section>
  )
}
