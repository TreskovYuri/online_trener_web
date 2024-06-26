import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import RightModalHeader from '@/components/widgets/RightModalHeader/RightModalHeader'
import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './AddExercise.module.css'
import TypeHedaer from './TypeHedaer/TypeHedaer'
import { useState } from 'react'
import HeaderExerciseFilter from '@/components/widgets/MODALS/HeaderExerciseFilter/HeaderExerciseFilter'
import HeaderSearchFilter from '@/components/widgets/MODALS/HeaderSearchFilter/HeaderSearchFilter'
import { observer } from 'mobx-react-lite'
import RigthModalItemList from '@/components/widgets/RigthModalItemList/RigthModalItemList'
import RigthModalHandleSearch from '@/utils/RigthModalHandleSearch'
import TrainingMobx from '@/mobx/TrainingMobx'




const AddExercise = observer(() => {
  const [currentType,setCurrentType] = useState('Упражнения')
  const [search, setSearch] = useState('')
  const itemList = RigthModalHandleSearch({search:search, setSearch:setSearch, type:currentType})
  const setAddExercise = TrainingMobx.setAaddExercise


  return (
    <RigthModalWind setModal={setAddExercise} isModal={false} initialOpacity={1}>
      <div className={css.container}>
        <RightModalHeader title={"Добавьте упражнения"}  />
        <div className={css.header}>
          <TypeHedaer setType={setCurrentType} type={currentType} typeList={['Упражнения','Тесты']}/>
          <div className={css.filterContainer}>
              {currentType == 'Упражнения'&&<span><HeaderExerciseFilter /></span>}
              <span><HeaderSearchFilter value={search} setValue={setSearch}/></span>
          </div>
        </div>
        <RigthModalItemList type={currentType} list={itemList} />
        <div className={css.saveBtn}><GradientButtonOval callback={()=>setAddExercise(false)} text={"Сохранить"} /></div>
      </div>
    </RigthModalWind>
  )
})

export default AddExercise