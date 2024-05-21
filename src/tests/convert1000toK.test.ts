import { convert1000toK } from "../utils/convert1000toK"

test('Convert 1000 to K test', () => {
    //state
    const zero = convert1000toK(0)
    const one = convert1000toK(1)
    const fiveHundreed = convert1000toK(500)
    const nines = convert1000toK(999)
    const oneK = convert1000toK(1000)
    const oneKone = convert1000toK(1001)
    const twoK = convert1000toK(2000)
    const tenK = convert1000toK(10000)
    const hundreedK = convert1000toK(100000)
    const million = convert1000toK(1000000)
    const billion = convert1000toK(1000000000)

    expect(zero).toBe('0')
    expect(one).toBe('1')
    expect(fiveHundreed).toBe('500')
    expect(nines).toBe('999')
    expect(oneK).toBe('1K')
    expect(oneKone).toBe('1K')
    expect(twoK).toBe('2K')
    expect(tenK).toBe('10K')
    expect(hundreedK).toBe('100K')
    expect(million).toBe('1000K')
    expect(billion).toBe('1000000K')


})