import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MdDateRange } from 'react-icons/md'
import Head from 'next/head'
import { useQuery } from 'react-query'
import Layout from '../../components/shared/Layout'
import getArticle from '../../actions/get-article'
import config from '../../config/config'
import ServerError from '../../components/shared/ServerError'
import LoadingState from '../../components/shared/Loader'
import EditorReader from '../../components/shared/EditorReader'
import capitalizeFirstLetter from '../../utils/capitalize-first-letter'
import dateFormatter from '../../utils/date-formatter'
import recordBlogView from '../../actions/analytics/record-blog-view'
import { useAnalytics } from '../../context/analytics'
import NotFound from '../../components/shared/NotFound'

const Styles = styled.div`
  .blog__wrapper {
    background-color: #f8fcff;
  }
  .blog__header {
    background: #f8fcff;
    max-width: 719px;
    margin: 0 auto;
    padding: 20px 10px;
    margin-bottom: 60px;
  }
  .blog__title {
    font-size: 25px;
  }
  .blog__container {
    max-width: 719px;
    margin: 0 auto;
    padding: 0 10px;
  }
  .blog__image {
    height: 400px;
    width: 100%;
    margin-bottom: 10px;
    object-fit: cover;
    @media (max-width: 600px) {
      height: 230px;
    }
  }
  .blog-date {
    display: flex;
    align-items: center;
    color: #f4863a;
  }
  .blog-date__icon {
    margin-right: 5px;
    font-size: 20px;
  }
  .blog-date__timestamp {
    font-size: 16px;
  }
  .blog-image__details {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .blog-image-details__header {
    color: orange;
    font-size: 14px;
    margin-right: 5px;
    font-weight: bold;
  }
  .blog-image-details__text {
    margin: 5px 0;
  }
`
export default function PostDetails() {
  const { ip, device } = useAnalytics()
  const router = useRouter()
  const { slug } = router.query
  const { isLoading, isSuccess, data: post, error, isError } = useQuery(['postDetails', slug], () =>
    getArticle(slug as string)
  )
  useEffect(() => {
    if (post && ip && device) {
      recordBlogView({
        id: post._id,
        ip,
        device,
      })
    }
  }, [post, ip, device])
  return (
    <Styles>
      <Head>
        <title>
          {config.clientName} | {slug}
        </title>
      </Head>
      <Layout>
        {post && (
          <>
            <div className="blog__wrapper">
              <div className="blog__header">
                <h1 className="blog__title">{capitalizeFirstLetter(post.title)}</h1>
                <div className="blog-date">
                  <MdDateRange className="blog-date__icon" />
                  <time className="blog-date__timestamp">{dateFormatter(post.timestamp)}</time>
                </div>
              </div>
            </div>
            <div className="blog__container">
              {post.image.url && (
                <>
                  <img className="blog__image" src={post.image.url} alt="blog__thumbnail" />
                  <div className="blog-image__details">
                    {post.image.caption && (
                      <p className="blog-image-details__text">
                        <span className="blog-image-details__header">Caption:</span>
                        {capitalizeFirstLetter(post.image.caption)}
                      </p>
                    )}
                    {post.image.source && (
                      <p className="blog-image-details__text">
                        <span className="blog-image-details__header">Source:</span>
                        {capitalizeFirstLetter(post.image.source)}
                      </p>
                    )}
                  </div>
                </>
              )}
              <EditorReader body={JSON.parse(post.postBody)} />
            </div>
          </>
        )}
        {isLoading && <LoadingState style={{ minHeight: '500px' }} message="Loading Post" />}
        {isError && error && <ServerError error={error} />}
        {isSuccess && !post && <NotFound message="No Blog Found" />}
      </Layout>
    </Styles>
  )
}
