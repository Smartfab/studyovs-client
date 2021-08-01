import api from '../utils/api'

export default async function getArticle(slug: string) {
  try {
    const res = await api.get(`/blogs/${slug}`)
    return res.data
  } catch (error) {
    throw error.response.data.msg
  }
}
