import DefaultIconCircleOnName from '../DefaultIconCircleOnName/DefaultIconCircleOnName'
import ImgIconCircle from '../ImgIconCircle/ImgIconCircle'
import OpacityDiv from '../MOTION/OpacityDiv/OpacityDiv'
import css from './UserIconsRow.module.css'

const UserIconsRow = ({
    users,
    placeholder = 'Выберите кого бы вы хотели пригласить',
    }) => {
    if(!users || users.length ==0){return (
        <OpacityDiv className={css.container}>{placeholder}</OpacityDiv>
      )}else{
        return (
            <OpacityDiv className={css.container}>{users.slice(0, 8).map(el => <_Icon user={el}/> )}</OpacityDiv>
        )
      }
  
}

export default UserIconsRow


const _Icon = ({user}) => {
    return (
      <div className={css.icon}>
          {
            user.img?<ImgIconCircle url={user.img}/>:<DefaultIconCircleOnName text={user.name}/>
          }
      </div>
    )
}