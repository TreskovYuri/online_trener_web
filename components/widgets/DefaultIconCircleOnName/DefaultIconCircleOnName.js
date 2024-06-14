import css from './DefaultIconCircleOnName.module.css'

const DefaultIconCircleOnName = ({text,radius=10}) => {
    
  return (
    <div className={css.container} style={{borderRadius:`${radius}vw`}}>{text && text.length>0?text.split('')[0]:'?'}</div>
  )
}

export default DefaultIconCircleOnName