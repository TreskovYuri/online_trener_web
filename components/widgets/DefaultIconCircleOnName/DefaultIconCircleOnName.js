import css from './DefaultIconCircleOnName.module.css'

const DefaultIconCircleOnName = ({text}) => {
    
  return (
    <div className={css.container}>{text && text.length>0?text.split('')[0]:'?'}</div>
  )
}

export default DefaultIconCircleOnName