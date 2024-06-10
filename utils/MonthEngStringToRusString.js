


const MonthEngStringToRusString = ({month, register}) => {
    const minRegArray = {
        January: "Январь",
        February: "Февраль",
        March: "Март",
        April: "Апрель",
        May: "Май",
        June: "Июнь",
        July: "Июль",
        August: "Август",
        September: "Сентябрь",
        October: "Октябрь",
        November: "Ноябрь",
        December: "Декабрь",
      };
      const maxRegArray = {
        January: "января",
        February: "февраля",
        March: "марта",
        April: "апреля",
        May: "мая",
        June: "июня",
        July: "июля",
        August: "августа",
        September: "сентября",
        October: "октября",
        November: "ноября",
        December: "декабря",
      };
    if(register == 'min'){
        return minRegArray[month]
    }else{
        return maxRegArray[month]
    }
}

export default MonthEngStringToRusString