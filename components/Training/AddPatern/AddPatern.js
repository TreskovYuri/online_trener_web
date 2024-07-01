"use client";
import mobx from "@/mobx/mobx";
import css from "./AddPatern.module.css";
import { useEffect, useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import RigthModalWind from "@/components/widgets/RigthModalWind/RigthModalWind";
import GradientButtonOval from "@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval";
import RightModalHeader from "@/components/widgets/RightModalHeader/RightModalHeader";
import RigthModalInput from "@/components/widgets/INPUTS/RigthModalInput/RigthModalInput";
import { useRouter } from 'next/navigation';
import TrainingMobx from "@/mobx/TrainingMobx";
import CenterModalWind from "@/components/widgets/MODALS/CenterModalWind/CenterModalWind";
import ContinueModal from "./ContinueModal/ContinueModal";
import { observer } from "mobx-react-lite";
import RigthModalDescriptionInput from "@/components/widgets/INPUTS/RigthModalDescriptionInput/RigthModalDescriptionInput";

const AddPatern = observer(() => {
  const router = useRouter()
  const [name, setName] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [modal,setModal] = useState(false)


  const save = async () => {
    if (!name) {
      ErrorHandler("Заполните обязательные поля!");
      return;
    }
    TrainingMobx.setTrainingName(name)
    TrainingMobx.setTrainingDescription(description)
    mobx.setAddPattern(false)
    router.push('/admin/addtrainingpattern')
  };

  useEffect(()=>{
    const seria = localStorage.getItem('seria')
    const trainingName = localStorage.getItem('trainingName')
    setName(trainingName)
    if(seria && trainingName){
      setTimeout(()=>{
        setModal(true)
      },[500])
    }
  },[])

  const cont = () => {
    TrainingMobx.setTrainingName(name)
    setModal(false)
    router.push('/admin/addtrainingpattern')

  }

  return (
    <RigthModalWind setModal={()=>mobx.setAddPattern(false)}>
      {modal&&<CenterModalWind 
      setModal={()=>{}} 
      child={<ContinueModal cont={cont} close={()=>{
        localStorage.removeItem('seria')
        localStorage.removeItem('trainingName')
        setModal(false)
      }}/>}
      />}
      <div className={css.container}>
        <RightModalHeader title={'Новый шаблон'} />
        <div className={css.input}><RigthModalInput type={"text"}  placwholder={"Название"}  input={name} setInput={(e) => setName(e)}/></div>
        <div className={css.description}><RigthModalDescriptionInput  type={"text"}  placwholder={"Описание"}  input={description} setInput={(e) => setDescription(e)}/></div>
          <div className={css.btnSave}>
            <GradientButtonOval text='Сохранить' callback={save}/>
          </div>
      </div>
    </RigthModalWind>
    
  );
});

export default AddPatern;


