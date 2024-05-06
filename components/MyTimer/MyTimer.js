'use client'
import mobx from '@/mobx/mobx';
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { observer } from 'mobx-react-lite'

const MyTimer = observer(({ expiryTimestamp }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(()=>{
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);
    restart(time)

  },[mobx.restartTimer])

  useEffect(()=>{
    if(minutes===0 && seconds===0){
      mobx.setTimerOnOff(false)
    }
  },[minutes,seconds])


  return (<span>{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</span>);
})

export default  MyTimer