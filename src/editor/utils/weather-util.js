export function convertToCelcius(temp) {
    return Math.round(((temp - 32) * 5) / 9);
}

export function convertTemprature(unit, temp) {
    if('c' === unit){
        return convertToCelcius(temp);
    }
    return temp;
}