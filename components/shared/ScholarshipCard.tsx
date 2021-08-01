import router from 'next/router'
import React from 'react'
import styled from 'styled-components'
import capitalizeFirstLetter from '../../utils/capitalize-first-letter'
import wordShortener from '../../utils/wordShortener'
import OutlinedButton from './OutlinedButton'

const Styles = styled.div`
  padding: 20px 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 50px;
  .scholarship-container {
    display: flex;
    justify-content: space-between;
  }
  .scholarship-title__name {
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    color: #f4863a;
    margin: 0;
  }
  .scholarship-country__flag {
    height: 100px;
    width: 100px;
    margin-left: 10px;
  }
  .scholarship__details {
    font-size: 14px;
    line-height: 19px;
  }
  .scholarship-tag {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 15px;
    margin-right: 10px;
    white-space: nowrap;
  }
  .scholarship-tag__title {
    margin-right: 10px;
    font-weight: bold;
  }
  .scholarship__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
  .scholarship-tags {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0 20px 0;
  }
  .scholarship-title__flag {
    display: none;
  }
  .scholarship-title {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 15px;
  }
  @media (max-width: 600px) {
    .scholarship-country__flag {
      display: none;
    }
    .scholarship-title__flag {
      display: flex;
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
  }
`

export default function ScholashipCard({ scholarship }) {
  return (
    <Styles>
      <div className="scholarship-container">
        <div className="scholarship-container-details">
          <div className="scholarship-title">
            <img
              className="scholarship-title__flag"
              src={`${scholarship?.image?.url}`}
              alt="country-flag"
            />
            <h1 className="scholarship-title__name">
              {capitalizeFirstLetter(wordShortener(scholarship.title, 20))}
            </h1>
          </div>
          <div className="scholarship__details">
            {capitalizeFirstLetter(wordShortener(scholarship.description, 40))}
          </div>
        </div>
        <div>
          <img
            className="scholarship-country__flag"
            src={`${scholarship?.image?.url}`}
            alt="country-flag"
          />
        </div>
      </div>
      <div className="scholarship__cta">
        <OutlinedButton
          description="scholarship button"
          action="click"
          pagePath={process.browser ? window.location.pathname : ''}
          title="See More"
          onClick={() => router.push(`/scholarships/${scholarship._id}`)}
        />
      </div>
    </Styles>
  )
}
