"use client";
import mobx from "@/mobx/mobx";
import css from "./AddPatern.module.css";
import { useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import RigthModalWind from "@/components/widgets/RigthModalWind/RigthModalWind";
import GradientButtonOval from "@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval";
import RightModalHeader from "@/components/widgets/RightModalHeader/RightModalHeader";
import RigthModalInput from "@/components/widgets/INPUTS/RigthModalInput/RigthModalInput";
import { useRouter } from 'next/navigation';

const AddPatern = () => {
  const router = useRouter()
  const [name, setName] = useState(""); 

  const save = async () => {
    if (!name) {
      ErrorHandler("Заполните обязательные поля!");
      return;
    }
    router.push('/admin/addtrainingpattern')
  };

  return (
    <RigthModalWind setModal={()=>mobx.setAddPattern(false)}>
      <div className={css.container}>
        <RightModalHeader title={'Новый шаблон'}/>
        <RigthModalInput type={"text"}  placwholder={"Название"}  input={name} setInput={(e) => setName(e)}/>
          <div className={css.btnSave}>
            <GradientButtonOval text='Сохранить' callback={save}/>
          </div>
      </div>
    </RigthModalWind>
    
  );
};

export default AddPatern;


