'use client'


import mobx from '@/mobx/mobx'
import React, { useEffect } from 'react'
import css from './journal.module.css'
import WeekCalendar from '@/components/Journal/WeekCalendar'
import JournalUtills from '@/http/JournalUtills'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import GroupUtills from '@/http/GroupUtills'

const Journal = () => {
  useEffect(() => {
    JournalUtills.getJournal()
    SportProgrammUtills.getProgramms()
    GroupUtills.getTests()
    mobx.setPageName('Журнал')
  })
  return (
    <div className={css.container}>
      <WeekCalendar/>
    </div>
  )
}

export default Journal