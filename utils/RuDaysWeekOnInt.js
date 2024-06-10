


const RuDaysWeekOnInt = ({day,type}) => {
    const type1Array = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    switch (type){
        case 1:
            return type1Array[day]
        default:
            return type1Array[day]
    }
}

export default RuDaysWeekOnInt