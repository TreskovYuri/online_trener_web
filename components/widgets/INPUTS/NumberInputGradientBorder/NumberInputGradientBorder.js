import css from './NumberInputGradientBorder.module.css'

const NumberInputGradientBorder = ({input, setInput, label,className=''}) => {
  return (
    <div className={css.box}><input type='number' value={input} onChange={e=>setInput(e.target.value)} className={`${css.input} ${className}`} min={0}/><span>{label&&` ${label}`}</span></div>
  )
}

export default NumberInputGradientBorder