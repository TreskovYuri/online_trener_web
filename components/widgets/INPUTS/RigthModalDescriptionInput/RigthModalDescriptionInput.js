import css from './RigthModalDescriptionInput.module.css'

const RigthModalDescriptionInput = ({placwholder, input,setInput,onSubmit=()=>{}}) => {
  return (
    <textarea placeholder={placwholder} value={input} onChange={e => setInput(e.target.value)} className={css.input} onKeyDown={e => {if (e.key ==='Enter')onSubmit()}} />
  )
}

export default RigthModalDescriptionInput