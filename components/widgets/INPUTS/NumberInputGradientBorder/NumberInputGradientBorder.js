import css from './NumberInputGradientBorder.module.css'

const NumberInputGradientBorder = ({input, setInput, label,className='',radius=0.2}) => {
  return (
    <div style={{borderRadius:`${radius}vw`}} className={css.box}><input type='number' value={input} onChange={e=>setInput(e.target.value)} className={`${css.input} ${className}`} min={0}/>{label&&<span>{` ${label}`}</span>}</div>
  )
}

export default NumberInputGradientBorder