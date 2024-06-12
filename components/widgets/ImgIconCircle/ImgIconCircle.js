import Image from 'next/image'
import css from './ImgIconCircle.module.css'

const ImgIconCircle = ({url}) => {
  return (
    <Image className={css.img} width={100} height={100} unoptimized sizes='100' src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${url}`} />
  )
}

export default ImgIconCircle