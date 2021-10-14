import React from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  .contact-card {
    display: flex;
  }
  .contact-card__icon {
    margin-right: 15px;
    color: #0baee6;
    font-size: 30px;
  }
  .details__title {
    margin-top: 0;
    font-size: 18px;
    margin-bottom: 25px;
  }
  .details__text {
    font-size: 13px;
    margin-top: 0;
  }
`
export default function ContactCard({
  title,
  texts,
  icon,
}: {
  title: string
  texts: React.ReactNode[]
  icon: React.ReactNode
}) {
  return (
    <Styles>
      <div className="contact-card">
        <div className="contact-card__icon">{icon}</div>
        <div className="contact-card__details">
          <h5 className="details__title">{title}</h5>
          {texts.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
      </div>
    </Styles>
  )
}
