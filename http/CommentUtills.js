import mobx from "@/mobx/mobx"
import GETHandler from "@/utils/GETHandler"
import POSTHandler from "@/utils/POSTHandler"


class CommentUtills {
    getComments = async () => {
        GETHandler({set :(e)=>mobx.setComments(e), url:"sportprogramm/comment"})
    }
    setComments = async (formData) => {
        await POSTHandler({ url:"sportprogramm/comment", formData})
        await this.getComments()
    }



}

export default new CommentUtills