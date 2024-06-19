import mobx from "@/mobx/mobx"
import GETHandler from "@/utils/GETHandler"
import POSTHandler from "@/utils/POSTHandler"

class ChatUtills {
    createChat = async (formData) => {
        await POSTHandler({ url:"chat", formData})
        this.getMyChats()
    }
    getMyChats = async () => {
        await GETHandler({url:'chat', set:(e)=>mobx.setChats(e),loader:false})
    }
    getMessageByChat = async (id) => {
        await GETHandler({url:`chat/${id}`, set:(e)=>mobx.setMessages(e),loader:false})
    }
    readMessageByChatId = async (id) => {
        await GETHandler({url:`chat/read/${id}`, set:()=>{},loader:false})
        this.getMyChats()
    }
    checkMessages = async () => {
        await GETHandler({url:`chat/read/`, set:(e)=>mobx.setGlobalMessages(e),loader:false})
    }
}
export default new ChatUtills