import React from 'react';
import css from './UserScrollList.module.css';
import ListView from '../DEFAULT/ListView/ListView';
import ImgIconCircle from '../ImgIconCircle/ImgIconCircle';
import DefaultIconCircleOnName from '../DefaultIconCircleOnName/DefaultIconCircleOnName';
import CircleChechBox from '../INPUTS/CircleChechBox/CircleChechBox';



const UserScrollList = ({users, currentUsers, setCurrentUsers}) => {

  return (
    <ListView 
    height={15} 
    list={users} 
    builder={(user, index) => {
        return <div key={index} className={css.itemCard}>
            <div className={css.checkBox}>
             <CircleChechBox flag={currentUsers.find(el => el.id == user.id)?true:false} setFlag={()=>setCurrentUsers(user)}/>
            </div>
            {<div className={css.icon}>{user.img ? <ImgIconCircle url={user.img} width='2vw'/> :<DefaultIconCircleOnName text={user.name}/>}</div>}
            <span className={css.itemName}>{user.name!=''?user.name:'Не заполнено'}</span>
        </div>;
      }} 
      />
  );
};

export default UserScrollList;
