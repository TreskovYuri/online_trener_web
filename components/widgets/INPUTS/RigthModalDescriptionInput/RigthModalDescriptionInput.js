import css from './RigthModalDescriptionInput.module.css'

const RigthModalDescriptionInput = ({placwholder, input,setInput}) => {
  return (
    <textarea placeholder={placwholder} value={input} onChange={e => setInput(e.target.value)} className={css.input}/>
  )
}

export default RigthModalDescriptionInput