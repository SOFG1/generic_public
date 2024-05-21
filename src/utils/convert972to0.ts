
//this function returns 0 instead of +972 if number begins with +972
export const convert972to0 = (number: any) => {
return String(number).slice(0,4) === '+972' ? String(number).replace('+972', '0') : number
}