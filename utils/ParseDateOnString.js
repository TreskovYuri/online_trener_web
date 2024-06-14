
function ParseDateOnString(dateStr) {
    // Разбиваем строку на компоненты
    let [day, month, year] = dateStr.split('.');
    // Создаем новую дату в формате 'YYYY-MM-DD'
    return new Date(`${year}-${month}-${day}`);
}

export default ParseDateOnString