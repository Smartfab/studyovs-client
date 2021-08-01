import { Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import OutlinedButton from './OutlinedButton'
import wordShortener from '../../utils/wordShortener'
import capitalizeFirstLetter from '../../utils/capitalize-first-letter'
import useWindowSize from '../../hooks/useWindowSize'

const Styles = styled.div`
  max-width: 719px;
  margin: 0 auto;
  margin-bottom: 50px;
  overflow: hidden;
  padding: 0 10px;
  .booking__image {
    height: 230px;
    width: 100%;
    object-fit: fill;
  }
  .booking__description {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    cursor: pointer;
    margin: 20px 0;
    :hover {
      color: #f4863a;
    }
  }
  .booking__title {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    margin-top: 20px;
  }
  .booking__ {
    font-size: 16px;
  }
  .button-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  @media (max-width: 600px) {
    .booking__image {
      width: 100%;
      height: 220px;
    }
    .button-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .booking__title {
      margin-top: 0;
    }
  }
`
export default function BookingCard({ booking }) {
  const { width } = useWindowSize()
  const router = useRouter()

  return (
    <Styles>
      <div className="wrapper">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <img
              className="booking__image"
              src={booking.image ? booking.image.url : '/booking-default-image.svg'}
              alt="booking"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <div className="booking__details">
              <div className="booking-date">
                <span className="booking__title">{capitalizeFirstLetter(booking.title)}</span>
              </div>
              <h1 className="booking__description">
                <span>{wordShortener(capitalizeFirstLetter(booking.description), 26)}</span>
              </h1>
              <div className="button-wrapper">
                {booking.affiliateLink && (
                  <a target="_blank" href={booking.affiliateLink} rel="noopener noreferrer">
                    <OutlinedButton
                      align="left"
                      description="booking card button"
                      action="click"
                      pagePath={process.browser ? window.location.pathname : ''}
                      title="Self Booking"
                      styles={{
                        marginRight: '20px',
                        marginBottom: width < 600 && '20px',
                      }}
                      onClick={() => null}
                    />
                  </a>
                )}
                <OutlinedButton
                  align="left"
                  description="booking card button"
                  action="click"
                  pagePath={process.browser ? window.location.pathname : ''}
                  title="Book With Studyovs"
                  onClick={() => router.push(`bookings/${booking.title}`)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Styles>
  )
}
