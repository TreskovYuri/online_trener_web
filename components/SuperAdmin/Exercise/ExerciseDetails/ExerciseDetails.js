'use client'
import mobx from '@/mobx/mobx'
import css from './ExerciseDetails.module.css'
import {motion} from 'framer-motion'
import plus from './img/plus.svg'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import img from '../../AddExercise/img/img.png'


const ExerciseDetails = observer(() => {



  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setExerciseDetails(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>{mobx.oneExercise.nameRu}<span>/ {mobx.oneExercise.nameEng}</span></h2>
                 <div className={css.btnRow}>

                    <div className={css.btn} onClick={()=> {mobx.setUpdateExercise(true);mobx.setExerciseDetails(false)}}>
                        <Image src={plus} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                 </div>
            </div>
            <Image src={mobx.oneExercise.img?`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${mobx.oneExercise.img}`:img} width={100} height={100} unoptimized className={css.imgCard}/>
            <span className={css.label}>Описание</span>
            <span className={css.description}>{mobx.oneExercise.descriptionRu}</span>

            {
              mobx.oneExercise.video && !mobx.oneExercise.link &&
              <video controls className={css.youTubeVideo}>
                <source type="video/mp4" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${mobx.oneExercise.video}`}/>
              </video>
            }
            {
              mobx.oneExercise.link &&
                <iframe width="100%" height="auto" className={css.youTubeVideo}
                    src={`https://www.youtube.com/embed/${mobx.oneExercise.link.split('/').pop()}`}>
                </iframe>
            }
            <span className={css.label1}>Этап:</span>
            <div className={css.stageContaienr}>
                {JSON.parse(mobx.oneExercise.stage)?.map(el => (
                  <div key={el}>{el}</div>
                ))}
            </div>
            <span className={css.label1}>Оборудование:</span>
            <div className={css.stageContaienr}>
                {JSON.parse(mobx.oneExercise.equipment)?.map(el => (
                  <div key={el}>{el}</div>
                ))}
            </div>
            <span className={css.label1}>Группы мышц:</span>
            <div className={css.stageContaienr}>
                {JSON.parse(mobx.oneExercise.musclegroups)?.map(el => (
                  <div key={el}>{el}</div>
                ))}
            </div>
            <span className={css.label1}>Показатели:</span>
            {mobx.oneExercise.pocazatel1Name&&
              <div className={css.stageContaienr}>
                <div className={css.types}>{mobx.oneExercise.pocazatel1Name}: {mobx.oneExercise.pocazatel1Type}</div>
              </div>
            }
            {mobx.oneExercise.pocazatel2Name&&
              <div className={css.stageContaienr}>
                <div  className={css.types}>{mobx.oneExercise.pocazatel2Name}: {mobx.oneExercise.pocazatel2Type}</div>
              </div>
            }
            {mobx.oneExercise.pocazatel3Name&&
              <div className={css.stageContaienr}>
                <div  className={css.types}>{mobx.oneExercise.pocazatel3Name}: {mobx.oneExercise.pocazatel3Type}</div>
              </div>
            }
            {mobx.oneExercise.pocazatel4Name&&
              <div className={css.stageContaienr}>
                <div  className={css.types}>{mobx.oneExercise.pocazatel4Name}: {mobx.oneExercise.pocazatel5Type}</div>
              </div>
            }
            {mobx.oneExercise.pocazatel5Name&&
              <div className={css.stageContaienr}>
                <div  className={css.types}>{mobx.oneExercise.pocazatel5Name}: {mobx.oneExercise.pocazatel5Type}</div>
              </div>
            }

        </motion.div>
    </motion.div>
  )
})

export default ExerciseDetails