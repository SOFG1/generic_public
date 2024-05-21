import { primaryInstance, secondaryInstance } from "./index";

export interface IAnaliticModelParams {
  filters: { [key: string]: any }
  prediction_field: string
  pro_status: string[]
  anti_status: string[]
  categorical_columns: string[]
  numeric_columns: string[]
}

export interface IClusteringParams {
  filters: { [key: string]: any }
  categorical_columns: string[]
}

export const RawData = {
  getFilters: async (token: string) => {
    return await primaryInstance.get(`raw_data/get_filters/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getFields: async (token: string) => {
    return await primaryInstance.get(`raw_data/get_fields/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getTableColumns: async (token: string) => {
    return await primaryInstance.get(`raw_data/get_table_columns/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getSummarizationReport: async (token: string) => {
    return await secondaryInstance.get(`rankings/cloud2/summarize_posts/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getStat: async (
    token: string,
    params?: { [key: string]: string | number; limit: number; offset: number }
  ) => {
    return await primaryInstance.get(`raw_data/stat/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  updateStat: async (
    token: string,
    filtersData?: { [key: string]: any; limit: number; offset: number }
  ) => {
    const params = { ...filtersData };
    if (params.not_null) params.not_null = params.not_null.join(",");
    return await primaryInstance.get(`raw_data/stat_reload/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getFilterData: async (
    params: { filter_name: string; option?: string | number },
    token: string
  ) => {
    return await primaryInstance.get(`raw_data/get_filter_data/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getTable: async (
    token: string,
    params?: { [key: string]: string | number; limit: number; offset: number }
  ) => {
    console.log(params)
    return await primaryInstance.get(`raw_data/get_table/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getAudienceCSV: async (
    token: string,
    audience: number
  ) => {
    return await primaryInstance.get(`fb_marketing/customaudience_file/`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { audience },
    });
  },
  getStrategicReport: async (
    token: string,
    location: string,
    party_name: string,
    job: string
  ) => {
    return await secondaryInstance.get(`rankings/cloud2/strategic_report/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { location, party_name, job},
    });
  },
  delete: async (data: any, token: string) => {
    return await primaryInstance.delete(`raw_data/delete/`, {
      data: { filters: data },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  create: async (values: { [slug: string]: any }, token: string) => {
    const copy = { ...values }
    if (!copy?.institutions?.length) {
      delete copy.institutions
    }
    return await primaryInstance.post(
      `raw_data/create/`,
      { values: copy },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  edit: async (id: string, values: { [slug: string]: any }, token: string) => {
    return await primaryInstance.post(
      `raw_data/edit/`,
      { filters: { id }, values },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getStatuses: async (token: string) => {
    return await primaryInstance.get(`raw_data/statuses/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  setRowStatus: async (token: string, id: string, status: string) => {
    return await primaryInstance.post(
      `raw_data/set_status/`,
      { id, status },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  requestExcelDownload: async (
    token: string,
    filters?: { [key: string]: string | number }
  ) => {
    return await secondaryInstance.get(`raw_data/table_download/`, {
      params: {
        ...filters,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  putUploadTable: async (
    data: {
      file_name: string;
      start_file_name: string;
      slectedSheet: string;
      columns: { [key: string]: string };
    },
    token: string
  ) => {
    return await primaryInstance.put(
      `raw_data/table_upload/`,
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  abortTableFile: async (token: string, uploadid: string) => {
    return await primaryInstance.get(`raw_data/table_upload/?action=abord`, {
      headers: {
        Authorization: `Token ${token}`,
        "Upload-id": uploadid,
      },
    });
  },
  getUploadTable: async (token: string) => {
    return await primaryInstance.get(`raw_data/template/`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getUpdateTable: async (token: string) => {
    return await primaryInstance.get(`raw_data/bulk_update/template/`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  bulkUpdate: async (
    params: { values: Object; file?: File; id_list?: string },
    token: string
  ) => {
    return await primaryInstance.post(`raw_data/bulk_update/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  rowFileUpload: async (token: string, row_id: string, file: File) => {
    const params = new FormData();
    params.append("id", row_id);
    params.append("file", file);
    return await secondaryInstance.post(`raw_data/row_file/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  downloadRowFiles: async (token: string, row_id: string) => {
    return await secondaryInstance.get(`raw_data/row_file/`, {
      params: { id: row_id },
      responseType: 'blob',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  downloadRowFile: async (token: string, link: string) => {
    return await secondaryInstance.get(`raw_data/row_file/${link}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getRowFiles: async (token: string, row_id: string) => {
    return await secondaryInstance.get(`raw_data/row_files_list/${row_id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  downloadPivot: async (
    token: string,
    params?: { [key: string]: string | number; }
  ) => {
    return await secondaryInstance.get(`raw_data/pivot_report/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  analiticModel: async (
    token: string,
    params: IAnaliticModelParams
  ) => {
    return await secondaryInstance.post(`raw_data/analitic/model/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  clustering: async (
    token: string,
    params: IClusteringParams
  ) => {
    return await secondaryInstance.post(`raw_data/analitic/group_by_report/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  updateByFamiliesId: async (
    token: string,
    family_id: string,
    columns: { [key: string]: any }
  ) => {
    return await primaryInstance.post(`raw_data/family_id/`, { family_id, columns }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
