'use client'
import mobx from '@/mobx/mobx'
import css from './PatternDetails.module.css'
import {motion} from 'framer-motion'
import favorite from './img/favorite.svg'
import plus from './img/plus.svg'
import arrow from './img/arrow.svg'
import Image from 'next/image'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'


const PatternDetails = observer(() => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [name1Flag, setName1Flag] = useState(false)
  const [name2Flag, setName2Flag] = useState(false)
  const [name3Flag, setName3Flag] = useState(false)
  const [name4Flag, setName4Flag] = useState(false)
  const [name5Flag, setName5Flag] = useState(false)
  const [name6Flag, setName6Flag] = useState(false)
  const [name7Flag, setName7Flag] = useState(false)



  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setPatternDetails(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>{mobx.OnePattern.name}</h2>
                 <div className={css.btnRow}>
                    <div className={css.btn}>
                        <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                    <div className={css.btn} onClick={()=> {mobx.setUpdatePattern(true);mobx.setPatternDetails(false)}}>
                        <Image src={plus} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                 </div>

            </div>
            <span className={css.label}>Описание</span>
            <span className={css.description}>{mobx.OnePattern.description}</span>
            <span className={css.label}>Рекомендации</span>
            <span className={css.description}>{mobx.OnePattern.recomendation}</span>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>Приемы пищи</h2>
            </div>
            {mobx.OnePattern.name1&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName1Flag(!name1Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name1}</span>
                <Image src={arrow} alt='' className={name1Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name1Flag&&
              <motion.span initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardDescription}>{mobx.OnePattern.description1}</motion.span>
              }
            </>
            }
            {mobx.OnePattern.name2&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName2Flag(!name2Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name2}</span>
                <Image src={arrow} alt='' className={name2Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name2Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description2}</span>
              }
            </>
            }
            {mobx.OnePattern.name3&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName3Flag(!name3Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name3}</span>
                <Image src={arrow} alt='' className={name3Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name3Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description3}</span>
              }
            </>
            }
            {mobx.OnePattern.name4&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName4Flag(!name4Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name4}</span>
                <Image src={arrow} alt='' className={name4Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name4Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description4}</span>
              }
            </>
            }
            {mobx.OnePattern.name5&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName5Flag(!name5Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name5}</span>
                <Image src={arrow} alt='' className={name5Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name5Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description5}</span>
              }
            </>
            }
            {mobx.OnePattern.name6&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName6Flag(!name6Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name6}</span>
                <Image src={arrow} alt='' className={name6Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name6Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description6}</span>
              }
            </>
            }
            {mobx.OnePattern.nam76&&
            <>
              <div className={css.cardNameButton} onClick={()=>setName7Flag(!name7Flag)}>
                <span className={css.cardName}>{mobx.OnePattern.name7}</span>
                <Image src={arrow} alt='' className={name7Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`}/>
              </div>
              {name7Flag&&
              <span className={css.cardDescription}>{mobx.OnePattern.description7}</span>
              }
            </>
            }
        </motion.div>
    </motion.div>
  )
})

export default PatternDetails