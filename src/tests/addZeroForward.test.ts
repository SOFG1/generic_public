import { addZeroForward } from "../utils"

test("add zero to forward test", () => {
    //state
    const string = '1213'
    const needLength = 10

    //action
    const newString = addZeroForward(string, needLength)
    const addedChars = newString.slice(0, needLength - string.length)


    //result
    expect(newString.length).toBe(needLength)
    for (let char of addedChars) {
        expect(char).toBe('0')
    }

})

export {}