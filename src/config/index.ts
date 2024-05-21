import { useTranslation } from "react-i18next";
import { colors } from "../styles/colors";


const status_colors: { [status: string]: string } | any = {
  Professional: colors.orange_6,
  Expert: colors.orange_5,
  Master: colors.orange_4,
  Amateur: colors.cyan_6,
  Newbie: colors.cyan_4,
  ["text"]: colors.cyan_4,
};

const colorsChart = [
  '#133D48',
  '#FF5530',
  '#F3C4BA',
  '#DCDCDC',
  '#BCD2CC',
  '#2BC8BE',
  '#0CAE7D',
  '#177D5E',
  '#133D48',
  '#FFF492',
  '#C5F7FF',
  '#E4C9FF',
  '#C3FFA7',
  '#EEA5D1',
  '#000000',
];

//This hook returns date options with translations
const useDateOptions = () => {
  const {t} = useTranslation()
  const dateOptions = [
    {
      item: t("stats_date-1day"),
      value: 1,
    },
    {
      item: t("stats_date-7day"),
      value: 7,
    },
    {
      item: t("stats_date-10day"),
      value: 10,
    },
    {
      item: t("stats_date-14day"),
      value: 14,
    },
    {
      item: t("stats_date-30day"),
      value: 30,
    },
    {
      item: t("stats_date-90day"),
      value: 90,
    },
  ];

  return dateOptions
}



export { status_colors, colorsChart, useDateOptions };
