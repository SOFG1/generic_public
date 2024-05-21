import { primaryInstance } from ".";

export const Opponents = {
  getOpponents: async (token: string, keyword: string, country_id?: number) => {
    return await primaryInstance.get(`sm_stats/opponnents/`, {
      params: { keyword, country_id: country_id ? country_id : null },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getOpponentData: async (
    token: string,
    opponentPageIds: string,
    days: number,
    countryId?: number
  ) => {
    return await primaryInstance.post(
      `sm_stats/opponnents/`,
      {
        opponnent: opponentPageIds,
        days,
        country_id: countryId ? countryId : null,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getOpponentsGTrends: async (
    token: string,
    keywords: string,
    days: number,
    countryFilter?: number
  ) => {
    return await primaryInstance.get(`sm_stats/gtrends/`, {
      params: {
        keywords,
        days,
        country_id: countryFilter ? countryFilter : null,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
