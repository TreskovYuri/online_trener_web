'use client'
import React, { useEffect, useState } from 'react'
import RigthModalWind from '../widgets/RigthModalWind/RigthModalWind'
import { observer } from 'mobx-react-lite'
import mobx from '@/mobx/mobx'
import css from './TrainingDetails.module.css'
import Image from 'next/image'
import smile from './img/smile.svg'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import TrainingUtills from '@/http/TrainingUtills'
import NetworkVideoPlayer from '../widgets/NetworkVideoPlayer/NetworkVideoPlayer'
import CommentUtills from '@/http/CommentUtills'
import StarsRow from '../widgets/StarsRow/StarsRow'
import CommentInput from '../widgets/CommentInput/CommentInput'
import Sklonatel from '@/utils/Sklonatel'
import { ErrorHandler } from '@/utils/ErrorHandler'
import ImgIconCircle from '../widgets/ImgIconCircle/ImgIconCircle'
import DefaultIconCircleOnName from '../widgets/DefaultIconCircleOnName/DefaultIconCircleOnName'
import NameSokrashatel from '@/utils/NameSokrashatel'

const TrainingDetails = observer(({setModal}) => {
  useEffect(()=>{
    SportProgrammUtills.getExersicesById(mobx.currentTraining?.id)
    CommentUtills.getComments()
  },[])
  const exersicesBelong = mobx.sportprogrammExersices.filter(el => el.date == mobx.currentDate)
  const exercises = mobx.exercises

  

  return (
    <RigthModalWind setModal={setModal}>
      <div className={css.container}>
          <div className={css.header}>
            <h2 className={css.title}>{mobx.currentTraining?.name}</h2>
            <Image src={smile} unoptimized className={css.smile} />
          </div>
          {
            exersicesBelong.map(el => <_ExerciseCard key={el} belong={el} exercise={exercises.find(e => e.id == el.exerciseId)} />)
          }
      </div>
    </RigthModalWind>
  )
})

export default TrainingDetails



const _ExerciseCard = observer(({exercise, belong}) => {
  const sets = JSON.parse(belong.sets)
  const comments = mobx.comments.filter(el => el.exerciseBelongId == belong.id)
  const fix = mobx.trainingFix?.find(el => el.exerciseId == exercise.id  &&  el.date == mobx.currentDate  && el.programmId == mobx.currentTraining.id && el.userId == mobx.currentTraining.sportsmanId)
  const fixSets = fix? JSON.parse(fix?.sets):null
  return <div className={css.exerciseCard}>
          <h3 className={css.exerciseTitle}>{exercise?.nameRu || 'Название тренировки'}</h3>
          {exercise?.video&& <NetworkVideoPlayer url={exercise.video} />}
          <div className={css.setHeader}>
              <span>Сет</span>
              {exercise?.pocazatel1Name && <span>{exercise.pocazatel1Name}</span>}
              {exercise?.pocazatel2Name && <span>{exercise.pocazatel2Name}</span>}
              {exercise?.pocazatel3Name && <span>{exercise.pocazatel3Name}</span>}
              {exercise?.pocazatel4Name && <span>{exercise.pocazatel4Name}</span>}
              {exercise?.pocazatel5Name && <span>{exercise.pocazatel5Name}</span>}
          </div>
          {
            sets.map(set =><_SetRow key={set} set={set} exercise={exercise} fix={fixSets?.find(el => el.set == set.set)}/> )
          }
          < _CommentBlock belongId={belong?.id||0} comments={comments}/>
        </div>
})

const _SetRow = ({set,exercise,fix}) => {
  return <div className={css.setRow}>
          <span >{set.set}</span>
          <span className={`${css.between} ${fix?.diapazon || fix?.diapazonOt?css.fix:''}`}>{fix?.diapazon?<div>{fix?.diapazon}</div>:<div>{fix?.diapazonOt || set.diapazonOt}-{fix?.diapazonDo || set.diapazonDo}</div>}<div className={css.setType}>{exercise?.pocazatel1Type}</div></span>
          {exercise?.pocazatel2Name&&<span className={`${css.between} ${fix?.pokazatel2?css.fix:''}`}><div>{fix?.pokazatel2 || set.pokazatel2}</div><div className={css.setType}>{exercise?.pocazatel2Type}</div></span>}
          {exercise?.pocazatel3Name&&<span className={`${css.between} ${fix?.pokazatel3?css.fix:''}`}><div>{fix?.pokazatel3 || set.pokazatel3}</div><div className={css.setType}>{exercise?.pocazatel3Type}</div></span>}
          {exercise?.pocazatel4Name&&<span className={`${css.between} ${fix?.pokazatel4?css.fix:''}`}><div>{fix?.pokazatel4 || set.pokazatel4}</div><div className={css.setType}>{exercise?.pocazatel4Type}</div></span>}
          {exercise?.pocazatel5Name&&<span className={`${css.between} ${fix?.pokazatel5?css.fix:''}`}><div>{fix?.pokazatel5 || set.pokazatel5}</div><div className={css.setType}>{exercise?.pocazatel5Type}</div></span>}

        </div>
}

const _CommentBlock = observer(({comments,belongId}) => {
  const [commentText, setCommentText] = useState('')

  const setComment = async () => {
      if(!commentText){ErrorHandler('Заполните поле ввода');return}
      const formData = new FormData()
      formData.append('commentatorId',mobx.user.id)
      formData.append('exerciseBelongId',belongId)
      formData.append('message',commentText)
      await CommentUtills.setComments(formData)
      setCommentText('')
  }
  
  return <div className={css.commentContainer}>
      <div className={css.commentHeader}>
        <span className={css.comentCounter}><Sklonatel count={comments.length} many={'комментариев'} one={'комментарий'} rodit={'комментария'} /></span>
        <StarsRow />
      </div>
      {
        comments.map(el => <_CommentatorCard message={el.message} user={el.commentatorId == mobx.user.id? mobx.user : mobx.sportsmans.find(e => e.id == el.commentatorId)} />)
      }
      <CommentInput input={commentText} setInput={setCommentText} callback={setComment}/>
  </div>
})



const _CommentatorCard = ({user,message}) => {
    return <div className={css.comment}>
      <div className={css.commentIconBox}>
      {user.img? <ImgIconCircle url={user.img} />:<DefaultIconCircleOnName text={user.name}/>}
      </div>
      <div className={css.column}>
        <span className={css.commentatorName}>{NameSokrashatel({text:user.name})}</span>
        <span className={css.message}>{message}</span>
      </div>
    </div>
}

