import { useEffect, useState } from 'react'

interface ObserversProps {
  root: Element | null
  rootMargin: string
  threshold: number[] | number
  element: HTMLElement | null
}
export default function useIntersectionObserver({
  root,
  threshold,
  rootMargin,
  element,
}: ObserversProps) {
  const [intersection, setIntersection] = useState<boolean>(false)
  useEffect(() => {
    if (element && typeof IntersectionObserver === 'function') {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersection(entries[0].isIntersecting)
      }
      const observer = new IntersectionObserver(handler, { root, threshold, rootMargin })
      observer.observe(element)
      return () => observer.disconnect()
    }
    return () => null
  })

  return { intersection }
}
