import api from '../utils/api'

export default async function submitApplication(applicationForm) {
  try {
    const res = await api.post('/applications', applicationForm)
    return res.data
  } catch (error) {
    throw error.response.data.msg
  }
}
