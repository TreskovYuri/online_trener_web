import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import css from './stageCard.module.css'
import { useEffect, useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'
import { Debounced } from '@/utils/Debounced'
import TrainingMobx from '@/mobx/TrainingMobx'
import { observer } from 'mobx-react-lite'



const StageCard = observer(({ title, index }) => {
  const [input, setInput] = useState(title);
  const stages = TrainingMobx.stages
  const setStages = TrainingMobx.setStages

  // Функция для задержки реагирования на ввод
  const debouncedUpdateStageName = Debounced((newInput) => {
      addPatternHandlers.updateStageName({ index, title: newInput,stages:stages, setStages:setStages});
  },200);

  // Обработка изменения ввода текста
  useEffect(() => {
      debouncedUpdateStageName(input);
  }, [input]);

  return (
      <div className={css.container}>
          <span className={css.label}>Этап {index + 1}</span>
          <div className={css.input}><RigthModalInput input={input} setInput={setInput} placeholder={'Название'} className={css.input} /></div>
      </div>
  );
});


export default StageCard