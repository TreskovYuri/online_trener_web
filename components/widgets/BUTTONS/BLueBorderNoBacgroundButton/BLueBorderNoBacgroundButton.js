import css from './BLueBorderNoBacgroundButton.module.css'

const BLueBorderNoBacgroundButton = ({
  callback,
  title,
  className,
  isPlus=false
}) => {
  return (
    <div className={`${css.container} ${className}`} onClick={callback}>
        {isPlus&&<span className={css.plus}>+</span>}
        {title}
    </div>
  )
}

export default BLueBorderNoBacgroundButton