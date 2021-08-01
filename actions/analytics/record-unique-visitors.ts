import FingerprintJS from '@fingerprintjs/fingerprintjs'
import api from '../../utils/api'

export default async function recordUniqueVisitor({
  ip,
  device,
  pagePath,
}: {
  ip: object
  device: object
  pagePath: string
}) {
  try {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    const visitorId = result.visitorId
    if (visitorId) {
      const res = await api.post('/analytics/record-unique-visitor', {
        ip,
        identifier: visitorId,
        pagePath,
        device,
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}
