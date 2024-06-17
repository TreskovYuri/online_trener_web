import DefaultIconCircleOnName from '../DefaultIconCircleOnName/DefaultIconCircleOnName'
import ImgIconCircle from '../ImgIconCircle/ImgIconCircle'

const UserIconImage = ({user}) => {
    if(user?.img){
        return <ImgIconCircle url={user.img}/>
    }else{
        return <DefaultIconCircleOnName text={user?.name} />
    }

}

export default UserIconImage