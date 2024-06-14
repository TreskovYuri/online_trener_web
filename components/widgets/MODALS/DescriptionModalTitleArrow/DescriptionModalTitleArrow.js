import React, { useState } from 'react'
import css from './DescriptionModalTitleArrow.module.css'
import arrow from './img/arrow.svg'
import Image from 'next/image'
import OpacityDiv from '../../MOTION/OpacityDiv/OpacityDiv'

const DescriptionModalTitleArrow = ({title, description}) => {
    const [modal,setModal] = useState(false)
  return (
    <div className={css.container}>
        <div className={css.header} onClick={()=>setModal(!modal)}>
            <span>{title}</span>
            <Image src={arrow} unoptimized className={`${css.arrow} ${modal?css.activeArrow:''}`}/>
        </div>
        {modal&&<OpacityDiv className={css.body}>{description}</OpacityDiv>}
    </div>
  )
}

export default DescriptionModalTitleArrow