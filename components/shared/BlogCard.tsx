import { Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { MdDateRange } from 'react-icons/md'
import { useRouter } from 'next/router'
import OutlinedButton from './OutlinedButton'
import dateFormatter from '../../utils/date-formatter'
import wordShortener from '../../utils/wordShortener'

const Styles = styled.div`
  max-width: 719px;
  margin: 0 auto;
  margin-bottom: 50px;
  overflow: hidden;
  padding: 0 10px;
  .blog__image {
    height: 180px;
    width: 200px;
    object-fit: cover;
  }
  .blog__title {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    cursor: pointer;
    margin: 20px 0;
    :hover {
      color: #f4863a;
    }
  }
  .blog-date {
    display: flex;
    align-items: center;
  }
  .blog-date__icon {
    margin-right: 5px;
    color: #f4863a;
    font-size: 20px;
  }
  .blog-date__timestamp {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    .blog__image {
      width: 100%;
      height: 220px;
    }
    .blog-date {
      margin-top: 10px;
    }
    .button-wrapper {
      display: flex;
      justify-content: center;
    }
  }
`
export default function BlogCard({ post }) {
  const router = useRouter()
  return (
    <Styles>
      <div className="wrapper">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <img
              className="blog__image"
              src={post?.image?.url ? post.image.url : '/no-blog-image.png'}
              alt="blog"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <div className="blog__details">
              <div className="blog-date">
                <MdDateRange className="blog-date__icon" />
                <time className="blog-date__timestamp">{dateFormatter(post.timestamp)}</time>
              </div>
              <h1
                className="blog__title"
                onClick={() => router.push(`/blogs/${post.slug}`)}
                onKeyPress={() => router.push(`/blogs/${post.slug}`)}
              >
                {wordShortener(post.title, 20)}
              </h1>
              <div className="button-wrapper">
                <OutlinedButton
                  align="left"
                  description="Blog card button"
                  action="click"
                  pagePath={process.browser ? window.location.pathname : ''}
                  title="Read Article"
                  onClick={() => router.push(`/blogs/${post.slug}`)}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Styles>
  )
}
