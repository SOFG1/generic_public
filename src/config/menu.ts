import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useUserState } from "../store/user";

interface IMenuItem {
  key: string;
  link: string;
  name: string;
  icon: string;
}

//Menu becomes fixed on this mediaquery, also hints dissapear on this breakpoint
const fixedMenuBP = "740px";



//Return menu items array with permissions, translations and some exceptional cases depending on userInfo
const useMenu = (): IMenuItem[] => {
  const {t} = useTranslation()
  const {userInfo} = useUserState()
  const memoized = useMemo(() => {
    return [
      {
        key: "SM_stats",
        link: "/",
        name: t("menu-SM_stats"),
        icon: "StatsIcon",
      },
      {
        key: "Raw_Data",
        link: "/raw-data",
        name: t("menu-Raw_Data"),
        icon: "RawDataIcon",
      },
      {
        key: "Ranking",
        link: "/monitoring",
        name: t("menu-Ranking"),
        icon: "MenuThreeIcon",
      },
      // {
      //   key: "CallCenter",
      //   link: "/distribution",
      //   name: t("menu-CallCenter"),
      //   icon: "DistributionIcon",
      // },
      {
        key: "CallCenterHistory",
        link: "/distribution-history",
        name: t("menu-CallCenterHistory"),
        icon: "HistoryIcon",
      },
      {
        key: "ElectionDay",
        link: "/election",
        name: t("menu-ElectionDay"),
        icon: "ElectionDayIcon",
      },
      {
        key: "Volunteer",
        link: "/volunteers",
        //Different name for this group of users
        name: userInfo?.group?.id === 332 ? t("menu-Employees") : t("menu-Volunteer"),
        icon: "VolunteersIcon",
      },
      {
        key: "opponnents",
        link: "/opponents",
        name:  t("menu-opponnents"),
        icon: "OpponentsIcon",
      },
      {
        key: "Users",
        link: "/user",
        name:  t("menu-Users"),
        icon: "UserIcon",
      },
      {
        key: "Settings",
        link: "/settings",
        name:  t("menu-Settings"),
        icon: "SettingsIcon",
      },
      // {
      //   key: "connections",
      //   link: "/relations",
      //   name: t("menu-Relations"),
      //   icon: "OpponentsIcon",
      // },
    ].filter((tab) => userInfo?.permissions[tab.key].access)
  }, [userInfo, t])
  return memoized
};



export {useMenu, fixedMenuBP}
