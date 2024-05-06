'use client'
import css from './Sidebar.module.css'
import Link from 'next/link'
import img1 from './img/img1.svg'
import img2 from './img/img2.svg'
import img3 from './img/img3.svg'
import img4 from './img/img4.svg'
import img5 from './img/img5.svg'
import img6 from './img/img6.svg'
import img7 from './img/img7.svg'
import img8 from './img/img8.svg'
import img9 from './img/img9.svg'
import ska from './img/ska.svg'
import km from './img/km.svg'
import ex from './img/exit.svg'
import settings from './img/settings.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import UserUtills from '@/http/UserUtills'
import { observer } from 'mobx-react-lite'
import mobx from '@/mobx/mobx'

export const dynamic = 'force-dynamic'

const Sidebar = observer(() => {
  const router = useRouter()
  const  exit = async() => {
    
      const data = await UserUtills.logout()
      if(data === 'ok'){
        router.push('/')
      }
  }
  return (
    <div className={css.container}>
          <Link href={'/admin/profile'} className={css.imgContainer}>
            <Image src={ska} className={css.imgLogo} alt='Логотип СКА' />
            <Image src={km} className={css.imgLogo} alt='Логотип Красная машина юниор' />
        </Link>
        <h1 className={css.header}>Онлайн тренер</h1>
      <div className={css.linkContainer}>
      <Link href='' className={mobx.pageName==='Журнал'?`${css.link} ${css.active}`:`${css.link}`}><Image src={img1} className={css.img}/>Журнал</Link>
        <Link href='/admin/sportsmans' className={mobx.pageName==='Спортсмены'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img2} className={css.img}/>Спортсмены</Link>
        <Link href='' className={mobx.pageName==='Чаты'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img3} className={css.img}/>Чаты</Link>
        <Link href='/admin/guide' className={mobx.pageName==='Справочники'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img4} className={css.img}/>Справочники</Link>
        <Link href='/admin/training' className={mobx.pageName==='Тренировки'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img5} className={css.img}/>Тренировки</Link>
        <Link href='/admin/nutrition' className={mobx.pageName==='Шаблоны питания'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img6} className={css.img}/>Питание</Link>
        <Link href='' className={mobx.page==='Нутриенты'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img7} className={css.img}/>Нутриенты</Link>
        <Link href='/admin/sportprogramm' className={mobx.pageName==='Спортивная программа'?`${css.link} ${css.active}`:`${css.link}`}><Image alt='Онлайн-Тренер' src={img8} className={css.img}/>Спортивная программа</Link>
        <Link href='/admin/consultation' className={mobx.pageName==='Консультации'?`${css.link} ${css.active}`:`${css.link}`}><Image src={img9} className={css.img}/>Консультации</Link>
      </div>
      <div className={css.exitContainer}>
        <Link href='/' className={mobx.page==='settings'?`${css.link} ${css.active}`:`${css.link}`}><Image src={settings} className={css.img} onClick={()=>mobx.setPage('settings')}/>Настройки</Link>
        <div onClick={exit} className={`${css.link} ${css.exit}`}><Image src={ex} className={css.img}/>Выход</div>
      </div>

        
    </div>
  )
})

export default Sidebar