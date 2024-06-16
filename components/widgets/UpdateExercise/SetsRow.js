import { useEffect } from 'react';
import css from './UpdateExercise.module.css'
import OpacityDiv from '../MOTION/OpacityDiv/OpacityDiv';

function SetsRow({ setNum, updateCard, diapazonOt, setDiapazonOt, diapazonDo, setDiapazonDo, pokazatel2, setPokazatel2, pokazatel3, setPokazatel3, pokazatel4, setPokazatel4, pokazatel5, setPokazatel5 }) {
    useEffect(() => {
      return () => {
        setDiapazonDo("");
        setDiapazonOt("");
        setPokazatel2("");
        setPokazatel3("");
        setPokazatel4("");
        setPokazatel5("");
      };
    }, []);
    return (
      <OpacityDiv className={css.rowContainer}>
        <span className={css.setNum}>{setNum}</span>
        <div className={css.diapazonContainer}>
          <input type="number" min={0} className={`${css.inputMiniInput}`} value={diapazonOt} onChange={(e) => setDiapazonOt(e.target.value)} />
          <span>-</span>
          <input type="number" mmin={0} className={`${css.inputMiniInput} `} value={diapazonDo} onChange={(e) => setDiapazonDo(e.target.value)} />
        </div>
        {updateCard.pocazatel2Name && <input type="number" min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel2} onChange={(e) => setPokazatel2(e.target.value)} />}
        {updateCard.pocazatel3Name && <input type="number" min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel3} onChange={(e) => setPokazatel3(e.target.value)} />}
        {updateCard.pocazatel4Name && <input type="number" min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel4} onChange={(e) => setPokazatel4(e.target.value)} />}
        {updateCard.pocazatel5Name && <input type="number" min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel5} onChange={(e) => setPokazatel5(e.target.value)} />}
      </OpacityDiv>
    );
  }

export default SetsRow