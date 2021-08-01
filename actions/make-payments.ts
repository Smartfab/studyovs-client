import api from '../utils/api'

export default async function makePayment(paymentDetails) {
  try {
    const res = await api.post('/payments', paymentDetails)
    return res.data.msg
  } catch (error) {
    throw error.response.data.msg
  }
}
