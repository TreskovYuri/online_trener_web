import css from './HeaderAddButton.module.css'

const HeaderAddButton = ({text, callback}) => {
  return (
    <div onClick={callback} className={css.btn}><span>+</span> {text}</div>
  )
}

export default HeaderAddButton