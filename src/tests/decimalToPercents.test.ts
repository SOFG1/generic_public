import { decimalToPercents } from "../utils/decimalToPercents"

test("test decimal to percents convertation (2 digits after 0)", () => {
    
    //state
    const numbers = [0.01, 0.05, 0.1, 0.2, 0.26666605,0.99, 1, 0]

    //action
    const newNumbers = numbers.map(n => {
        return parseInt(decimalToPercents(n, 0), 10)
    })

    //result
    newNumbers.forEach((n, i) => {
        expect(n).toBeLessThanOrEqual(100)
        expect(n).toBeGreaterThanOrEqual(0)
        if (n.toString().split('.')[1]) {
            const numbersCountAfterDot = n.toString().split('.')[1].length
        expect(numbersCountAfterDot).toBe(2)
        }
    })
})