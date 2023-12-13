import React from 'react'
import styles from './button.module.css'

const Button = ({props, onClick}) => {
  return (
    <button onClick={onClick} className={styles.button}>{props}</button>
  )
}

export default Button