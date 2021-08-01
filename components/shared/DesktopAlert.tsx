import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GrClose } from 'react-icons/gr'
import PaddingResizer from '../../styles/PaddingResizer'
import { useQuery } from 'react-query'
import getAlert from '../../actions/get-alert'
import { useRouter } from 'next/router'

const Styles = styled.div`
  height: 60px;
  background-color: rgba(245, 201, 171, 1);
  color: #f4863a;
  position: fixed;
  width: 100%;
  opacity: 1;
  z-index: 999999;
  top: 0;
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
  @media (max-width: 800px) {
    display: none;
  }
`

export default function DesktopAlert({ alert, show, handleCancel }) {
  if (!show) return null
  const router = useRouter()
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
