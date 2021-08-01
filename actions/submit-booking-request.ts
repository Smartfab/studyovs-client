import api from '../utils/api'

export default async function submitBookingRequest(applicationForm) {
  try {
    const res = await api.post('/booking-requests', applicationForm)
    return res.data.msg
  } catch (error) {
    throw error.response.data.msg
  }
}
