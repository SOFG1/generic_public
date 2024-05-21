export const getPercentOfTotal = (val: number, total: number, digitsAfterComma: number = 2): number => {
    const percent = val / total * 100
    if(typeof digitsAfterComma === 'number') {
        return Number(percent.toFixed(digitsAfterComma))
    }
    return percent
}