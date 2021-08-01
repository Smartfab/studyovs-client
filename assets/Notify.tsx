/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface NotifyProps {
  type: string
  message: string
}

export default function Notify({ type, message }: NotifyProps) {
  useEffect(() => {
    toast[type](message)
  }, [type, message])
  return <ToastContainer />
}
