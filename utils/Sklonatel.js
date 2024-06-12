
// Фцнкция получает число и варианты склоняемых строк one-Единственное число,many-множественное число,rodit- строка в родительном падеже(кого-чего)
const Sklonatel = ({ count, one, many, rodit }) => {
    if (count % 10 === 1 && count % 100 !== 11) {
        return `${count} ${one}`;
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return `${count} ${rodit}`;
    } else {
        return `${count} ${many}`;
    }
}

export default Sklonatel;
