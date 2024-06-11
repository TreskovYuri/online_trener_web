import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import css from './AddProgramm.module.css'
import mobx from '@/mobx/mobx'
import Image from 'next/image'
import deleteImg from './img/delete.svg'

const Modal = () => {
    const [setCount, setSetCount] = useState(1)
    const [time, setTime] = useState('')
    const [updateCard, setUpdateCard] = useState({})
    const  [exercise,setExercise] = useState({})

    const [diapazonOt1, setDiapazonOt1] = useState('')
    const [diapazonDo1, setDiapazonDo1] = useState('')
    const [pokazatel2_1, setPokazatel2_1] = useState('')
    const [pokazatel3_1, setPokazatel3_1] = useState('')
    const [pokazatel4_1, setPokazatel4_1] = useState('')
    const [pokazatel5_1, setPokazatel5_1] = useState('')

    const [diapazonOt2, setDiapazonOt2] = useState('')
    const [diapazonDo2, setDiapazonDo2] = useState('')
    const [pokazatel2_2, setPokazatel2_2] = useState('')
    const [pokazatel3_2, setPokazatel3_2] = useState('')
    const [pokazatel4_2, setPokazatel4_2] = useState('')
    const [pokazatel5_2, setPokazatel5_2] = useState('')

    const [diapazonOt3, setDiapazonOt3] = useState('')
    const [diapazonDo3, setDiapazonDo3] = useState('')
    const [pokazatel2_3, setPokazatel2_3] = useState('')
    const [pokazatel3_3, setPokazatel3_3] = useState('')
    const [pokazatel4_3, setPokazatel4_3] = useState('')
    const [pokazatel5_3, setPokazatel5_3] = useState('')

    const [diapazonOt4, setDiapazonOt4] = useState('')
    const [diapazonDo4, setDiapazonDo4] = useState('')
    const [pokazatel2_4, setPokazatel2_4] = useState('')
    const [pokazatel3_4, setPokazatel3_4] = useState('')
    const [pokazatel4_4, setPokazatel4_4] = useState('')
    const [pokazatel5_4, setPokazatel5_4] = useState('')

    const [diapazonOt5, setDiapazonOt5] = useState('')
    const [diapazonDo5, setDiapazonDo5] = useState('')
    const [pokazatel2_5, setPokazatel2_5] = useState('')
    const [pokazatel3_5, setPokazatel3_5] = useState('')
    const [pokazatel4_5, setPokazatel4_5] = useState('')
    const [pokazatel5_5, setPokazatel5_5] = useState('')

    const [diapazonOt6, setDiapazonOt6] = useState('')
    const [diapazonDo6, setDiapazonDo6] = useState('')
    const [pokazatel2_6, setPokazatel2_6] = useState('')
    const [pokazatel3_6, setPokazatel3_6] = useState('')
    const [pokazatel4_6, setPokazatel4_6] = useState('')
    const [pokazatel5_6, setPokazatel5_6] = useState('')

    const [diapazonOt7, setDiapazonOt7] = useState('')
    const [diapazonDo7, setDiapazonDo7] = useState('')
    const [pokazatel2_7, setPokazatel2_7] = useState('')
    const [pokazatel3_7, setPokazatel3_7] = useState('')
    const [pokazatel4_7, setPokazatel4_7] = useState('')
    const [pokazatel5_7, setPokazatel5_7] = useState('')

    const [diapazonOt8, setDiapazonOt8] = useState('')
    const [diapazonDo8, setDiapazonDo8] = useState('')
    const [pokazatel2_8, setPokazatel2_8] = useState('')
    const [pokazatel3_8, setPokazatel3_8] = useState('')
    const [pokazatel4_8, setPokazatel4_8] = useState('')
    const [pokazatel5_8, setPokazatel5_8] = useState('')

    const [diapazonOt9, setDiapazonOt9] = useState('')
    const [diapazonDo9, setDiapazonDo9] = useState('')
    const [pokazatel2_9, setPokazatel2_9] = useState('')
    const [pokazatel3_9, setPokazatel3_9] = useState('')
    const [pokazatel4_9, setPokazatel4_9] = useState('')
    const [pokazatel5_9, setPokazatel5_9] = useState('')

    const [diapazonOt10, setDiapazonOt10] = useState('')
    const [diapazonDo10, setDiapazonDo10] = useState('')
    const [pokazatel2_10, setPokazatel2_10] = useState('')
    const [pokazatel3_10, setPokazatel3_10] = useState('')
    const [pokazatel4_10, setPokazatel4_10] = useState('')
    const [pokazatel5_10, setPokazatel5_10] = useState('')

    const [diapazonOt11, setDiapazonOt11] = useState('')
    const [diapazonDo11, setDiapazonDo11] = useState('')
    const [pokazatel2_11, setPokazatel2_11] = useState('')
    const [pokazatel3_11, setPokazatel3_11] = useState('')
    const [pokazatel4_11, setPokazatel4_11] = useState('')
    const [pokazatel5_11, setPokazatel5_11] = useState('')

    const [diapazonOt12, setDiapazonOt12] = useState('')
    const [diapazonDo12, setDiapazonDo12] = useState('')
    const [pokazatel2_12, setPokazatel2_12] = useState('')
    const [pokazatel3_12, setPokazatel3_12] = useState('')
    const [pokazatel4_12, setPokazatel4_12] = useState('')
    const [pokazatel5_12, setPokazatel5_12] = useState('')

    const [diapazonOt13, setDiapazonOt13] = useState('')
    const [diapazonDo13, setDiapazonDo13] = useState('')
    const [pokazatel2_13, setPokazatel2_13] = useState('')
    const [pokazatel3_13, setPokazatel3_13] = useState('')
    const [pokazatel4_13, setPokazatel4_13] = useState('')
    const [pokazatel5_13, setPokazatel5_13] = useState('')

    const [diapazonOt14, setDiapazonOt14] = useState('')
    const [diapazonDo14, setDiapazonDo14] = useState('')
    const [pokazatel2_14, setPokazatel2_14] = useState('')
    const [pokazatel3_14, setPokazatel3_14] = useState('')
    const [pokazatel4_14, setPokazatel4_14] = useState('')
    const [pokazatel5_14, setPokazatel5_14] = useState('')

    const [diapazonOt15, setDiapazonOt15] = useState('')
    const [diapazonDo15, setDiapazonDo15] = useState('')
    const [pokazatel2_15, setPokazatel2_15] = useState('')
    const [pokazatel3_15, setPokazatel3_15] = useState('')
    const [pokazatel4_15, setPokazatel4_15] = useState('')
    const [pokazatel5_15, setPokazatel5_15] = useState('')

    const [diapazonOt16, setDiapazonOt16] = useState('')
    const [diapazonDo16, setDiapazonDo16] = useState('')
    const [pokazatel2_16, setPokazatel2_16] = useState('')
    const [pokazatel3_16, setPokazatel3_16] = useState('')
    const [pokazatel4_16, setPokazatel4_16] = useState('')
    const [pokazatel5_16, setPokazatel5_16] = useState('')

    const [diapazonOt17, setDiapazonOt17] = useState('')
    const [diapazonDo17, setDiapazonDo17] = useState('')
    const [pokazatel2_17, setPokazatel2_17] = useState('')
    const [pokazatel3_17, setPokazatel3_17] = useState('')
    const [pokazatel4_17, setPokazatel4_17] = useState('')
    const [pokazatel5_17, setPokazatel5_17] = useState('')

    const [diapazonOt18, setDiapazonOt18] = useState('')
    const [diapazonDo18, setDiapazonDo18] = useState('')
    const [pokazatel2_18, setPokazatel2_18] = useState('')
    const [pokazatel3_18, setPokazatel3_18] = useState('')
    const [pokazatel4_18, setPokazatel4_18] = useState('')
    const [pokazatel5_18, setPokazatel5_18] = useState('')

    const [diapazonOt19, setDiapazonOt19] = useState('')
    const [diapazonDo19, setDiapazonDo19] = useState('')
    const [pokazatel2_19, setPokazatel2_19] = useState('')
    const [pokazatel3_19, setPokazatel3_19] = useState('')
    const [pokazatel4_19, setPokazatel4_19] = useState('')
    const [pokazatel5_19, setPokazatel5_19] = useState('')

    const [diapazonOt20, setDiapazonOt20] = useState('')
    const [diapazonDo20, setDiapazonDo20] = useState('')
    const [pokazatel2_20, setPokazatel2_20] = useState('')
    const [pokazatel3_20, setPokazatel3_20] = useState('')
    const [pokazatel4_20, setPokazatel4_20] = useState('')
    const [pokazatel5_20, setPokazatel5_20] = useState('')




    const array = [
        [1, diapazonOt1, setDiapazonOt1, diapazonDo1, setDiapazonDo1, pokazatel2_1, setPokazatel2_1, pokazatel3_1, setPokazatel3_1, pokazatel4_1, setPokazatel4_1, pokazatel5_1, setPokazatel5_1],
        [2, diapazonOt2, setDiapazonOt2, diapazonDo2, setDiapazonDo2, pokazatel2_2, setPokazatel2_2, pokazatel3_2, setPokazatel3_2, pokazatel4_2, setPokazatel4_2, pokazatel5_2, setPokazatel5_2],
        [3, diapazonOt3, setDiapazonOt3, diapazonDo3, setDiapazonDo3, pokazatel2_3, setPokazatel2_3, pokazatel3_3, setPokazatel3_3, pokazatel4_3, setPokazatel4_3, pokazatel5_3, setPokazatel5_3],
        [4, diapazonOt4, setDiapazonOt4, diapazonDo4, setDiapazonDo4, pokazatel2_4, setPokazatel2_4, pokazatel3_4, setPokazatel3_4, pokazatel4_4, setPokazatel4_4, pokazatel5_4, setPokazatel5_4],
        [5, diapazonOt5, setDiapazonOt5, diapazonDo5, setDiapazonDo5, pokazatel2_5, setPokazatel2_5, pokazatel3_5, setPokazatel3_5, pokazatel4_5, setPokazatel4_5, pokazatel5_5, setPokazatel5_5],
        [6, diapazonOt6, setDiapazonOt6, diapazonDo6, setDiapazonDo6, pokazatel2_6, setPokazatel2_6, pokazatel3_6, setPokazatel3_6, pokazatel4_6, setPokazatel4_6, pokazatel5_6, setPokazatel5_6],
        [7, diapazonOt7, setDiapazonOt7, diapazonDo7, setDiapazonDo7, pokazatel2_7, setPokazatel2_7, pokazatel3_7, setPokazatel3_7, pokazatel4_7, setPokazatel4_7, pokazatel5_7, setPokazatel5_7],
        [8, diapazonOt8, setDiapazonOt8, diapazonDo8, setDiapazonDo8, pokazatel2_8, setPokazatel2_8, pokazatel3_8, setPokazatel3_8, pokazatel4_8, setPokazatel4_8, pokazatel5_8, setPokazatel5_8],
        [9, diapazonOt9, setDiapazonOt9, diapazonDo9, setDiapazonDo9, pokazatel2_9, setPokazatel2_9, pokazatel3_9, setPokazatel3_9, pokazatel4_9, setPokazatel4_9, pokazatel5_9, setPokazatel5_9],
        [10, diapazonOt10, setDiapazonOt10, diapazonDo10, setDiapazonDo10, pokazatel2_10, setPokazatel2_10, pokazatel3_10, setPokazatel3_10, pokazatel4_10, setPokazatel4_10, pokazatel5_10, setPokazatel5_10],
        [11, diapazonOt11, setDiapazonOt11, diapazonDo11, setDiapazonDo11, pokazatel2_11, setPokazatel2_11, pokazatel3_11, setPokazatel3_11, pokazatel4_11, setPokazatel4_11, pokazatel5_11, setPokazatel5_11],
        [12, diapazonOt12, setDiapazonOt12, diapazonDo12, setDiapazonDo12, pokazatel2_12, setPokazatel2_12, pokazatel3_12, setPokazatel3_12, pokazatel4_12, setPokazatel4_12, pokazatel5_12, setPokazatel5_12],
        [13, diapazonOt13, setDiapazonOt13, diapazonDo13, setDiapazonDo13, pokazatel2_13, setPokazatel2_13, pokazatel3_13, setPokazatel3_13, pokazatel4_13, setPokazatel4_13, pokazatel5_13, setPokazatel5_13],
        [14, diapazonOt14, setDiapazonOt14, diapazonDo14, setDiapazonDo14, pokazatel2_14, setPokazatel2_14, pokazatel3_14, setPokazatel3_14, pokazatel4_14, setPokazatel4_14, pokazatel5_14, setPokazatel5_14],
        [15, diapazonOt15, setDiapazonOt15, diapazonDo15, setDiapazonDo15, pokazatel2_15, setPokazatel2_15, pokazatel3_15, setPokazatel3_15, pokazatel4_15, setPokazatel4_15, pokazatel5_15, setPokazatel5_15],
        [16, diapazonOt16, setDiapazonOt16, diapazonDo16, setDiapazonDo16, pokazatel2_16, setPokazatel2_16, pokazatel3_16, setPokazatel3_16, pokazatel4_16, setPokazatel4_16, pokazatel5_16, setPokazatel5_16],
        [17, diapazonOt17, setDiapazonOt17, diapazonDo17, setDiapazonDo17, pokazatel2_17, setPokazatel2_17, pokazatel3_17, setPokazatel3_17, pokazatel4_17, setPokazatel4_17, pokazatel5_17, setPokazatel5_17],
        [18, diapazonOt18, setDiapazonOt18, diapazonDo18, setDiapazonDo18, pokazatel2_18, setPokazatel2_18, pokazatel3_18, setPokazatel3_18, pokazatel4_18, setPokazatel4_18, pokazatel5_18, setPokazatel5_18],
        [19, diapazonOt19, setDiapazonOt19, diapazonDo19, setDiapazonDo19, pokazatel2_19, setPokazatel2_19, pokazatel3_19, setPokazatel3_19, pokazatel4_19, setPokazatel4_19, pokazatel5_19, setPokazatel5_19],
        [20, diapazonOt20, setDiapazonOt20, diapazonDo20, setDiapazonDo20, pokazatel2_20, setPokazatel2_20, pokazatel3_20, setPokazatel3_20, pokazatel4_20, setPokazatel4_20, pokazatel5_20, setPokazatel5_20],


    ]

    const setSets = async (set) => {
        await array[set.set - 1][2](set.diapazonOt)
        await array[set.set - 1][4](set.diapazonDo)
        await set.pokazatel2 && array[set.set - 1][6](set.pokazatel2)
        await set.pokazatel3 && array[set.set - 1][8](set.pokazatel3)
        await set.pokazatel4 && array[set.set - 1][10](set.pokazatel4)
        await set.pokazatel5 && array[set.set - 1][12](set.pokazatel5)

    }

    useEffect(() => {
        setUpdateCard(mobx.cardUpdateExercise)
        const sets = mobx.cardUpdateExercise?.body?.sets
        //   const exercise = globalExersicesArray.find(el => el.exerciseId == updateCard.id)
        if (sets) {

            (async () => {
                for (let i = 0; i < sets.length; i++) {
                    await setSets(sets[i]);
                }
            })();
            setTime(mobx.cardUpdateExercise.body.time)
            setSetCount(sets.length + 1)
        }
        setExercise(mobx.exercises.find(e => e.id == mobx.cardUpdateExercise?.body?.exerciseId))
    }, [mobx.cardUpdateExercise])

    

    const addExersicePokazaleli = () => {
        const newSets = []; // Создаем новый массив для новых объектов sets
        array.slice(0, setCount).forEach(card => {

            if (card[1] && card[3]) {
                const set = {};
                set.set = card[0];
                set.diapazonOt = card[1];
                set.diapazonDo = card[3];
                if (card[5]) set.pokazatel2 = card[5];
                if (card[7]) set.pokazatel3 = card[7];
                if (card[9]) set.pokazatel4 = card[9];
                if (card[11]) set.pokazatel5 = card[11];
                newSets.push(set); // Добавляем новый объект set в новый массив newSets
            }

        });


        mobx.setFinalExersiceArrayOnDragAndDrop([...mobx.finalExersiceArrayOnDragAndDrop.filter(el => el.id != updateCard.id), {
            ...updateCard,
            "body": {
                "exerciseId": updateCard.body.exerciseId,
                "sets": newSets,
                "time":time
            },
            'updateFlag':true
        }]);
        mobx.setCardUpdateExerciseFlag(false)
    }


    const deleteExercise = async () => {
        mobx.setFinalExersiceArrayOnDragAndDrop(mobx.finalExersiceArrayOnDragAndDrop.filter(e => e.id != updateCard.id))
        mobx.setCardUpdateExerciseFlag(false)
    }


    if (mobx.cardUpdateExerciseFlag) {
        return (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.modalUpdateExercise} >

                <div className={css.modalUpdateWind} >
                    <div className={css.exitRow}>
                        <div className={css.exit} onClick={() => { mobx.setCardUpdateExerciseFlag(false); mobx.setCardUpdateExercise({}) }}>{`< Назад`}</div>
                        <div className={css.btn} onClick={deleteExercise}>
                            <Image src={deleteImg} alt='Онлайн-Тренер' className={css.img} />
                        </div>
                    </div>

                    <h2 className={css.header}>Изменить упражнение</h2>
                    <div className={css.modalHeaderNavCotainer}>
                        <span className={css.flex1}>Сет</span>
                        <span className={css.flex2}>{TextWrang(exercise?.pocazatel1Name)},{exercise?.pocazatel1Type}/диапазон</span>
                        {exercise?.pocazatel2Name && <span className={css.flex1}>{TextWrang(exercise.pocazatel2Name)}</span>}
                        {exercise?.pocazatel3Name && <span className={css.flex1}>{TextWrang(exercise.pocazatel3Name)}</span>}
                        {exercise?.pocazatel4Name && <span className={css.flex1}>{TextWrang(exercise.pocazatel4Name)}</span>}
                        {exercise?.pocazatel5Name && <span className={css.flex1}>{TextWrang(exercise.pocazatel5Name)}</span>}
                    </div>

                    {array.slice(0, setCount).map(card => (
                        <SetsRow setNum={card[0]} updateCard={exercise}
                            diapazonOt={card[1]} setDiapazonOt={card[2]} diapazonDo={card[3]} setDiapazonDo={card[4]} pokazatel2={card[5]} setPokazatel2={card[6]}
                            pokazatel3={card[7]} setPokazatel3={card[8]} pokazatel4={card[9]} setPokazatel4={card[10]} pokazatel5={card[11]} setPokazatel5={card[12]}
                        />
                    ))}

                    <div className={css.AddSetsBtn} onClick={() => setSetCount(setCount > 0 ? setCount - 1 : 0)}><span>-</span>Удалить сет</div>
                    <div className={`${css.AddSetsBtn} ${css.AddSetsBtn1}`} onClick={() => setSetCount(setCount > 19 ? 20 : setCount + 1)}><span>+</span>Добавить сет</div>
                    <span className={css.label}>Время отдыха</span>
                    <input type='number' min={0} className={`${css.input} ${css.name} ${css.ipdateInput}`} placeholder='Продолжительность' id="password" value={time} onChange={e => setTime(e.target.value)} />
                    <div className={css.buttonContainer}>
                        <div className={css.btnSave} onClick={addExersicePokazaleli}>Сохранить</div>
                    </div>
                </div>
            </motion.div>
        )
    }

}

export default Modal



function SetsRow({ setNum, updateCard,
    diapazonOt, setDiapazonOt, diapazonDo, setDiapazonDo, pokazatel2, setPokazatel2, pokazatel3, setPokazatel3, pokazatel4, setPokazatel4, pokazatel5, setPokazatel5
}) {
    useEffect(() => {
        return () => {
            setDiapazonDo('')
            setDiapazonOt('')
            setPokazatel2('')
            setPokazatel3('')
            setPokazatel4('')
            setPokazatel5('')
        }
    }, [])
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.rowContainer}>
            <span className={css.setNum}>{setNum}</span>
            <div className={css.diapazonContainer}>
                <input type='number' min={0} className={`${css.inputMiniInput}`} value={diapazonOt} onChange={e => setDiapazonOt(e.target.value)} />
                <span>-</span>
                <input type='number' mmin={0} className={`${css.inputMiniInput} `} value={diapazonDo} onChange={e => setDiapazonDo(e.target.value)} />
            </div>
            {updateCard?.pocazatel2Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel2} onChange={e => setPokazatel2(e.target.value)} />}
            {updateCard?.pocazatel3Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel3} onChange={e => setPokazatel3(e.target.value)} />}
            {updateCard?.pocazatel4Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel4} onChange={e => setPokazatel4(e.target.value)} />}
            {updateCard?.pocazatel5Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel5} onChange={e => setPokazatel5(e.target.value)} />}
        </motion.div>
    )
}




function TextWrang(text) {
    if (text && text?.length <= 4) {
        return text;
    } else if (text) {
        return text?.slice(0, 4) + "..";
    } else return ''
}

