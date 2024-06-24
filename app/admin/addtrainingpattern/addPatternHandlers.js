

class AddPatternHandlers {
    // Обработчик изменения названий этапов
    updateStageName({ index, title, stages, setStages }) {
        const newStages = stages.map((stage, i) => 
            i === index ? { ...stage, title: title } : stage
        );
        setStages(newStages);
    }
    
    // Добавление этапа
    addStage({ stages, setStages}){
        setStages([...stages, {'title':''}])
    }
}
export default new AddPatternHandlers();