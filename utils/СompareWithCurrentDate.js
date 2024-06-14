function СompareWithCurrentDate(dateStr) {
    let currentDate = new Date();

    // Обнуляем время у текущей даты для корректного сравнения только по дате
    currentDate.setHours(0, 0, 0, 0);

    if (dateStr < currentDate) {
        return 0; // inputDate меньше currentDate
    } else  {
        return 1;  // inputDate больше или равен currentDate
    }
}

export default СompareWithCurrentDate