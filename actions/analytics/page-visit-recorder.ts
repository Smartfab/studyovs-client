import config from '../../config/config'
import api from '../../utils/api'

const { isProduction } = config
export default async function pageVisitRecorder({ pagePath, ip, device }): Promise<void> {
  try {
    if (isProduction) {
      await api.post('/analytics/record-page-view', { ip, pagePath, device })
      return null
    }
    return null
  } catch (err) {
    if (err) throw err.response.data.msg
  }
}
