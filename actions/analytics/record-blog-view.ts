import config from '../../config/config'
import api from '../../utils/api'

const { isProduction } = config
export default async function recordBlogView({ id, ip, device }): Promise<void> {
  try {
    if (isProduction) {
      await api.post(`/blogs/analytics/${id}/record-blog-view`, { ip, device })
      return null
    }
    return null
  } catch (err) {
    if (err) throw err.response.data.msg
  }
}
