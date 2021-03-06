const getDeviceType = () => {
  const width = window?.screen?.width
  const normalOrientation = () => {
    if (
      window?.screen?.orientation?.type === 'portrait-primary' ||
      window?.screen?.orientation?.type === 'portrait-secondary'
    ) {
      return true
    }
    return false
  }
  if (width < 600 && normalOrientation) return 'mobile'
  if ((normalOrientation && width > 724) || width < 1024) return 'tablet'
  return 'desktop'
}

export default function getDeviceDetails() {
  const { cookieEnabled, platform, language } = window?.navigator
  const { height, width, orientation } = window?.screen
  return {
    deviceType: getDeviceType(),
    language,
    platform,
    orientation: orientation?.type ?? 'landscape-primary',
    height,
    width,
    cookieEnabled,
  }
}
