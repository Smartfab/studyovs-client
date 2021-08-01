import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  // max-width: 300px;
  .service-icon {
  }
  .service-details {
    margin-left: 15px;
  }
  .service-details__title {
    margin: 0;
    margin-bottom: 13px;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
  .service-details__text {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #575a5a;
  }
  .service-icon__wrapper {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
export default function ServiceItem({ serviceItem }) {
  const { title, text, bgColor, iconUrl } = serviceItem
  return (
    <Styles bgColor>
      <div className="service-icon__wrapper" style={{ backgroundColor: bgColor }}>
        <img src={iconUrl} alt="" className="service-icon" />
      </div>
      <div className="service-details">
        <h1 className="service-details__title">{title}</h1>
        <p className="service-details__text">{text}</p>
      </div>
    </Styles>
  )
}
