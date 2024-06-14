import css from './EquipmentsListScroll.module.css'

const EquipmentsListScroll = ({list}) => {
  return (
    <div className={css.container}>
        { list.slice(0,3).map(e => 
            (
                <div className={css.item} key={e}>{e}</div>
            )
        )}
    </div>
  )
}

export default EquipmentsListScroll