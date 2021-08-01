import config from '../../config/config'
import api from '../../utils/api'

const { isProduction } = config

export default async function eventViewRecorder({
  action,
  pagePath,
  description,
  ip,
  device,
  label,
}: {
  pagePath: string
  description: string
  action: string
  label: string
  ip: object
  device: object
}): Promise<void> {
  try {
    if (isProduction) {
      await api.post('/analytics/record-event-view', {
        pagePath,
        action,
        description,
        ip,
        device,
        label,
      })
      return null
    }
  } catch (err) {
    return null
  }
}
