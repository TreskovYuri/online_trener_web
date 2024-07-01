// TestCard.js
import { ChevronRight } from 'lucide-react';
import css from './TestCard.module.css';
import TrainingMobx from '@/mobx/TrainingMobx';
import { useState } from 'react';
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers';


const TestCard = ({ test }) => {
    const [isDrag,setIsDrag] = useState(false)
    const addTest = (test) => {
        TrainingMobx.setAddPatternTests(test);
    };

    const handleDrag = () => {
        setIsDrag(true)
        addPatternHandlers.handleDragTests({setIsDrag,test})
    }

    return (
        <div className={`${css.container} ${isDrag?css.drag:''}`} draggable onDrag={handleDrag} onMouseOut={()=>setIsDrag(false)}>
            <div className={css.textContainer}>
                <h2 className={css.header}>{test.name}</h2>
                <div className={css.btn} onClick={() => addTest(test)}>Добавить</div>
            </div>
            <ChevronRight className={css.arrow} />
        </div>
    );
};

export default TestCard;
