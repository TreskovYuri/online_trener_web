import css from './RigthModalInput.module.css'

const RigthModalInput = ({placwholder, input,setInput}) => {
  return (
    <input placeholder={placwholder} value={input} onChange={e => setInput(e.target.value)} className={css.input}/>
  )
}

export default RigthModalInput