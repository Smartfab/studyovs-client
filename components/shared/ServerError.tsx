import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 30px 0;

  .image-wrapper {
    height: 200px;
    width: 200px;
    position: relative;
  }
  p {
    font-size: 16px;
  }
`

export default function ServerError({ error }) {
  return (
    <Styles>
      <div className="image-wrapper">
        <Image src="/server-error.svg" layout="fill" />
      </div>
      <p>{error}</p>
    </Styles>
  )
}
