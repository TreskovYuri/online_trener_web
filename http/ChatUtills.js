import POSTHandler from "@/utils/POSTHandler"

class ChatUtills {
    createChat = async (formData) => {
        await POSTHandler({ url:"chat", formData})
    }
}
export default new ChatUtills