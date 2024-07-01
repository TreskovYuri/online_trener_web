import OpacityDiv from '../../MOTION/OpacityDiv/OpacityDiv'
import css from './CenterModalWind.module.css'

const CenterModalWind = ({child,setModal}) => {
  return (
    <OpacityDiv className={css.container} onClick={setModal}>
        <div className={css.modalWind} onClick={e => e.stopPropagation()}>
            {child}
        </div>
    </OpacityDiv>
  )
}

export default CenterModalWind