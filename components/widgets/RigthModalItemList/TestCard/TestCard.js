// TestCard.js
import { ChevronRight } from 'lucide-react';
import css from './TestCard.module.css';
import TrainingMobx from '@/mobx/TrainingMobx';


const TestCard = ({ test }) => {
    const addTest = (test) => {
        TrainingMobx.setAddPatternTests(test);
    };

    return (
        <div className={css.container}>
            <div className={css.textContainer}>
                <h2 className={css.header}>{test.name}</h2>
                <div className={css.btn} onClick={() => addTest(test)}>Добавить</div>
            </div>
            <ChevronRight className={css.arrow} />
        </div>
    );
};

export default TestCard;
