
// Функция принимает дату в и сравнивает ее с текущей, возвращает True если она больше или равна 
function СompareWithCurrentDate(dateStr) {
    let currentDate = new Date();

    // Обнуляем время у текущей даты для корректного сравнения только по дате
    currentDate.setHours(0, 0, 0, 0);

    if (dateStr <= currentDate) {
        return false; // inputDate меньше currentDate
    } else  {
        return true;  // inputDate больше или равен currentDate
    }
}

export default СompareWithCurrentDate