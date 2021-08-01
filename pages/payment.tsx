import React, { useState } from 'react'
import Layout from '../components/shared/Layout'
import PageHeader from '../components/shared/PageHeader'
import config from '../config/config'
import Head from 'next/head'
import ColumnResizer from '../components/shared/ColumnResizer'
import { usePaystackPayment } from 'react-paystack'
import { Grid } from '@material-ui/core'
import InputField from '../components/forms/InputField'
import OutlinedButton from '../components/shared/OutlinedButton'
import paymentValidation from '../utils/payment.validation'
import { PaymentI } from '../interfaces/payment.interface'
import { useMutation } from 'react-query'
import makePayment from '../actions/make-payments'
import { toast } from 'react-toastify'
import InputErrorsSummary from '../components/shared/InputErrorsSummary'

export default function PaymentIndexPage() {
  const { mutateAsync, isLoading } = useMutation(makePayment)
  const [values, setValues] = useState<PaymentI>({
    email: '',
    firstName: '',
    lastName: '',
    amount: null,
    reason: '',
  })
  const { email, firstName, lastName, amount, reason } = values
  const [inputErrors, setInputErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    amount: '',
    reason: '',
  })
  const paystackConfig = {
    email,
    amount: amount * 100,
    publicKey: config.payment.paystack.publicKey,
  }
  const initializePayment = usePaystackPayment(paystackConfig)
  const onSuccess = async (reference) => {
    const paymentDetails = {
      firstName,
      lastName,
      email,
      reason,
      amount: Number(amount),
      processor: 'paystack',
      reference: reference.reference,
      currency: 'NGN',
      service: 'payment',
    }
    await mutateAsync(paymentDetails, {
      onSuccess: (data) => {
        toast.success(data)
        setValues({ email: '', firstName: '', lastName: '', amount: null, reason: '' })
      },
    })
  }

  const handleChange = (e) => {
    setInputErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = () => {
    const validation = paymentValidation(values)
    if (validation.isError) {
      setInputErrors(validation.errors)
      return null
    }
    initializePayment(onSuccess)
  }
  return (
    <>
      <Head>
        <title>{config.clientName} | Make Payment</title>
      </Head>
      <Layout page="payments">
        <PageHeader imgUrl="/payment.svg" title="Payment" />
        <ColumnResizer>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <InputField
                title="First name"
                label="firstName"
                placeholder="John"
                name="firstName"
                value={firstName}
                error={inputErrors.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <InputField
                title="Last name"
                label="lastName"
                placeholder="Doe"
                name="lastName"
                value={lastName}
                error={inputErrors.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <InputField
                title="Email"
                label="email"
                placeholder="email"
                name="email"
                value={email}
                error={inputErrors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <InputField
                title="Amount"
                label="amount"
                placeholder="000000"
                name="amount"
                type="number"
                value={amount}
                error={inputErrors.amount}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <InputField
                title="Payment Reason"
                label="reason"
                placeholder="payment for application fee"
                name="reason"
                value={reason}
                error={inputErrors.reason}
                onChange={handleChange}
              />
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
            description="Handle make payment"
            pagePath={process.browser ? window.location.pathname : ''}
            action="click"
            title="Submit"
            onClick={handleSubmit}
            style={{ marginTop: 30 }}
          />
        </ColumnResizer>
      </Layout>
    </>
  )
}
