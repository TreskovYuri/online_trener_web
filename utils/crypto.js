import chalk from "chalk";

const key = 'ozJQgmSd-hsWgfa01B9EV2Bwbw1YPb6WDqWI-Mjs3UKWbrsk3CTPyRHWRVEYXQ-PnH-DV4C722BbXwsa79mTsl5e1vcT9EPmA7445P8ED2vzMCDWoRUIAd1_UNP2GdJZTEeL1GOpv_JzCtnLm9S-YapyK-RKLDTAZf6YTsSkzxHcVrpAMMKKugkVYUFJlXX8zIWm_GaLI5_WxVtuCVmqBaL7r-gszXPz01VWTC56bKfzPFvK0kaAKU9OX45OpYLc2IamAB_NTE3iDiHKY0P82-knNjUZ-PoQnOKkMPdB-ckod-hsWgfa01B9EV2Bwbw1YPb6WDqWI-Mjs3UKWbrsk3CTPyRHWRVEYXQ-PnH-DV4C722BbXwsa79mTsl5e1vcT9EPmA7445P8ED2vzMCDWoRUIAd1_UNP2G'


// Функция для шифрования данных
export async function encryptSecret(text){
    console.log('<================== Шифрование email...')
    let result = '';
    for (let i = 0; i < text.length; i++) {
        // Применяем XOR операцию между символом строки и символом ключа
        const charCode = text.charCodeAt(i);
        // console.log(charCode)
        // Преобразуем полученный результат в символ и добавляем к результату
        result += key[charCode] + key[charCode+1] + key[charCode+2] + key[charCode+3] + key[charCode+4]
    }
    console.log(text)
    console.log(result)
    return result;
}


// Функция для расшифровки данных
export async function decryptSecret(encryptedText) {
    let result = '';
    for (let i = 0; i < encryptedText.length; i+=5) {
        // Применяем XOR операцию между символом строки и символом ключа
        const charCode = String.fromCharCode(key.indexOf(encryptedText[i]+encryptedText[i+1]+encryptedText[i+2]+encryptedText[i+3]+encryptedText[i+4]));

        // Преобразуем полученный результат в символ и добавляем к результату
        result += charCode
    }
    return result;
}