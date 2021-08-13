import styled from 'styled-components'
import { motion } from 'framer-motion'

const Styles = styled(motion.div)`
  margin: 100px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 121;
  .title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }
  .caption {
    font-size: 14px;
    line-height: 15px;
    color: #8b8888;
    margin: 15px 0 25px 0;
    text-align: center;
  }
  .newsletter {
    border: 2px solid #00a8e2;
    box-sizing: border-box;
    border-radius: 30px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    max-width: 482px;
    height: 55px;
    justify-content: space-between;
  }
  .newsletter__input {
    border: none;
    outline: none;
    width: 100%;
    min-width: 250px;
    font-size: 18px;
    &:focus {
      .newsletter {
        border-color: yellow;
      }
    }
  }
  .newsletter-button {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background: rgba(0, 168, 226, 0.1);
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;

    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    :focus {
      border-radius: 50%;
    }
  }
  .newsletter-button__icon {
    color: #00a8e2;
    font-size: 20px;
    color: #00a8e2;
  }
  .input-error {
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: red;
  }
  .input-error__error {
    margin-right: 5px;
  }
`
export default Styles
