import React from 'react'
import { TiLocation } from 'react-icons/ti'
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
    margin-bottom: 10px;
  }
  .details__text {
    font-size: 13px;
    margin-top: 0;
  }

  .addresses__wrapper {
    display: flex;
    flex-wrap: nowrap;
  }

  @media (max-width: 700px) {
    .addresses__wrapper {
      flex-wrap: wrap;
    }
  }
  .col-1 {
    width: 150px;
  }
`
export default function Addresses() {
  return (
    <Styles>
      <div className="contact-card">
        <div className="contact-card__icon">
          <TiLocation />
        </div>
        <div className="contact-card__details">
          <h5 className="details__title">Addresses</h5>
          <div className="addresses__wrapper">
            <div className="col-1">
              <h4 style={{ color: 'gray', marginBottom: 10 }}>California</h4>
              <span className="details__text">
                1043 Garland Ave <br /> San Jose,
                <br /> CA 95126-3159. <br />
                United States
              </span>
            </div>
            <div>
              <h4 style={{ color: 'gray', marginBottom: 10 }}>Cheshire</h4>
              <span className="details__text">
                7 Greys Court, <br />
                Kingsland Grange, <br />
                Warrington, WA1 4SH, <br />
                United Kingdom
              </span>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  )
}
