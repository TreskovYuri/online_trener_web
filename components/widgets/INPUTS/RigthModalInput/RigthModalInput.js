import css from './RigthModalInput.module.css'

const RigthModalInput = ({placwholder, input,setInput, min=0,type='text',className='',id=''}) => {
  return (
    <input  
    placeholder={placwholder} 
    value={input} 
    onChange={e => setInput(e.target.value)} 
    className={`${css.input} ${className}`}
    id={id}
    min={min}
    type={type}/>
  )
}

export default RigthModalInput