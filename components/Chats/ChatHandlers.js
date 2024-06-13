import mobx from "@/mobx/mobx";

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
              user.name?.toLowerCase().includes(text.toLowerCase())
            );
            setSearchUsers(results)
          }else{
            setSearchUsers(mobx.users)
          }
    }
}




export default new ChatHandlers(); // Экспортируем экземпляр класса
