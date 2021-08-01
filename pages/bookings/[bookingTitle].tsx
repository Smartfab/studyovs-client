import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import isValidEmail from './../../utils/email-validator'
import { useMutation } from 'react-query'
import submitBookingRequest from '../../actions/submit-booking-request'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import { FirstName, LastName, TelephoneNumber, Email } from '../../components/forms'
import OutlinedButton from '../../components/shared/OutlinedButton'
import { useRouter } from 'next/router'
import Head from 'next/head'
import config from './../../config/config'
import ColumnResizer from '../../components/shared/ColumnResizer'
import { toast } from 'react-toastify'
import InputErrorsSummary from '../../components/shared/InputErrorsSummary'

const Styles = styled.div`
  form {
    margin-bottom: 60px;
  }
  .form__control {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  label {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin-bottom: 10px;
  }
  input,
  .select {
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    box-sizing: border-box;
    border-radius: 5px;
    height: 50px;
    padding: 10px;
    ::placeholder {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #c7c7c7;
    }
    :focus {
      border-color: #00a8e2;
      outline: none;
    }
  }
  .input-error {
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: red;
  }
  .input-error__error {
    margin-right: 5px;
  }
  .must {
    color: red;
    font-size: 18px;
  }
  .correct {
    color: #44eb44;
    font-size: 18px;
    font-weight: 800;
  }
  .booking-form__title {
    text-align: center;
    margin-top: 0;
  }
`

const validateBookingForm = (values) => {
  const errors = {} as {
    firstName: string
    lastName: string
    telephoneNumber: string
    email: string
  }
  const { firstName, lastName, telephoneNumber, email } = values
  if (!firstName) {
    errors.firstName = 'First name is required'
  }
  if (!lastName) {
    errors.lastName = 'Last name is required'
  }
  if (!telephoneNumber) {
    errors.telephoneNumber = 'Telephone number is required'
  }
  if (!email) {
    errors.email = 'Email is required'
  }
  if (email && !isValidEmail(email)) {
    errors.email = 'Email is invalid'
  }
  return {
    errors,
    isError: Object.values(errors).length > 0 ? true : false,
  }
}

export default function BookingForm() {
  const router = useRouter()
  const { bookingTitle } = router.query
  const { mutateAsync, isLoading, isSuccess } = useMutation(submitBookingRequest)
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    email: '',
  })

  const { firstName, lastName, telephoneNumber, email } = values
  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    email: '',
  })

  const handleOnChange = (e) => {
    setInputErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const validation = validateBookingForm(values)
    if (validation.isError) {
      setInputErrors(validation.errors)
    }
    await mutateAsync(
      { ...values, title: bookingTitle },
      {
        onSuccess: () => {
          router.push('/bookings')
          toast.success(
            `${bookingTitle} booking request form submitted and you will contacted within 24 hours`
          )
        },
      }
    )
  }

  return (
    <Styles>
      <Layout>
        <Head>
          <title>{config.clientName} | Request Booking Application Form</title>
        </Head>
        <PageHeader imgUrl="/articles__icon.svg" title={`Book ${bookingTitle}`} />
        <ColumnResizer>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <FirstName
                firstName={firstName}
                handleChange={handleOnChange}
                error={inputErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <LastName
                lastName={lastName}
                handleChange={handleOnChange}
                error={inputErrors.lastName}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <TelephoneNumber
                telephoneNumber={telephoneNumber}
                handleChange={handleOnChange}
                error={inputErrors.telephoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Email email={email} handleChange={handleOnChange} error={inputErrors.email} />
            </Grid>
          </Grid>
          <>
            {Object.values(inputErrors).filter((error) => error.length > 3).length ? (
              <InputErrorsSummary
                errors={Object.values(inputErrors).filter((error) => error.length > 3)}
              />
            ) : null}
          </>
          <OutlinedButton
            align="center"
            description="booking card button"
            action="click"
            pagePath={process.browser ? window.location.pathname : ''}
            title="Submit Booking"
            onClick={(e) => handleOnSubmit(e)}
            isLoading={isLoading}
            isDisabled={isLoading || isSuccess}
          />
        </ColumnResizer>
      </Layout>
    </Styles>
  )
}
