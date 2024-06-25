import css from './GradientLabel.module.css'

const GradientLabel = ({text}) => {
  return (
    <div className={css.container}>{text}</div>
  )
}

export default GradientLabel