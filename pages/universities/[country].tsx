import { useRouter } from 'next/router'
import React from 'react'
import ApplicationForm from '../application'

export default function Articles() {
  const router = useRouter()
  const { country } = router.query
  return <ApplicationForm country={country} />
}
