import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { MdDateRange } from 'react-icons/md'
import Head from 'next/head'
import { useQuery } from 'react-query'
import Layout from '../../components/shared/Layout'
import config from '../../config/config'
import ServerError from '../../components/shared/ServerError'
import LoadingState from '../../components/shared/Loader'
import capitalizeFirstLetter from '../../utils/capitalize-first-letter'
import getScholarship from '../../actions/get-scholarship.ts'
import dateFormatter from '../../utils/date-formatter'
import { nanoid } from 'nanoid'
import OutlinedButton from '../../components/shared/OutlinedButton'

const Styles = styled.div`
  .scholarship__wrapper {
    background-color: #f8fcff;
  }
  .scholarship__title {
    font-size: 25px;
  }
  .scholarship__container {
    max-width: 719px;
    margin: 0 auto;
    padding: 0 10px;
  }
  .scholarship__image {
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .scholarship-date {
    display: flex;
    align-items: center;
    color: #f4863a;
  }
  .scholarship-date__icon {
    margin-right: 5px;
    font-size: 20px;
  }
  .scholarship-date__timestamp {
    font-size: 16px;
  }

  .how-to__number {
    margin-right: 10px;
  }
  .how-to__list {
    background: #fdf5ed;
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    margin: 10px 5px 10px 0;
    font-size: 12px;
    white-space: wrap;
  }
  .scholarship__image-details {
    display: flex;
    flex-wrap: nowrap;
  }
  .scholarship__details {
    margin-left: 10px;
  }
  .scholarship__value {
    // color: red;
  }
  .scholarship__tag-value {
    margin-bottom: 10px;
  }
  .scholarship__header {
    background: #f8fcff;
    max-width: 719px;
    margin: 0 auto;
    padding: 20px 10px;
    margin-bottom: 40px;
  }
  .scholarship__spacer {
    margin-bottom: 40px;
    h3 {
      color: #f4863a;
    }
  }
`

const Tag = styled.div`
  color: #aaa;
  font-size: 14px;
  margin-bottom: 5px;
`
export default function ScholarshipPage() {
  const router = useRouter()
  const { scholarshipId } = router.query
  const { isLoading, data: scholarship, error, isError } = useQuery(
    ['scholarship', scholarshipId],
    () => getScholarship(scholarshipId as string)
  )
  return (
    <Styles>
      <Head>
        <title>
          {config.clientName} | {scholarship?.title}
        </title>
      </Head>
      <Layout>
        {scholarship && (
          <>
            <div className="scholarship__wrapper">
              <div className="scholarship__header">
                <h1 className="scholarship__title">{capitalizeFirstLetter(scholarship.title)}</h1>
                <div>
                  <span className="scholarship-date">
                    <MdDateRange className="scholarship-date__icon" />
                    <time className="scholarship-date__timestamp">
                      {dateFormatter(scholarship.timestamp)}
                    </time>
                  </span>
                </div>
              </div>
            </div>
            <div className="scholarship__container">
              <div className="scholarship__image-details">
                <img
                  className="scholarship__image"
                  src={scholarship?.image?.url}
                  alt="scholarship__thumbnail"
                />
                <div className="scholarship__details">
                  <div className="scholarship__tag-value">
                    <Tag>Organization</Tag>
                    <div className="scholarship__value"> {scholarship.organization}</div>
                  </div>
                  <div className="scholarship__tag-value">
                    <Tag>Who Can Apply</Tag>
                    <div className="scholarship__value">{scholarship.whoCanApply}</div>
                  </div>
                  <div className="scholarship__tag-value">
                    <Tag>Country</Tag>
                    <div className="scholarship__value">{scholarship.country}</div>
                  </div>
                  <div className="scholarship__tag-value">
                    <Tag>Application Deadline</Tag>
                    <div className="scholarship__value">{scholarship.applicationDeadline}</div>
                  </div>
                </div>
              </div>
              <div className="scholarship__spacer">
                <h3>Description</h3>
                <p>{scholarship.description}</p>
              </div>
              <div className="scholarship__spacer">
                <h3>How to Apply</h3>
                {scholarship.howToApply.length ? (
                  <>
                    {scholarship?.howToApply?.map((howToApplyListItem, index) => (
                      <div key={nanoid()} className="how-to__list">
                        <span className="how-to__number">{index + 1}</span>
                        {howToApplyListItem}
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
              <OutlinedButton
                description="scholarship button"
                action="click"
                pagePath={process.browser ? window.location.pathname : ''}
                title="Visit Source"
                onClick={() => router.push(scholarship.scholarshipSourceLink)}
              />
            </div>
          </>
        )}
        {isLoading && <LoadingState style={{ minHeight: '500px' }} message="Loading scholarship" />}
        {isError && error && <ServerError error={error} />}
      </Layout>
    </Styles>
  )
}
