export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const pageview = (url: URL): void => {
  if (window && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}
type GTagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (window && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}
