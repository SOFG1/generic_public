// This function takes an object with values(string or [Date, Date] or [string, string])
// If value is [Date, Date] returns "DD.MM.YYYY - DD.MM.YYYY"
// If value is [Date, null] returns ""
// If values is [string, string] returns "string - string"
// If values is [string, null] returns ""

import { getFormatDate } from "../utils"
import { convertFiltersData } from "../utils/convertFiltersData"


test("convert filters data utility", () => {
    //Intitial data
    const filtersData = {
        1: "",
        2: "test",
        3: [new Date, null],
        4: [new Date, new Date],
        5: "test",
        6: ['145', '54'],
        7: [new Date, new Date],
        8: ['55', '55'],
        9: ['10', null],
        10: [null, '15'],
        11: [null, new Date],
        12: [null, null]
    }


    const expectedRes = {
        2: "test",
        3: `${getFormatDate(new Date)} - `,
        4: `${getFormatDate(new Date)} - ${getFormatDate(new Date)}`,
        5: "test",
        6: "145 - 54",
        7: `${getFormatDate(new Date)} - ${getFormatDate(new Date)}`,
        8: '55 - 55',
        9: '10 - ',
        10: ' - 15',
        11: ` - ${getFormatDate(new Date)}`

    }

    //action
    const result = convertFiltersData(filtersData)    
    
    expect(result).toEqual(expectedRes)

})