import { convert972to0 } from "../utils/convert972to0"

test('test convert972to0', () => {
    //state
    const number = '+9725797074889'

    //action
   const converted = convert972to0(number)
   //result

   expect(converted.slice(0,4)).not.toBe('+972')
   expect(converted.slice(0,1)).toBe('0')


})