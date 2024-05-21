export const replaceChartNames = (
  login: string,
  chartData: { [key: string]: any[] }
) => {
  const sortedKeys = Object.keys(chartData).sort((a, b) => {
    let textA = a.toUpperCase();
    let textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const date: { [key: string]: any[] } = {};
  if (login === "Test_user_H") {
    sortedKeys.forEach((key: string, i: number) => {
      date[`נכס ${i + 1}`] = chartData[key];
    });
    return date;
  }
  if (login === "Test_user_E") {
    sortedKeys.forEach((key: string, i: number) => {
      date[`Asset ${i + 1}`] = chartData[key];
    });
    return date;
  }
  return chartData;
};
