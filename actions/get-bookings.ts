import api from '../utils/api'

export default async function getBookings({ limit, page }: { limit: number; page: number }) {
  try {
    const res = await api.get(`/bookings?limit=${Number(limit)}&page=${Number(page)}`)
    return res.data
  } catch (error) {
    throw error.response.data.msg
  }
}
