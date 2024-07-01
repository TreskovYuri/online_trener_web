import css from "./StageSection.module.css";
import SessionBox from "./SessionBox/SessionBox";
import { observer } from "mobx-react-lite";
import addPatternHandlers from "../addPatternHandlers";
import { Plus } from "lucide-react";
import { useState } from "react";
import mobx from "@/mobx/mobx";

const StageSection = observer(({ seria = {} }) => {
  const [isDrop, setIsDrop] = useState(false);

  const handleDragEnter = () => {
    setIsDrop(true);
  };
  const handleDragLeave = () => {
    setIsDrop(false);
  };
  const handleDrop = () => {
    setIsDrop(false);
    if(mobx.dragValue.type === 'Упражнение'){
      addPatternHandlers.addBlockToSeriesAndPushExercise(seria.title, mobx.dragValue.exercise);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>
          {seria.title}{" "}
          <div className={`${css.addBtn} ${isDrop ? css.drop : ""}`} >
            <div className={css.dropZone}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              // onClick={() => addPatternHandlers.addBlockToSeries(seria.title)}
            ></div>
            <Plus className={`${css.plus} `} />
          </div>
        </h2>
      </div>
      <SessionBox seria={seria} />
    </div>
  );
});

export default StageSection;
