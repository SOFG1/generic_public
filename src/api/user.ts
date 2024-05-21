import { primaryInstance, secondaryInstance } from "./index";
import { ILoginData, IRegistrationData } from "../store/user/types";

export type UserActivityType = {
  time: string,
  action: string,
  page: string
}

interface IReportBugData {
  user_name: string
  user_info: string
  title: string
  email: string
  description: string
  steps: string
  criticality: "1" | "2" | "3" | "4"
  files: File[]
}

export const User = {
  login: async (data: ILoginData) => {
    return await primaryInstance.post(`user/login/`, { ...data });
  },
  userInfo: async (token: string) => {
    return await primaryInstance.get(`user/user-info/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  userInfoById: async (token: string, id: number) => {
    return await primaryInstance.get(`user/user-info/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  logout: async () => {
    return await primaryInstance.post(`user/logout/`);
  },
  registration: async (data: IRegistrationData) => {
    const reqData = new FormData();
    Object.keys(data).forEach((field) => {
      //@ts-ignore
      reqData.append(field, data[field]);
    });
    return await primaryInstance.post(`user/registration/`, reqData);
  },
  postUser: async (
    data: { [key: string]: string | string[] },
    token: string
  ) => {
    return await primaryInstance.post(
      `user/edit/`,
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getCitiesOptions: async (token: string, countryId: number) => {
    return await primaryInstance.get(`user/citys/${countryId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  putUploadTable: async (
    data: {
      file_name: string;
      slectedSheet: string;
      columns: { [key: string]: string };
      available_city: number[] | null
      country: number;
    },
    token: string
  ) => {
    return await primaryInstance.put(
      `user/upload-table/`,
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  abordUploadedTable: async (token: string, uploadid: string) => {
    return await primaryInstance.get(`user/upload-table/?action=abord`, {
      headers: {
        Authorization: `Token ${token}`,
        "Upload-id": uploadid,
      },
    });
  },
  getUsers: async (token: string) => {
    return await primaryInstance.get(`user/users/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteUser: async (id: number, token: string) => {
    return await primaryInstance.delete(`user/delete/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  bulkDeleteUsers: async (token: string, id_list: number[]) => {
    return await primaryInstance.delete(`user/bulk_delete/`, {
      data: { id_list },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createUsers: async (data: any, token: string) => {
    return await primaryInstance.post(`user/create/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editUsers: async (id: number, data: any, token: string) => {
    return await primaryInstance.post(`user/edit/${id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getAllPermissions: async (token: string) => {
    return await primaryInstance.get(`user/all_permissions/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getCountries: async () => {
    return await primaryInstance.get("user/countrys/");
  },
  uploadSignature: async (b64_img: string, token: string) => {
    return await primaryInstance.post(
      "user/signature/",
      { b64_img },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getNotifications: async (token: string) => {
    return await secondaryInstance.get("user/notifications/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  downloadNotificationFile: async (token: string, fileId: number) => {
    return await secondaryInstance.get(`user/user_files/${fileId}`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteNotification: async (token: string, id: number) => {
    return await secondaryInstance.delete(`user/notifications/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  sendActivity: async (token: string, activity: UserActivityType) => {
    return await primaryInstance.post(`user/activity/`, {activitys: [activity]},{
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  reportBug: async (token: string, data: IReportBugData) => {
    const formData = new FormData()
    formData.append("user_name", data.user_name)
    formData.append("user_info", data.user_info)
    formData.append("description", data.description)
    formData.append("email", data.email)
    formData.append("criticality", data.criticality)
    formData.append("title", data.title)
    formData.append("steps", data.steps)
    data.files.forEach(f => formData.append("files", f))
    return await primaryInstance.post(`core/jira/issue/`,formData,{
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  
};
