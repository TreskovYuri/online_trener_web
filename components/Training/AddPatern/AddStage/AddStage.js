import RightModalHeader from "@/components/widgets/RightModalHeader/RightModalHeader";
import RigthModalWind from "@/components/widgets/RigthModalWind/RigthModalWind";
import css from "./AddStage.module.css";
import StageCard from "./stageCard/stageCard";
import BLueBorderNoBacgroundButton from "@/components/widgets/BUTTONS/BLueBorderNoBacgroundButton/BLueBorderNoBacgroundButton";
import GradientButtonOval from "@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval";
import ListView from "@/components/widgets/DEFAULT/ListView/ListView";
import addPatternHandlers from "@/app/admin/addtrainingpattern/addPatternHandlers";


const AddStage = ({ setModal, stages, setStages }) => {

    const save = () => {
        if(stages.length>1){
            setStages([...stages.filter(stg => stg.title !='')])
        }
        setModal(false)
    }
  return (
    <RigthModalWind setModal={setModal} isModal={false}>
      <div className={css.container}>
        <RightModalHeader title={"Создать этап"} isIcon={false} />
        <ListView/>
        <div className={css.scrollWind}>
            {stages.map((stage,index) => (
            <StageCard key={index} title={stage.title} index={index} stages={stages} setStage={setStages}/>
            ))}
        <div className={css.AddStage}><BLueBorderNoBacgroundButton 
        callback={()=>addPatternHandlers.addStage({setStages:setStages,stages:stages})} 
        title={'Добавить этап'} 
        isPlus={true}
        /></div>
        </div>
        <div className={css.saveBtn}><GradientButtonOval callback={save} text={"Сохранить"} /></div>
      </div>
    </RigthModalWind>
  );
};

export default AddStage;
