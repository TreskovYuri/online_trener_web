import React, { useEffect } from 'react'
import RigthModalWind from '../widgets/RigthModalWind/RigthModalWind'
import { observer } from 'mobx-react-lite'
import mobx from '@/mobx/mobx'
import css from './TestDetails.module.css'
import NameSokrashatel from '@/utils/NameSokrashatel'

const TestDetails = observer(({setModal}) => {
    const test = mobx.currentTest
    const fix = mobx.testFix.find(el => el.programmId == mobx.currentTraining.id && el.date == mobx.currentDate)

  return (
    <RigthModalWind setModal={setModal}>
        <div className={css.container}>
            <h2 className={css.title}>{test.name}</h2>
            <span className={css.label}>Норматив:</span>
            <span className={css.item}>{`${test.item} ${test.type}`}</span>
            <span className={css.label}>Дата:</span>
            <span className={css.item}>{fix?fix.date:'Не заполнено...'}</span>
            <span className={css.label}>Тренер:</span>
            <span className={css.item}>{NameSokrashatel({text:mobx.user.name})}</span>
        </div>
    </RigthModalWind>
  )
})

export default TestDetails