'use client'
import mobx from '@/mobx/mobx'
import css from './Loader.module.css'
import { observer } from 'mobx-react-lite'

const Loader = observer(() => {
  return (
    <>
    {mobx.loading&&
      <div className={css.container}>
          <span className={css.loader}></span>
      </div>
    }
    </>

  )
})

export default Loader
