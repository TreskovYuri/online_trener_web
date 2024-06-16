import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import css from "./HeaderExerciseFilter.module.css";
import { useEffect, useState } from "react";
import OpacityDiv from "../../MOTION/OpacityDiv/OpacityDiv";
import handler from "./HeaderExerciseFilterHandler";
import mobx from "@/mobx/mobx";

const HeaderExerciseFilter = ({ 
  muscleGoups = [], 
  equipments = [],
  currentMuscleGroup='',
  currentEquipment='',
  setCirrentMuscleGroup=()=>{},
  setCurrentEquipment=()=>{},
  currentGroup='', 
  setCurrentGroup = ()=>{} 
}) => {
  
  const [modal, setModal] = useState(false);
  const [muscleGroupModal, setMuscleGroupModal] = useState(false);
  const [equipmentsModal, setEquipmentsModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);


  return (
    <div className={css.btn} onClick={() => setModal(!modal)}>
      <Filter className={css.search} />
      {modal && (
        <OpacityDiv onClick={(e) => e.stopPropagation()}>
          {modal && (
            <OpacityDiv className={css.filterModal}>
              <_Row1 title={"Оборудование"} 
              callback={() => handler.clickHandler({ 
                setEquipmentsModal: () => setEquipmentsModal(true), 
                type: "Оборудование" })} 
                isArrow={true}
                />
              <_Row1 title={"Группа"} 
              callback={() => handler.clickHandler({ 
                setGroupModal:() => setGroupModal(true),
                type: "Группа" })} 
                isArrow={true}
                />
              <_Row1 title={"Группа мышц"} 
              callback={() => handler.clickHandler({ 
                setMuscleGroupModal: () => setMuscleGroupModal(true), 
                type: "Группа мышц" })} 
                isArrow={true} />
              <_RowSbros callback={() => {
                setCirrentMuscleGroup('')
                setCurrentEquipment('')
                setCurrentGroup(0)
              }} />
            </OpacityDiv>
          )}
          {muscleGroupModal && (
            <OpacityDiv className={css.filterModal}>
              <_RowExit  callback={()=>setMuscleGroupModal(false)}/>
              {muscleGoups.map((group) => (
                <_Row1 title={group} callback={() => {
                  handler.muscleGroupClickHandler({group:group,setGroup:setCirrentMuscleGroup})
                  setMuscleGroupModal(false)
                }} isAcive={currentMuscleGroup == group}/>
              ))}
              <_RowSbros callback={()=>{
                handler.muscleGroupClickHandler({group:'Сброс',setGroup:setCirrentMuscleGroup})
                setMuscleGroupModal(false)
              }}/>
            </OpacityDiv>
          )}
          {equipmentsModal && (
            <OpacityDiv className={css.filterModal}>
              <_RowExit  callback={()=>setEquipmentsModal(false)}/>
              {equipments.map((group) => (
                <_Row1 title={group} callback={() => {
                  handler.muscleGroupClickHandler({group:group,setGroup:setCurrentEquipment})
                  setEquipmentsModal(false)
                }} isAcive={currentEquipment==group}/>
              ))}
              <_RowSbros callback={()=>{
                handler.muscleGroupClickHandler({group:'Сброс',setGroup:setCurrentEquipment})
                setEquipmentsModal(false)
              }}/>
            </OpacityDiv>
          )}
          {groupModal && (
            <OpacityDiv className={css.filterModal}>
              <_RowExit  callback={()=>setGroupModal(false)}/>
              {mobx.ExerciseGrpupss.map((group) => (
                <_Row1 title={group?.name} callback={() => {setCurrentGroup(group?.id),setGroupModal(false)}} isAcive={currentGroup==group?.id}/>
              ))}
              <_RowSbros callback={()=>{
                  setCurrentGroup(0)
                setGroupModal(false)
              }}/>
            </OpacityDiv>
          )}
        </OpacityDiv>
      )}
    </div>
  );
};

export default HeaderExerciseFilter;

const _Row1 = ({ title, callback=()=>{}, isArrow = false, isAcive =false }) => {
  return (
    <span className={`${css.filterSpan} ${css.filterSpanBetween} ${isAcive?css.activeSpan:''}`} onClick={callback}>
      {title} {isArrow && <ChevronRight className={css.arrow} />}
    </span>
  );
};
const _RowSbros = ({ callback }) => {
  return (
    <span className={`${css.filterSpan} ${css.filterSpanEnd}`} onClick={callback}>
      Сбросить{" "}
    </span>
  );
};
const _RowExit = ({ title = "Назад", callback }) => {
  return (
    <span className={`${css.filterExit}`} onClick={callback}>
      <ChevronLeft className={css.arrow} />
      {title}
    </span>
  );
};
