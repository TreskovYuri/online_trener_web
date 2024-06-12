import mobx from "@/mobx/mobx"
import GETHandler from "@/utils/GETHandler"


class FixUtills {
    getGFixTest = async () => {
        await GETHandler({set :(e)=>mobx.setTestFix(e), url:"fix/test"})   
}
    getFixTraining = async () => {
        await GETHandler({set :(e)=>mobx.setTrainingFix(e), url:"sportprogramm/fix/bytrenerid"})   
}
}


export default new FixUtills