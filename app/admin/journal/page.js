'use client'


import mobx from '@/mobx/mobx'
import React, { useEffect } from 'react'
import css from './journal.module.css'
import WeekCalendar from '@/components/Journal/WeekCalendar'
import JournalUtills from '@/http/JournalUtills'

const Journal = () => {
  useEffect(() => {
    JournalUtills.getJournal()
    mobx.setPageName('Журнал')
  })
  return (
    <div className={css.container}>
      <WeekCalendar/>
    </div>
  )
}

export default Journal