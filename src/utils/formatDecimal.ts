function formatFloat(num:number, fractionDigits:number) {
    if (Number(num) === num && num % 1 !== 0) {
        return num.toFixed(fractionDigits);
    } else {
        return num;
    }
}
export default formatFloat;
