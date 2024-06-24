import Image from 'next/image'
import css from './RightModalHeader.module.css'
import favorite from './img/favorite.svg'

const RightModalHeader = ({title,isIcon=true}) => {
  return (
    <div className={css.headerContainer}>
    <h2 className={css.header}>{title}</h2>
    {isIcon &&<div className={css.btn}>
      <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
    </div>}
  </div>
  )
}

export default RightModalHeader