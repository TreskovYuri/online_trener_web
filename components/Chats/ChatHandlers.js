import ChatUtills from "@/http/ChatUtills";
import mobx from "@/mobx/mobx";
import { ErrorHandler } from "@/utils/ErrorHandler";

class ChatHandlers {
    inputClickHandler = ({ item, setMessageOnlyI }) => {
        switch (item) {
            case 'Все участники':
                setMessageOnlyI(false);
                break;
            default:
                setMessageOnlyI(true);
                break;
        }
    }

    handleCurrentUser = ({user,currentUsers,setCurrentUsers}) => {
        if(currentUsers.find(el => el.id == user.id)){
            setCurrentUsers(currentUsers.filter(el => el.id != user.id))
        }else{
            setCurrentUsers([...currentUsers, user])
        }
    }


    handleSearch = ({text,setSearchUsers}) => {
        if (text) {
            const results = mobx.users.filter(user =>
              user.name?.toLowerCase().includes(text.toLowerCase()) && user.id != mobx.user?.id
            );
            setSearchUsers(results)
          }else{
            setSearchUsers(mobx.users.filter(el => el?.id != mobx.user?.id))
          }
    }


    create = async({name,messageOnlyI,currentUsers,close}) => {
        if(!name && currentUsers.length>1){
            ErrorHandler('Заполните название чата')
            return
        }
        if(currentUsers.length==0){
            ErrorHandler('Выберите хотя бы одного пользователя')
            return
        }
        try{
            const formData = new FormData()
            formData.append('name',name)
            formData.append('messageOnlyI',messageOnlyI)
            formData.append('users',JSON.stringify(currentUsers))
            await ChatUtills.createChat(formData)
            close()
        }catch(err){
            ErrorHandler('Произошла ошибка!')
            console.log(err)
        }
    }
}




export default new ChatHandlers(); // Экспортируем экземпляр класса
