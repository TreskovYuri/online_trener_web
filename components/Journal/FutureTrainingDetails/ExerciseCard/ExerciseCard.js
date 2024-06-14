import ImgIconCircle from '@/components/widgets/ImgIconCircle/ImgIconCircle'
import css from './ExerciseCard.module.css'
import DefaultIconCircleOnName from '@/components/widgets/DefaultIconCircleOnName/DefaultIconCircleOnName'
import arrow from '../../img/arrow.svg'
import Image from 'next/image'

const ExerciseCard = ({belong,exercises,callback}) => {
    const exercise = exercises.find(e => e.id == belong.exerciseId)
  return (
    <div className={css.container}>
        {
            <div className={css.icon}>{exercise.img?<ImgIconCircle url={exercise.img} radius={0.5}/>:<DefaultIconCircleOnName text={exercise?.nameRU||''} radius={0.5}/>}</div>
        }
        <div className={css.title}>{exercise.nameRu}</div>
        <Image unoptimized src={arrow} className={css.arrow}/>
    </div>
  )
}

export default ExerciseCard