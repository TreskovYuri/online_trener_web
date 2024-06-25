import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import css from './stageCard.module.css'
import { useEffect, useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'
import { Debounced } from '@/utils/Debounced'



const StageCard = ({ title, index, stages, setStage }) => {
  const [input, setInput] = useState(title);
  

  // Функция для задержки реагирования на ввод
  const debouncedUpdateStageName = Debounced((newInput) => {
      addPatternHandlers.updateStageName({ index, title: newInput, setStages: setStage, stages });
  });

  // Обработка изменения ввода текста
  useEffect(() => {
      debouncedUpdateStageName(input);
  }, [input]);

  return (
      <div className={css.container}>
          <span className={css.label}>Этап {index + 1}</span>
          <RigthModalInput input={input} setInput={setInput} placeholder={'Название'} className={css.input} />
      </div>
  );
};


export default StageCard