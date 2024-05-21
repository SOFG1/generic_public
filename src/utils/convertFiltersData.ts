import { getFormatDate } from ".";

type OutputType = {
  [key: string]: string;
};


//This function takes filters data and converts to the format that receives API
// !!! alwayls run tests/convertFiltersData.test.ts in order to make sure you didn't brake something
export const convertFiltersData = (data: { [key: string]: any }): OutputType => {
  const dataFilters: { [column: string]: any } = {};
  for (const column in data) {
    let val: any = data[column];
    if(column === "not_null") {
      dataFilters[column] = val
      continue
    }
    if (typeof val === "boolean") {
      val = Number(val);
      dataFilters[column] = val
      continue
    }
    //Skip if both of values are null
    if(val[0] === null && val[1] === null) {
      continue
    }
    //For date range inputs
    if (Array.isArray(val) && (val[0] instanceof Date || val[1] instanceof Date)) {
      const firstDate = val[0] ? getFormatDate(val[0]) : ''
      const secondDate = val[1] ? getFormatDate(val[1]) : ''
      dataFilters[column] = `${firstDate} - ${secondDate}`;
      continue
    }
    //For number range inputs
    if (Array.isArray(val)) {
      const firstNum = val[0] ? val[0] : ''
      const secondNum = val[1] ? val[1] : ''
      dataFilters[column] =  `${firstNum} - ${secondNum}`;
      continue
    }
    if (val) {
      dataFilters[column] =  val
    }
  }
  return dataFilters;
};
