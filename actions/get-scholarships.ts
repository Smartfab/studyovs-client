import api from '../utils/api'

export default async function getScholarships({ limit, page }: { limit: number; page: number }) {
  try {
    const res = await api.get(`/scholarships?limit=${Number(limit)}&&page=${Number(page)}`)
    return res.data
  } catch (error) {
    throw error.response.data.msg
  }
}
