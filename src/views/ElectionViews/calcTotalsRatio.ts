
type calcDividedTotalsType = (
  table: { [key: string]: string | number }[],
  firstProp: string,
  secondProp: string
) => number | string;

//This function returns total values of the first prop divided by total values of the second prop
export const calcDividedTotals: calcDividedTotalsType = (
  table,
  firstProp,
  secondProp
) => {
  if (
    typeof table[0][firstProp] !== "number" ||
    typeof table[0][secondProp] !== "number"
  ) {
    return "Error";
  }

  const firstTotal = table.reduce((prev, current) => prev + (current[firstProp] as number),
    0
  );
  const secondTotal = table.reduce((prev, current) => prev + (current[secondProp] as number),
    0
  );
  return (firstTotal / secondTotal).toFixed(3)
};
