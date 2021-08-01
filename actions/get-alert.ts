import api from '../utils/api'

export default async function getAlert() {
  try {
    const res = await api.get(`/alerts/client/active`)
    return res.data.alert
  } catch (error) {
    throw error.response.data.msg
  }
}
