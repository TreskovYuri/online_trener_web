import mobx from "@/mobx/mobx";

const RigthModalHandleSearch = ({search,setSearch, type})=>{
    const exercises = mobx.exercises;
    const tests = mobx.tests;
    const nutritions = mobx.nutritions;
    const trainingPatterns = mobx.trainingPatterns;


    if(search.length>0){
        switch (type) {
            case 'Упражнения':
                return  exercises.filter(item =>item.nameRu?.toLowerCase().includes(search.toLowerCase()));
            case 'Тесты':
                return  tests.filter(item =>item.name?.toLowerCase().includes(search.toLowerCase()));
            default:
                break;
        }
    }else{
        switch (type) {
            case 'Упражнения':
                return  exercises;
            case 'Тесты':
                return  tests;
            default:
                break;
        }
    }
}
export default RigthModalHandleSearch;

