import React, { useState } from 'react'
import Layout from '../components/shared/Layout'
import PageHeader from '../components/shared/PageHeader'
import config from '../config/config'
import Head from 'next/head'
import ColumnResizer from '../components/shared/ColumnResizer'
import { Grid } from '@material-ui/core'
import InputField from '../components/forms/InputField'
import OutlinedButton from '../components/shared/OutlinedButton'
import paymentValidation from '../utils/payment.validation'
import { PaymentI } from '../interfaces/payment.interface'
import { useMutation } from 'react-query'
import makePayment from '../actions/make-payments'
import { toast } from 'react-toastify'
import InputErrorsSummary from '../components/shared/InputErrorsSummary'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import router from 'next/router'

const flutterWaveKey = config.payment.flutterwave.publicKey

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

  const flutterPaymentconfig = {
    public_key: flutterWaveKey,
    tx_ref: email,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phonenumber: email,
      name: `${firstName} ${lastName}}`,
    },
    customizations: {
      title: 'Studyovs Agency',
      description: reason,
      logo:
        'https://res.cloudinary.com/odemru-technologies/image/upload/v1633887269/studyovs/wmp0o1lxhgfoydlgy0hl.png',
    },
  }

  const handleFlutterPayment = useFlutterwave(flutterPaymentconfig)
  const onSuccess = async (reference) => {
    const paymentDetails = {
      firstName,
      lastName,
      email,
      reason,
      amount: Number(amount),
      processor: 'flutterwave',
      reference: reference.flw_ref,
      currency: 'NGN',
      service: 'payment',
    }
    await mutateAsync(paymentDetails, {
      onSuccess: (data) => {
        toast.success(data)
        setValues({ email: '', firstName: '', lastName: '', amount: null, reason: '' })
        router.push('/')
      },
    })
  }

  const handleChange = (e) => {
    setInputErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    const validation = paymentValidation(values)
    if (validation.isError) {
      setInputErrors(validation.errors)
      return null
    }
    handleFlutterPayment({
      callback: async (value) => {
        await onSuccess(value)
        closePaymentModal()
      },
      onClose: () => {},
    })
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
