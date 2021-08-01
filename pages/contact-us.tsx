import React, { useState } from 'react'
import Layout from '../components/shared/Layout'
import PageHeader from '../components/shared/PageHeader'
import config from '../config/config'
import Head from 'next/head'
import ColumnResizer from '../components/shared/ColumnResizer'
import { Grid } from '@material-ui/core'
import InputField from '../components/forms/InputField'
import OutlinedButton from '../components/shared/OutlinedButton'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import supportValidation from '../utils/support.validation'
import submitSupportTicket from '../actions/submit-support-ticket'
import { SupportI } from '../interfaces/support.interface'
import TextField from '../components/forms/TextField'
import { TiLocation } from 'react-icons/ti'
import { AiFillPhone } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import styled from 'styled-components'
import ContactCard from '../components/shared/ContactCard'
import InputErrorsSummary from '../components/shared/InputErrorsSummary'

const Styles = styled.div`
  .contacts {
    margin-bottom: 30px;
  }
  .contact-form {
    margin-top: 100px;
    color: #0baee6;
    text-align: center;
    margin-bottom: 50px;
  }
`
export default function ContactIndexPage() {
  const { mutateAsync, isLoading } = useMutation(submitSupportTicket)
  const [values, setValues] = useState<SupportI>({
    email: '',
    firstName: '',
    lastName: '',
    subject: '',
    message: '',
  })
  const { email, firstName, lastName, subject, message } = values
  const [inputErrors, setInputErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setInputErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async () => {
    const validation = supportValidation(values)
    if (validation.isError) {
      setInputErrors(validation.errors)
      return null
    }
    await mutateAsync(values, {
      onSuccess: (data) => {
        toast.success(data)
        setValues({ email: '', firstName: '', lastName: '', subject: '', message: '' })
      },
    })
  }
  return (
    <Styles>
      <Head>
        <title>{config.clientName} | Contact Us</title>
      </Head>
      <Layout page="contact">
        <PageHeader imgUrl="/contact.svg" title="Contact Us" />
        <ColumnResizer>
          <div className="contacts">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <ContactCard
                  title="Address"
                  text="1234 Street Adress City Address, 1234"
                  icon={<TiLocation />}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <ContactCard title="Phone" text="(00)1234 5678" icon={<AiFillPhone />} />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <ContactCard title="E-mail" text="contact@studyovs.com" icon={<MdEmail />} />
              </Grid>
            </Grid>
          </div>
          <h2 className="contact-form">Contact Form</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
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
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
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
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
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
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <InputField
                title="Subject"
                label="subject"
                placeholder="subject"
                name="subject"
                value={subject}
                error={inputErrors.subject}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                title="Message"
                label="message"
                placeholder="message"
                name="message"
                value={message}
                error={inputErrors.message}
                onChange={handleChange}
                height={200}
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
            description="Submit Ticket"
            pagePath={process.browser ? window.location.pathname : ''}
            action="click"
            title="Submit"
            onClick={handleSubmit}
            style={{ marginTop: 30 }}
            isLoading={isLoading}
          />
        </ColumnResizer>
      </Layout>
    </Styles>
  )
}
