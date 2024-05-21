import { numberWithCommas } from "../utils/numberWidthCommas"

describe("test add commas to big number utility", () => {

    test("test commas in 999", () => {
        //state
        const number = 999
        //action
        const newNumber = numberWithCommas(number)
        //result
        expect(newNumber).not.toMatch(/,/)
    })

    test("test commas in 1000", () => {
        //state
        const number = 1000
        //action
        const newNumber = numberWithCommas(number)
        //result
        expect(newNumber.slice(1,2)).toBe(',')
    })


    test("test commas in 100000", () => {
        //state
        const number = 100000
        //action
        const newNumber = numberWithCommas(number)
        //result
        expect(newNumber.slice(3,4)).toBe(',')
    })

    test("test commas in 1000000", () => {
        //state
        const number = 1000000
        //action
        const newNumber = numberWithCommas(number)
        //result
        expect(newNumber.slice(1,2)).toBe(',')
        expect(newNumber.slice(5,6)).toBe(',')
    })


    test("test commas in 1000000000", () => {
        //state
        const number = 1000000000
        //action
        const newNumber = numberWithCommas(number)
        //result
        expect(newNumber.slice(1,2)).toBe(',')
        expect(newNumber.slice(5,6)).toBe(',')
        expect(newNumber.slice(9,10)).toBe(',')
    })



})

export {}