export const convert1000toK = (number: number): string => {
    if (number >= 1000) {
        return `${Math.floor(number / 1000)}K`
    }
    return String(number)
}