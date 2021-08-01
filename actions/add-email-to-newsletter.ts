import api from '../utils/api'

export default async function addEmilToNewsletter({
  email,
  ip,
  device,
}: {
  email: string
  ip: object
  device: object
}) {
  try {
    const res = await api.post(`/newsletters/subscribe`, { email, ip, device })
    return res.data
  } catch (err) {
    throw err.response.data.msg
  }
}
