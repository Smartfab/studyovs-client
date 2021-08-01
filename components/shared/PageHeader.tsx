import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  background: #f8fcff;
  background-color: #f8fcff;
  margin-bottom: 60px;
  .page-header__container {
    height: 200px;
    max-width: 719px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .page-header-icon {
    background: rgba(11, 174, 230, 0.1);
    width: 80px;
    height: 80px;
    img {
      height: 45px;
      width: 45px;
    }
    border-radius: 50%;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .page-header__title {
    font-weight: bold;
    font-size: 64px;
    line-height: 75px;
    color: #0baee6;
  }

  @media (max-width: 600px) {
    .page-header__title {
      font-size: 35px;
    }
    .page-header__container {
      height: 150px;
    }
    .page-header-icon {
      width: 60px;
      height: 60px;
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
`
export default function PageHeader({ imgUrl, title }) {
  return (
    <Styles>
      <div className="page-header__container">
        <div className="page-header-icon">
          <img src={imgUrl} alt="" className="page-header-icon__image" />
        </div>
        <span className="page-header__title">{title}</span>
      </div>
    </Styles>
  )
}
