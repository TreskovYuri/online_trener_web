import React, { useState } from 'react'
import css from './DescriptionModalTitleArrow.module.css'

const DescriptionModalTitleArrow = ({title, description}) => {
    const [modal,setModal] = useState(false)
  return (
    <div className={css.container}>
        <div className={css.header}>
            <span>{title}</span>
        </div>
        <div className={css.body}>{description}</div>
    </div>
  )
}

export default DescriptionModalTitleArrow