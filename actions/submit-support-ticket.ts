import api from '../utils/api'

export default async function submitSupportTicket(supportForm) {
  try {
    const res = await api.post('/supports', supportForm)
    return res.data.msg
  } catch (error) {
    throw error.response.data.msg
  }
}
