import React, { useState, useEffect } from 'react'
import getDeviceDetails from '../actions/analytics/get-device-details'
import getUserLocation from '../actions/analytics/get-user-location'
import pageVisitRecorder from '../actions/analytics/page-visit-recorder'
import recordUniqueVisitor from '../actions/analytics/record-unique-visitors'
const AnalyticsContext = React.createContext(null)

export function useAnalytics() {
  return React.useContext(AnalyticsContext)
}

export default function AnalyticsProvider({ children }) {
  const [ip, setIp] = useState({})
  const [device, setDevice] = useState(null)
  const getIp = async () => {
    const ip = await getUserLocation()
    if (ip) {
      setIp(ip)
    }
  }

  useEffect(() => {
    getIp()
    const device = getDeviceDetails()
    if (device) {
      setDevice(device)
    }
  }, [])

  const recordPageVisit = async (pagePath): Promise<void> => {
    await pageVisitRecorder({ ip, device, pagePath })
    await recordUniqueVisitor({ ip, device, pagePath })
  }

  return (
    <>
      <AnalyticsContext.Provider
        value={{
          ip,
          device,
          recordPageVisit,
        }}
      >
        {children}
      </AnalyticsContext.Provider>
    </>
  )
}
