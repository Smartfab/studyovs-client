import React, { useEffect, useState } from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMutation } from 'react-query'
import { AiFillInfoCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import Loader from 'react-loader-spinner'
import PaddingResizer from '../../styles/PaddingResizer'
import Styles from './Newsletter.styles'
import addEmailToNewsletter from '../../actions/add-email-to-newsletter'
import isValidEmail from '../../utils/email-validator'
import { useAnalytics } from '../../context/analytics'

export default function NewsLetter() {
  const [email, setEmail] = useState<string>('')
  const { ip, device } = useAnalytics()
  const { mutateAsync, isLoading } = useMutation(addEmailToNewsletter)
  const { inView, ref } = useInView({ threshold: 0.1 })
  const [emailError, setEmailError] = useState<string>('')
  const containerAnimation = useAnimation()

  useEffect(() => {
    if (inView) {
      containerAnimation.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring',
          duration: 1,
        },
      })
    }
  }, [inView, containerAnimation])

  const handleAddEmailToNewsletter = async () => {
    if (!email) {
      return setEmailError('Email is required')
    }
    if (!isValidEmail(email)) {
      return setEmailError('Invalid Email')
    }
    await mutateAsync(
      { email, device, ip },
      {
        onSuccess: () => {
          toast.success(`${email} successfully added to our newsletter`)
          setEmail('')
        },
        onError: (err) => {
          setEmailError(err as string)
        },
      }
    )
    return null
  }
  return (
    <PaddingResizer>
      <Styles ref={ref} initial={{ opacity: 0, x: 10, y: 10 }} animate={containerAnimation}>
        <h1 className="title">Subscribe to our Newsletter</h1>
        <p className="caption">
          Get latest updates and news about scholarship and your dream universities abroad
        </p>
        <div className="newsletter" style={{ borderColor: emailError && 'red' }}>
          <input
            value={email}
            onChange={(e) => {
              setEmailError('')
              setEmail(e.target.value)
            }}
            className="newsletter__input"
            placeholder="Enter your email address"
          />
          <div
            className="newsletter-button"
            role="button"
            tabIndex={0}
            onKeyPress={handleAddEmailToNewsletter}
            onClick={handleAddEmailToNewsletter}
          >
            {isLoading ? (
              <Loader type="Oval" color="#00a8e2" height={15} width={15} />
            ) : (
              <FiArrowRightCircle className="newsletter-button__icon" />
            )}
          </div>
        </div>
        {emailError && (
          <div className="input-error">
            <AiFillInfoCircle className="input-error__error" />
            {emailError}
          </div>
        )}
      </Styles>
    </PaddingResizer>
  )
}
