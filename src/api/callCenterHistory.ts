import { primaryInstance, secondaryInstance } from "./index";
import {
  IActivityFilters,
  ICallCenterHistoryFilter,
  IQuestionarieFilter,
} from "../store/callCenterHistory";
import { addZeroForward } from "../utils";

const formatDateFilter = (date: Date): string => {
  const days = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const years = date.getFullYear();
  return `${years}.${addZeroForward(month)}.${addZeroForward(days)}`;
}

export const CallCenterHistory = {
  getFilters: async (token: string) => {
    return await primaryInstance.get("call_center/history/get_filters/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getQuestionarieFilters: async (token: string, is_voter: boolean) => {
    return await primaryInstance.get(
      "call_center/history/questionaries_filters/",
      {
        params: {is_voter},
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getFiltersData: async (
    token: string | null,
    service: string,
    type: string,
    filterName: string,
    option: string
  ) => {
    return await primaryInstance.get(
      `call_center/history/get_filter_data/${service}/${type}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          filter_name: filterName,
          option,
        },
      }
    );
  },
  getOutgoingSms: async (token: string, params: ICallCenterHistoryFilter) => {
    return await primaryInstance.get(`call_center/history/sms/outgoing/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },

  getIncomingSms: async (token: string, params: ICallCenterHistoryFilter) => {
    return await primaryInstance.get(`call_center/history/sms/incoming/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getEmails: async (token: string, params: ICallCenterHistoryFilter) => {
    return await primaryInstance.get(`call_center/history/email/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  downloadIncomingSms: async (
    token: string,
    params: ICallCenterHistoryFilter
  ) => {
    return await secondaryInstance.get(
      `call_center/history/download/sms/incoming/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        params,
      }
    );
  },
  downloadOutgoingSms: async (
    token: string,
    params: ICallCenterHistoryFilter
  ) => {
    return secondaryInstance.get("call_center/history/download/sms/outgoing/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  downloadEmails: async (token: string, params: ICallCenterHistoryFilter) => {
    return await secondaryInstance.get("call_center/history/download/email/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  downloadQuestionaries: async (token: string, params: IQuestionarieFilter, is_voter: boolean) => {
    return await secondaryInstance.get(
      "call_center/history/questionaries_download/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {...params, is_voter},
      }
    );
  },
  getQuestionariesHistory: async (token: string, params: any, is_voter: boolean) => {
    return await primaryInstance.get("call_center/history/questionaries/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {...params, is_voter}
    });
  },
  getActivityHistory: async (
    token: string,
    offset: number,
    order_by: string,
    filters: IActivityFilters
  ) => {
    const params: any = {
      offset,
      order_by,
    };
    if (filters.page) params.page = filters.page;
    if (filters.action) params.action = filters.action;
    if (filters.selectedUsers) params.user_id = filters.selectedUsers;
    if (filters.dateFilter[0] || filters.dateFilter[1]) {
      const firstDate = filters.dateFilter[0] ? formatDateFilter(filters.dateFilter[0]) : ""
      const secondDate = filters.dateFilter[1] ? formatDateFilter(filters.dateFilter[1]) : ""

      params.time = `${firstDate} - ${secondDate}`;
    }
    return await primaryInstance.get("rankings/history/activity/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  downloadActivityHistory: async (
    token: string,
    offset: number,
    order_by: string,
    filters: IActivityFilters
  ) => {
    const params: any = {
      offset,
      order_by,
    };
    if (filters.page) params.page = filters.page;
    if (filters.action) params.action = filters.action;
    if (filters.selectedUsers) params.user_id = filters.selectedUsers;
    if (filters.dateFilter[0] || filters.dateFilter[1]) {
      const firstDate = filters.dateFilter[0] ? formatDateFilter(filters.dateFilter[0]) : ""
      const secondDate = filters.dateFilter[1] ? formatDateFilter(filters.dateFilter[1]) : ""

      params.time = `${firstDate} - ${secondDate}`;
    }
    return await secondaryInstance.get("rankings/history/activity/download/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
};
