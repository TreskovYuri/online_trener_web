import css from './ContinueModal.module.css'

const ContinueModal = ({cont,close}) => {
  return (
    <div className={css.container}>
        <h2>У вас есть не сохраненная тренировка!</h2>
        <span>Продолжить заполнение?</span>
        <div className={css.btnBlock}>
            <span className={css.close} onClick={close}>Начать заново</span>
            <span className={css.add} onClick={cont}>Продолжить</span>
        </div>
    </div>
  )
}

export default ContinueModal