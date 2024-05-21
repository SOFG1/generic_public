import { primaryInstance, secondaryInstance } from ".";

export const Volunteers = {
  getStaticData: async (token: string) => {
    return await primaryInstance.get("volunteer/static_data/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createActivity: async (token: string, data: { [key: string]: string | null }) => {
    return await primaryInstance.post("volunteer/activity/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  assignActivity: async (token: string, activity_id: number, personal_ids: string[]) => {
    return await primaryInstance.post("volunteer/row_mapping/", {activity_id, personal_ids}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getMappingData: async (
    token: string,
    params: { activity_id: number; option: string }
  ) => {
    return await primaryInstance.get("volunteer/row_mapping/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getFiltersOptions: async (
    token: string,
    filter_name: string,
    option: string
  ) => {
    return await primaryInstance.get("volunteer/activiti_table_filters/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        filter_name,
        option 
      }
    });
  },
  searchRows: async (
    token: string,
    activity_id: number,
    option?: string
  ) => {
    const params: {[key: string]: string | number} = {activity_id}
    if (option) params.option = option
    return await primaryInstance.get("volunteer/row_mapping/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params
    });
  },
  getTable: async (
    token: string,
    filters: {[key: string]: string[]},
    offset: number
  ) => {
    return await primaryInstance.get("volunteer/activity_table/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {...filters, offset}
    });
  },
  downloadTable: async (
    token: string,
    filters: {[key: string]: string[]},
  ) => {
    return await secondaryInstance.get("volunteer/activity_table/download/", {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filters
    });
  },
  deleteRow: async (
    token: string,
    rowId: number,
  ) => {
    return await primaryInstance.delete(`volunteer/activity_table/${rowId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
