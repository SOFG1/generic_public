export function decimalToPercents(num: number, digits = 2) {
    const percent = num * 100
    return percent % 1 < 0.01 ? percent.toFixed() : percent.toFixed(digits)
}