import css from './RigthModalInput.module.css'

const RigthModalInput = ({
  placwholder, 
  input,setInput, 
  min=0,
  type='text',
  className='',
  id='',
  onSubmit = ()=>{},
  bacgroundFill=false
}) => {
  return (
    <input  
    placeholder={placwholder} 
    value={input} 
    onChange={e => setInput(e.target.value)} 
    className={`${css.input} ${className} ${bacgroundFill?css.bacgroundFill:''}`}
    id={id}
    min={min}
    type={type}
    onKeyDown={e => {if (e.key ==='Enter')onSubmit()}} 
   
    />
    
  )
}

export default RigthModalInput