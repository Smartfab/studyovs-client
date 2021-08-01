import { Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import OutlinedButton from './OutlinedButton'
import { useRouter } from 'next/router'

const Styles = styled.div`
  max-width: 719px;
  margin: 0 auto;
  margin-bottom: 50px;
  overflow: hidden;
  padding: 0 10px;
  .card-item__image {
    height: 180px;
    width: 200px;
    object-fit: cover;
  }
  .card-item__title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    cursor: pointer;
    margin: 20px 0;
    :hover {
      color: #f4863a;
    }
  }
  .card-item-date {
    display: flex;
    align-items: center;
  }
  .card-item-date__icon {
    margin-right: 5px;
    color: #f4863a;
    font-size: 20px;
  }
  .card-item-date__timestamp {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    .card-item__image {
      width: 100%;
      height: 220px;
    }
    .card-item-date {
      margin-top: 10px;
    }
    .button-wrapper {
      display: flex;
      justify-content: center;
    }
  }
`
export default function SchoolCard() {
  const router = useRouter()
  return (
    <Styles>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <img className="card-item__image" src="/blog__details.svg" alt="card-item" />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <div>
              <h1 className="card-item__title">Ukhta state technical university Komi Russia</h1>
              <div className="button-wrapper">
                <OutlinedButton
                  description="Apply Now"
                  action="click"
                  pagePath={process.browser ? window.location.pathname : ''}
                  title="Apply"
                  onClick={() => router.push('/')}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Styles>
  )
}
