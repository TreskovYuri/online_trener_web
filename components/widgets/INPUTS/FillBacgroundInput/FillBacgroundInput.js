import Image from 'next/image'
import css from './FillBacgroundInput.module.css'
import search from './img/search.svg'

const FillBacgroundInput = ({value, setValue, placeholder='Найти', isIcon = true, className='',onSubmit=()=>{}}) => {
  return (
    <div className={css.container}>
        <input value={value} onChange={e => setValue(e.target.value)} className={`${css.input} ${className}`} placeholder = {placeholder} onKeyDown={e => {if (e.key ==='Enter')onSubmit()}} />
        {isIcon&&<Image src={search} className={css.icon} />}
    </div>
  )
}

export default FillBacgroundInput