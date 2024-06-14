import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './OneExercise.module.css'
import {ChevronLeft} from 'lucide-react';
import mobx from '@/mobx/mobx';
import NetworkVideoPlayer from '@/components/widgets/NetworkVideoPlayer/NetworkVideoPlayer';

const OneExercise = ({setModal}) => {
  return (
    <RigthModalWind setModal={setModal}>
        <div className={css.container}>
            <div className={css.exit} onClick={()=>setModal(false)}><ChevronLeft className={css.arrow} /> Нaзaд</div>
            <div className={css.header}>{mobx.currentExercise.nameRu}</div>
            {mobx.currentExercise.video&& <NetworkVideoPlayer url={mobx.currentExercise.video}/>}
            <span className={css.label}>Техника выполнения</span>
            <p className={css.description}>{mobx.currentExercise.descriptionRu}</p>
        </div>
    </RigthModalWind>
  )
}

export default OneExercise