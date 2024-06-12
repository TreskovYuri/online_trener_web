


const NameSokrashatel = ({text}) => {
    if(!text || text.length==0) return ''
    const array = text.split(' ')
    switch (array.length) {
        case 1:
            return array[0]
        case 2:
            return `${array[0]} ${array[1].split('')[0]+'.'}`
        case 3:
            return `${array[0]} ${array[1].split('')[0]+'.'} ${array[2].split('')[0]+'.'}`
    
        default:
            break;
    }
}

export default NameSokrashatel