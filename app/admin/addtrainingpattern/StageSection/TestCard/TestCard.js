import { useState } from 'react';
import css from './TestCard.module.css'

const TestCard = ({test}) => {
  const [shiftClicked, setShiftClicked] = useState(false);
  const [isDrag, setIsDrag] = useState(false)

  return (
    <div className={`${css.container} ${shiftClicked?css.currentSery:''} ${isDrag?css.isDrag:''}`} 
    // onMouseDown={handleMouseDown} 
    // draggable
    // onDrag={handleDrag}
    // onMouseOut={()=>setIsDrag(false)}
    > 
        <div className={css.header}>{test.name}</div>
    </div>
  )
}

export default TestCard