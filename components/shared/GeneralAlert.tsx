import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GrClose } from 'react-icons/gr'
import PaddingResizer from '../../styles/PaddingResizer'
import { useQuery } from 'react-query'
import getAlert from '../../actions/get-alert'
import { useRouter } from 'next/router'

const Styles = styled.div`
  background-color: rgba(245, 201, 171, 1);
  color: #f4863a;
  width: 100%;
  opacity: 1;
  font-size: 14px;
  color: #575a5a;
  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    height: 100%;
  }
  .cancel__button {
    cursor: pointer;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 2.5em;
    background: 0 0;
    border: none;
    transition: all 0.5s ease;
    border-radius: 50%;

    :hover {
      color: #fff;
      background: #ffb786;
    }
  }
  .alert__message {
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    display: inline-block;
  }
  .alert__button {
    border-radius: 32px;
    display: inline-block;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    :hover {
      color: #f4863a;
    }
  }
`

export default function GeneralAlert() {
  const [alert, setAlert] = useState(null)
  useQuery(['alert'], getAlert, {
    onSuccess: (alert) => {
      if (alert?._id) {
        const isCancelledAlert = JSON.parse(localStorage.getItem(alert._id))
        if (!isCancelledAlert) {
          setShow(true)
          setAlert(alert)
          return
        }
      }
      return
    },
  })
  const [show, setShow] = useState(true)
  const handleCancel = () => {
    setShow(false)
    localStorage.setItem(alert._id, JSON.stringify(true))
  }
  const router = useRouter()

  if (!show) return null
  return (
    <>
      {alert ? (
        <>
          <Styles>
            <PaddingResizer>
              <div className="alert">
                <div className="alert__message">
                  <span>{alert.message}</span>{' '}
                  {alert.alertButtonText && (
                    <strong
                      className="alert__button"
                      onClick={() => router.push(alert.alertButtonLink)}
                    >
                      {alert.alertButtonText}
                    </strong>
                  )}
                </div>
                <div className="cancel__button">
                  <GrClose onClick={handleCancel} />
                </div>
              </div>
            </PaddingResizer>
          </Styles>
        </>
      ) : null}
    </>
  )
}
