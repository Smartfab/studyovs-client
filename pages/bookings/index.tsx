import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import getBookings from './../../actions/get-bookings'
import BookingCard from '../../components/shared/BookingCard'
import Layout from './../../components/shared/Layout'
import LoadingState from './../../components/shared/Loader'
import NotFound from './../../components/shared/NotFound'
import PageHeader from './../../components/shared/PageHeader'
import QueryPagination from './../../components/shared/QueryPagination'
import ServerError from './../../components/shared/ServerError'
import config from '../../config/config'
import Head from 'next/head'

export default function Bookings() {
  const [page, setPage] = useState(1)
  const limit = 5
  const [query, setQuery] = useState({
    hasMore: false,
    totalPages: 0,
    totalPosts: 0,
    currentPage: page,
    bookings: null,
  })
  const { isLoading, isError, isSuccess, error, isPreviousData, isFetching } = useQuery(
    ['bookings', page],
    () => getBookings({ page, limit }),
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
        <title>{config.clientName} | Bookings</title>
      </Head>
      <Layout page="bookings">
        <PageHeader imgUrl="/articles__icon.svg" title="Bookings" />
        {isSuccess &&
          query.bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)}
        {isLoading && <LoadingState message="Loading All Available Bookings" />}
        {isSuccess && !query.bookings.length && <NotFound message="No Booking Found" />}
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
