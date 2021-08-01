import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ServiceItem from './ServiceItem'
import servicesList from './servicesList'
import PaddingResizer from '../../styles/PaddingResizer'
import OutlinedButton from '../shared/OutlinedButton'
import { useRouter } from 'next/router'

const Styles = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f8fcff;
  padding: 90px 0;
  width: 100%;
  overflow: hidden;
  .service__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #f4863a;
    width: 166px;
    height: 39px;
    background: rgba(245, 201, 171, 0.26);
    border-radius: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 35px;
    box-sizing: border-box;
  }
  .service__holder {
    margin: 50px 0;
  }
`
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
      type: 'spring',
      bounce: 1,
      damping: 200,
      mass: 0.4,
      when: 'beforeChildren',
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}
export default function Services() {
  const { inView, ref } = useInView({ threshold: 0.1 })
  const containerAnimation = useAnimation()
  const itemAnimation = useAnimation()
  useEffect(() => {
    if (inView) {
      containerAnimation.start('visible')
      itemAnimation.start('visible')
    }
  }, [inView, containerAnimation, itemAnimation])

  const router = useRouter()
  return (
    <Styles ref={ref}>
      <h1 className="service__title">Our Services</h1>
      <PaddingResizer>
        <motion.div
          variants={container}
          animate={containerAnimation}
          initial="hidden"
          className="service__holder"
        >
          <Grid container spacing={4}>
            {servicesList.map((serviceItem) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={serviceItem.title}>
                <motion.div variants={item}>
                  <ServiceItem serviceItem={serviceItem} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </PaddingResizer>
      <motion.div variants={container} animate={containerAnimation} initial="hidden">
        <OutlinedButton
          description="Apply Now -service section"
          action="click"
          pagePath={process.browser ? window.location.pathname : ''}
          title="Apply Now"
          onClick={() => router.push('/application')}
        />
      </motion.div>
    </Styles>
  )
}
