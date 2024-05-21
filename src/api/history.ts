import { primaryInstance, secondaryInstance } from "./index";



// History API
export const History = {
  getActions: async (token: string, params: any) => {
    return await primaryInstance.get("history/table/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params
    });
  },
  downoladActions: async (token: string, params: any) => {
    return await secondaryInstance.get("history/download/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params
    });
  },
};
