import mobx from "@/mobx/mobx"
import GETHandler from "@/utils/GETHandler"
import POSTHandler from "@/utils/POSTHandler"

class ChatUtills {
    createChat = async (formData) => {
        await POSTHandler({ url:"chat", formData})
        this.getMyChats()
    }
    getMyChats = async () => {
        await GETHandler({url:'chat', set:(e)=>mobx.setChats(e)})
    }
}
export default new ChatUtills