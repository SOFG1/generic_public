import { primaryInstance } from ".";

export const Election = {
  getFilters: async (token: string) => {
    return await primaryInstance.get('election_day/filters/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
  },
  getKpi: async (token: string, city?: string) => {
    const params: {city?: any} = {}
    if (city) params.city = city
    return await primaryInstance.get("election_day/kpi/", {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getGenderStat: async (token: string, city?: string) => {
    const params: {city?: any} = {}
    if (city) params.city = city
    return await primaryInstance.get("election_day/stat/", {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getVotingRate: async (token: string, city: string | undefined) => {
    const params: {city?: any} = {}
    if (city) params.city = city
    return await primaryInstance.get("election_day/voting_rate/", {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  setVotingRate: async (token: string, voting_rate: number) => {
    return await primaryInstance.post("election_day/voting_rate/", {voting_rate}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  resetVotingRate: async (token: string) => {
    return await primaryInstance.delete("election_day/voting_rate/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getTable: async (token: string, params: {city?: string, sortBy?: string}) => {
    return await primaryInstance.get("election_day/table/", {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getMap: async (token: string) => {
    return await primaryInstance.get("election_day/map/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

};
