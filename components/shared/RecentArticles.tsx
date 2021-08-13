import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CgArrowRightO } from 'react-icons/cg'
import { BsArrowRight } from 'react-icons/bs'
import { Grid } from '@material-ui/core'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PaddingResizer from '../../styles/PaddingResizer'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import getArticles from '../../actions/get-articles'
import capitalizeFirstLetter from '../../utils/capitalize-first-letter'

const Styles = styled.div`
  margin: 100px 0;
  overflow: hidden;
  .articles {
  }
  .articles__caption {
    font-weight: bold;
    font-size: 48px;
    line-height: 42px;
    margin: 0 0 20px 0;
  }
  .articles__tag {
    font-size: 25px;
    max-width: 536px;
    line-height: 27px;
    color: rgb(0, 0, 0);
    margin: 0 0 50px 0;
  }
  .articles-cta {
    font-size: 20px;
    line-height: 16px;
    color: #000000;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .articles-cta__icon {
    flex-shrink: 0;
    margin-left: 10px;
  }
  .articles-container {
    max-width: 1370px;
    margin: 0 auto;
    display: flex;
    margin-top: 70px;
    gap: 5px;
    flex-wrap: wrap;
  }
  .article-item {
    position: relative;
    width: 100%;
    height: 300px;
  }
  .article-item__image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .article-item__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .article-item-details {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: #fff;
    top: 0;
    left: 0;
    justify-content: center;
  }
  .article-item-details__title {
    font-size: 18px;
    line-height: 21px;
    color: #ffffff;
    width: 230px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    :hover {
      cursor: pointer;
    }
  }
  .article-item-button {
    align-items: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #fff;
    background: inherit;
    border: 2px solid #fff;
    box-sizing: border-box;
    border-radius: 33px;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: fit-content;
  }
  .article-item-button__icon {
    margin-left: 10px;
    flex-shrink: 0;
    font-size: 20px;
  }

  @media (max-width: 600px) {
    .article-item-details__title {
      display: flex;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      align-items: center;
    }
    .article-item {
      margin-bottom: 5px;
    }
  } ;
`

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
      type: 'spring',
      bounce: 1,
      damping: 200,
      mass: 0.4,
      when: 'beforeChildren',
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function RecentArticles() {
  const { inView, ref } = useInView({ threshold: 0.1 })
  const caption = useAnimation()
  const btnCta = useAnimation()
  const containerAnimation = useAnimation()
  const itemAnimation = useAnimation()
  const router = useRouter()
  const page: number = 1
  const limit: number = 4
  const [query, setQuery] = useState({
    hasMore: false,
    totalPages: 0,
    totalBlogs: 0,
    currentPage: page,
    blogs: [],
  })

  const { isLoading } = useQuery(['articles', page], () => getArticles({ page, limit }), {
    keepPreviousData: true,
    onSuccess: (data) => {
      setQuery(data)
    },
  })
  useEffect(() => {
    if (inView) {
      caption.start('visible')
      containerAnimation.start('visible')
      itemAnimation.start('visible')
      btnCta.start({
        x: 0,
        transition: {
          type: 'spring',
          duration: 1,
          stiffness: 200,
        },
      })
    }
  }, [inView, caption, btnCta, containerAnimation, itemAnimation])
  const textVariants = {
    hidden: {
      x: '-100vw',
      opacity: 0,
    },
    visible: { x: '0', opacity: 1, transition: {} },
  }

  return (
    <Styles ref={ref}>
      <PaddingResizer>
        <div className="articles">
          <motion.h5
            variants={textVariants}
            initial="hidden"
            animate={caption}
            className="articles__caption"
          >
            Don’t miss our recent articles
          </motion.h5>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={caption}
            className="articles__tag"
          >
            Stay connected and current with latest updates from insitutions in your dream country
          </motion.p>
          <motion.div
            initial={{ x: '100vw' }}
            animate={btnCta}
            whileHover={{
              color: '#f4863a',
              transition: {
                duration: 0.5,
              },
            }}
            className="articles-cta"
            onClick={() => router.push('/blogs')}
          >
            See Articles
            <motion.div
              whileHover={{
                scale: 1.1,
                x: [-5, 5],
                transition: {
                  type: 'springs',
                  duration: 0.6,
                  mass: 0.2,
                  stiffness: 0.1,
                  yoyo: Infinity,
                  damping: 0,
                  bounce: 0.5,
                },
              }}
            >
              <CgArrowRightO className="articles-cta__icon" />
            </motion.div>
          </motion.div>
        </div>
      </PaddingResizer>
      <motion.div
        className="articles-container"
        variants={container}
        animate={containerAnimation}
        initial="hidden"
      >
        <Grid container spacing={0}>
          {query?.blogs.length > 3 &&
            query?.blogs.map((articleItem) => (
              <Grid item xs={12} sm={6} md={3} key={articleItem._id}>
                <motion.div className="article-item" variants={item}>
                  {articleItem?.image?.url && (
                    <img src={articleItem.image?.url} className="article-item__image" alt="" />
                  )}
                  <div className="article-item__overlay" />
                  <div className="article-item-details">
                    <h5 className="article-item-details__title">
                      <span>{capitalizeFirstLetter(articleItem.title)}</span>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#f4863a',
                          borderColor: '#f4863a',
                          color: '#fff',
                          x: [1, 0],
                          transition: {
                            duration: 1,
                          },
                        }}
                        className="article-item-button"
                        onClick={() => router.push(`/blogs/${articleItem.slug}`)}
                      >
                        Read Article
                        <motion.div>
                          <BsArrowRight className="article-item-button__icon" />
                        </motion.div>
                      </motion.div>
                    </h5>
                  </div>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </motion.div>
    </Styles>
  )
}
