import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BiPlay } from 'react-icons/bi'
import { useAnimation, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import PaddingResizer from '../../styles/PaddingResizer'
import OutlinedButton from '../shared/OutlinedButton'

const Styles = styled(motion.div)`
  background-color: #f8fcff;
  padding: 100px 0;
  overflow: hidden;
  p {
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    margin: 0;
    margin-bottom: 36px;
  }
  .colorizer {
    color: #f4863a;
  }
  .video-player {
    position: relative;
  }
  .video {
    width: 100%;
  }
  .play {
    position: absolute;
    font-size: 90px;
    color: #fff;
  }
  .play__circle {
    width: 100px;
    height: 100px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 50%;
    position: absolute;
    top: 35%;
    left: 43%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`
export default function WhyChooseUs() {
  const bgAnimation = useAnimation()
  const titleAnimation = useAnimation()
  const btnAnimation = useAnimation()
  const videoAnimation = useAnimation()
  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      videoAnimation.start({ x: 0, transition: { delay: 0, duration: 1, stiffness: 200 } })
      titleAnimation.start({ x: 0, transition: { delay: 0, duration: 1, stiffness: 200 } })
      btnAnimation.start({
        x: 0,
        transition: { delay: 0, type: 'spring', stiffness: 200, duration: 3 },
      })
    }
  }, [inView, bgAnimation, titleAnimation, btnAnimation, videoAnimation])

  return (
    <Styles ref={ref}>
      <PaddingResizer>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <motion.div className="video-player" initial={{ x: '-100vw' }} animate={videoAnimation}>
              <img src="/why-choose-us.svg" alt="" className="video" />
              <div className="play__circle">
                <BiPlay className="play" />
              </div>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              <motion.p initial={{ x: '100vw' }} animate={titleAnimation}>
                Why start your study abroad journey with <span className="colorizer">StudyOvs</span>
              </motion.p>
              <motion.div initial={{ x: '100vw' }} animate={btnAnimation}>
                <OutlinedButton
                  description="why choose us button"
                  action="click"
                  pagePath={process.browser ? window.location.pathname : ''}
                  align="left"
                  title="Start Now"
                  onClick={() => router.push('/application')}
                />
              </motion.div>
            </div>
          </Grid>
        </Grid>
      </PaddingResizer>
    </Styles>
  )
}
