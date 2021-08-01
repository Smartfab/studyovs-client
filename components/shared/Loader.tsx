import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 30px 0;
  margin-bottom: 20px;
  .loading__image {
    width: 100px;
    height: 200px;
  }
`

export default function LoadingState({ message, style }: { message: string; style?: object }) {
  return (
    <Styles style={style}>
      <img src="/loading.svg" className="loading__image" />
      <p>{message}</p>
    </Styles>
  )
}
