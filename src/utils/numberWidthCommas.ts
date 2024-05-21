export const numberWithCommas = (x: number | string) => {
  if(typeof x === 'number') x = x.toString()
  return x?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
