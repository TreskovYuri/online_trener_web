import css from './CircleChechBox.module.css'

const CircleChechBox = ({flag,setFlag}) => {
    if(flag){
        return (
            <div className={`${css.container} ${css.on}`} onClick={setFlag}></div>
          )
    }else{
        return (
            <div className={`${css.container} ${css.off}`} onClick={setFlag}></div>
          )
    }

}

export default CircleChechBox