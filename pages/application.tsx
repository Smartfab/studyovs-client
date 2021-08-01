/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { SyntheticEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Grid, GridSpacing } from '@material-ui/core'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Layout from '../components/shared/Layout'
import PageHeader from '../components/shared/PageHeader'
import ColumnResizer from '../components/shared/ColumnResizer'
import {
  FirstName,
  MiddleName,
  LastName,
  Email,
  DesiredCountry,
  Nationality,
  Programme,
  StudyField,
  TelephoneNumber,
  University,
  Address,
} from '../components/forms'
import OutlinedButton from '../components/shared/OutlinedButton'
import submitApplication from '../actions/submit-application'
import applicationValidation from '../utils/application.validation'
import { ApplicationErrorTypes, ApplicationI } from '../interfaces/application.interface'
import config from '../config/config'
import InputErrorsSummary from '../components/shared/InputErrorsSummary'

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
`
export default function ApplicationForm({ country }) {
  const { mutateAsync, isLoading } = useMutation(submitApplication)
  const router = useRouter()
  const [values, setValues] = useState<ApplicationI>({
    firstName: '',
    lastName: '',
    middleName: '',
    nationality: '',
    telephoneNumber: '',
    email: '',
    university: '',
    programme: '',
    desiredCountry: country ? country : '',
    studyField: '',
    address: '',
  })

  const [inputErrors, setInputErrors] = useState<ApplicationErrorTypes>({
    firstName: '',
    lastName: '',
    nationality: '',
    telephoneNumber: '',
    email: '',
    university: '',
    programme: '',
    desiredCountry: '',
    studyField: '',
    address: '',
  })

  const {
    firstName,
    lastName,
    middleName,
    nationality,
    telephoneNumber,
    email,
    university,
    studyField,
    address,
  } = values
  const handleChange = (e) => {
    setInputErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const [gridSpace, setGridSpace] = useState<number>(2)

  const handleSelect = (field: string, value: string) => {
    setInputErrors((prev) => ({ ...prev, [field]: '' }))
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 600) {
        setGridSpace(0)
      } else {
        setGridSpace(2)
      }
    })
  }, [])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const validation = applicationValidation(values)
    if (validation.isError) {
      setInputErrors(validation.errors)
      return null
    }
    await mutateAsync(values, {
      onSuccess: () => {
        router.push('/')
        toast.success('Application form submitted and you will contacted within 24 hours')
      },
      onError: (err) => {
        setInputErrors(err as ApplicationErrorTypes)
      },
    })
    return null
  }
  return (
    <Styles>
      <Layout>
        <Head>
          <title>{config.clientName} | Application form</title>
        </Head>
        <PageHeader imgUrl="/articles__icon.svg" title="Application" />
        <ColumnResizer>
          <form>
            <Grid container spacing={Number(gridSpace) as GridSpacing}>
              <Grid item xs={12} md={4}>
                <FirstName
                  firstName={firstName}
                  handleChange={handleChange}
                  error={inputErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <MiddleName
                  middleName={middleName}
                  handleChange={handleChange}
                  error={inputErrors.middleName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LastName
                  lastName={lastName}
                  handleChange={handleChange}
                  error={inputErrors.lastName}
                />
              </Grid>
            </Grid>
            <Grid container spacing={Number(gridSpace) as GridSpacing}>
              <Grid item xs={12} md={6}>
                <Nationality
                  nationality={nationality}
                  handleChange={handleChange}
                  error={inputErrors.nationality}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TelephoneNumber
                  telephoneNumber={telephoneNumber}
                  handleChange={handleChange}
                  error={inputErrors.telephoneNumber}
                />
              </Grid>
            </Grid>
            <Address address={address} handleChange={handleChange} error={inputErrors.address} />
            <Email email={email} handleChange={handleChange} error={inputErrors.email} />
            <DesiredCountry handleSelect={handleSelect} error={inputErrors.desiredCountry} />
            <University
              university={university}
              handleChange={handleChange}
              error={inputErrors.university}
            />
            <Programme handleSelect={handleSelect} error={inputErrors.programme} />
            <StudyField
              studyField={studyField}
              handleChange={handleChange}
              error={inputErrors.studyField}
            />
            <>
              {Object.values(inputErrors).filter((error) => error.length > 3).length ? (
                <InputErrorsSummary
                  errors={Object.values(inputErrors).filter((error) => error.length > 3)}
                />
              ) : null}
            </>
            <OutlinedButton
              description="Handle submit application form"
              pagePath={process.browser ? window.location.pathname : ''}
              action="click"
              isLoading={isLoading}
              title="Submit"
              onClick={handleSubmit}
            />
          </form>
        </ColumnResizer>
      </Layout>
    </Styles>
  )
}
