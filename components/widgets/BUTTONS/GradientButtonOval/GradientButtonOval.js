import css from './GradientButtonOval.module.css'

const GradientButtonOval = ({text,callback}) => {
  return (
    <div onClick={callback} className={css.btn}>{text}</div>
  )
}

export default GradientButtonOval