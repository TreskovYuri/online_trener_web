import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import ListView from '@/components/widgets/DEFAULT/ListView/ListView'
import RightModalHeader from '@/components/widgets/RightModalHeader/RightModalHeader'
import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './AddExercise.module.css'

const AddExercise = ({setModal,currentStage}) => {
  return (
    <RigthModalWind setModal={setModal} isModal={false}>
      <div className={css.container}>
        <RightModalHeader title={"Добавьте упражнения"}  />
        <ListView/>
        <div className={css.saveBtn}><GradientButtonOval callback={()=>setModal(false)} text={"Сохранить"} /></div>
      </div>
    </RigthModalWind>
  )
}

export default AddExercise