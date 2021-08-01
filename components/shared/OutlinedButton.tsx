import React, { SyntheticEvent, useEffect } from 'react'
import styled from 'styled-components'
import { BsArrowRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
import Loader from 'react-loader-spinner'
import { useAnalytics } from '../../context/analytics'
import eventRecorder from '../../actions/analytics/event-action-recorder'
import { useInView } from 'react-intersection-observer'
import eventViewRecorder from '../../actions/analytics/event-view-recorder'
import { event } from '../../lib/gtag'

const Styles = styled.div`
  display: ${(block) => (block ? 'flex' : 'inline-flex')};
  justify-content: ${({ align }) => align && `${align}`};
  button {
    align-items: center;
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #f4863a;
    background: inherit;
    border: 2px solid #f4863a;
    box-sizing: border-box;
    border-radius: 33px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
  .button__icon {
    display: flex;
    margin-left: 10px;
    flex-shrink: 0;
    font-size: 20px;
  }
`
const buttonTextVariant = {
  hover: {
    backgroundColor: '#f4863a',
    color: '#fff',
    x: [1, 0],
    transition: {
      duration: 2,
    },
  },
}

const buttonIconVariant = {
  hover: {
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
  },
}

interface ButtonProps {
  title: string
  onClick: (e: SyntheticEvent) => Promise<unknown> | unknown
  description: string
  pagePath: string
  action: string
  isLoading?: boolean
  align?: string
  styles?: unknown
  block?: boolean
  style?: object
  isDisabled?: boolean
}
export default function OutlinedButton({
  title,
  onClick,
  block,
  align,
  isLoading,
  styles,
  description,
  pagePath,
  style,
  isDisabled,
  action,
}: ButtonProps) {
  const { inView, ref } = useInView()
  const { ip, device } = useAnalytics()
  const handleOnClick = async (e: SyntheticEvent) => {
    onClick(e)
    event({ action, category: description, label: title })
    await eventRecorder({ pagePath, label: title, description, action, ip, device })
  }
  useEffect(() => {
    if (ip && device) {
      eventViewRecorder({ pagePath, label: title, description, action, ip, device })
    }
  }, [inView, ip])

  return (
    <Styles
      block={block}
      align={
        (align.toLowerCase() === 'left' && 'flex-start') ||
        (align.toLowerCase() === 'right' && 'flex-end') ||
        (align.toLowerCase() === 'center' && 'center')
      }
      style={style}
      ref={ref}
    >
      <motion.button
        variants={buttonTextVariant}
        whileHover="hover"
        type="button"
        onKeyPress={handleOnClick}
        onClick={handleOnClick}
        style={styles}
        disabled={isDisabled}
      >
        {title}
        <motion.div className="button__icon" variants={buttonIconVariant}>
          {isLoading ? (
            <span className="button__icon">
              <Loader type="Oval" color="black" height={15} width={15} />
            </span>
          ) : (
            <BsArrowRight className="button__icon" />
          )}
        </motion.div>
      </motion.button>
    </Styles>
  )
}

OutlinedButton.defaultProps = {
  styles: {},
  isLoading: false,
  align: 'center',
  block: true,
}
