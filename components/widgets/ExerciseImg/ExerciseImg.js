import Image from 'next/image'
import css from './ExerciseImg.module.css'
import DefaultIconCircleOnName from '../DefaultIconCircleOnName/DefaultIconCircleOnName'

const ExerciseImg = ({exercise}) => {
    if(exercise.img){
        return <Image src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${exercise.img}`} className={css.img} width={20} height={20} unoptimized />
    }else{
        return <DefaultIconCircleOnName text={exercise.nameRu} radius={0.5}/>
    }

}

export default ExerciseImg