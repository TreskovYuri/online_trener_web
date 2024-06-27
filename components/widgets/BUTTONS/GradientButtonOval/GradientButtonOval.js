import css from './GradientButtonOval.module.css'

const GradientButtonOval = ({text='',callback,className=''}) => {
  return (
    <div onClick={callback} className={`${css.btn} ${className}`}>{text}</div>
  )
}

export default GradientButtonOval