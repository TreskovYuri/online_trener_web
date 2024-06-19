import css from './GradientCircle.module.css'

const GradientCircle = ({text}) => {
  return (
    <div className={css.container}>{text}</div>
  )
}

export default GradientCircle