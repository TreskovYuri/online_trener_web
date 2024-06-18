import css from './RigthModalInput.module.css'

const RigthModalInput = ({placwholder, input,setInput, min=0,type='text',className='',id='',onSubmit = ()=>{}}) => {
  return (
    <input  
    placeholder={placwholder} 
    value={input} 
    onChange={e => setInput(e.target.value)} 
    className={`${css.input} ${className}`}
    id={id}
    min={min}
    type={type}
    onKeyDown={e => {if (e.key ==='Enter')onSubmit()}} 
    />
    
  )
}

export default RigthModalInput