import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ScholashipCard from '../../components/shared/ScholarshipCard'
import Layout from '../../components/shared/Layout'
import LoadingState from '../../components/shared/Loader'
import NotFound from '../../components/shared/NotFound'
import PageHeader from '../../components/shared/PageHeader'
import QueryPagination from '../../components/shared/QueryPagination'
import ServerError from '../../components/shared/ServerError'
import config from '../../config/config'
import Head from 'next/head'
import getScholarships from '../../actions/get-scholarships'
import ColumnResizer from '../../components/shared/ColumnResizer'
import { nanoid } from 'nanoid'

export default function scholarshipIndexPage() {
  const [page, setPage] = useState(1)
  const limit = 5
  const [query, setQuery] = useState({
    hasMore: false,
    totalPages: 0,
    totalScholarships: 0,
    currentPage: page,
    scholarships: [],
  })
  const { isLoading, isError, isSuccess, error, isPreviousData, isFetching } = useQuery(
    ['scholarships', page],
    () => getScholarships({ page, limit }),
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
        <title>{config.clientName} | Scholarships</title>
      </Head>
      <Layout>
        <PageHeader imgUrl="/articles__icon.svg" title="Scholarships" />
        <ColumnResizer>
          {isSuccess &&
            query.scholarships.map((scholarship) => (
              <ScholashipCard key={nanoid()} scholarship={scholarship} />
            ))}
          {isLoading && <LoadingState message="Loading All Available scholarships" />}
          {isSuccess && !query.scholarships.length && <NotFound message="No scholarship Found" />}
          {isError && <ServerError error={error} />}
          <QueryPagination
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            hasMore={query.hasMore}
            currentPage={query.currentPage}
            totalPages={query.totalPages}
            isFetching={isFetching}
          />
        </ColumnResizer>
      </Layout>
    </>
  )
}
