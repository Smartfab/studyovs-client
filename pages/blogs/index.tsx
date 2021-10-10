import Head from 'next/head'
import config from '../../config/config'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import getArticles from '../../actions/get-articles'
import BlogCard from '../../components/shared/BlogCard'
import Layout from '../../components/shared/Layout'
import LoadingState from '../../components/shared/Loader'
import NotFound from '../../components/shared/NotFound'
import PageHeader from '../../components/shared/PageHeader'
import QueryPagination from '../../components/shared/QueryPagination'
import ServerError from '../../components/shared/ServerError'

export default function Articles() {
  const [page, setPage] = useState(1)
  const limit = 5
  const [query, setQuery] = useState({
    hasMore: false,
    totalPages: 0,
    totalBlogs: 0,
    currentPage: page,
    blogs: [],
  })
  const { isLoading, isError, isSuccess, error, isPreviousData, isFetching } = useQuery(
    ['articles', page],
    () => getArticles({ page, limit }),
    { keepPreviousData: true, onSuccess: (data) => setQuery(data) }
  )
  const handleNextPage = () => {
    if (!isPreviousData && query?.hasMore) {
      setPage((prev) => prev + 1)
    }
  }
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }
  return (
    <>
      <Head>
        <title>{config.clientName} | Blogs</title>
      </Head>
      <Layout page="blog">
        <PageHeader imgUrl="/articles__icon.svg" title="Blogs" />
        {isSuccess && query.blogs.map((post) => <BlogCard key={post.slug} post={post} />)}
        {isLoading && <LoadingState message="Loading Blogs" />}
        {isSuccess && !query.blogs.length ? <NotFound message="No Blog Found" /> : null}
        {isError && <ServerError error={error} />}
        <QueryPagination
          nextPage={handleNextPage}
          prevPage={handlePrevPage}
          hasMore={query.hasMore}
          currentPage={query.currentPage}
          totalPages={query.totalPages}
          isFetching={isFetching}
        />
      </Layout>
    </>
  )
}
