import DropCard from "../DropCard/DropCard";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import css from "./StageBox.module.css";
import { observer } from "mobx-react-lite";
import addPatternHandlers from "../../addPatternHandlers";
import { AnimatePresence,motion } from "framer-motion";

const StageBox = observer(({ stage, stages, setStages }) => {
  const exercises = stage.exercises;
  const handleDrop = addPatternHandlers.handleDropStage;

  return (
    <AnimatePresence mode={"sync"}>
      <motion.div className={css.container}>
        {exercises.map((exercise, index) => (
          <motion.div key={exercise.id} className={css.dropZone}>
            <DropCard dropCallback={() => handleDrop(index, stages, stage, setStages)} />
            <ExerciseCard exercise={exercise} stages={stages} setStages={setStages} stg={stage} type={'Этапы'} />
            <DropCard dropCallback={() => handleDrop(index + 1, stages, stage, setStages)} />
          </motion.div>
        ))}
        <DropCard dropCallback={() => handleDrop(exercises.length, stages, stage, setStages)} />
      </motion.div>
    </AnimatePresence>
  );
});
export default StageBox;
