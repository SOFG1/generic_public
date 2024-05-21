import { primaryInstance } from "./index";
import {
  SendAnswerAction,
  SendEmailAction,
  SendSmsAction,
  CreateCampaingAction,
  CreateSetAction,
  CreateAudienceAction,
  CreateAdAction,
  DeleteNodeAction,
} from "../store/callCenter";
import { InputValueType } from "../types";



export interface IDistributionAnswerParams {
  interviewee: string
  answer: SendAnswerAction
  questionarie: number
  phone: string | null
  audience: number | null
}

export const CallCenter = {
  getApply: async (token: string, filtersData?: { [key: string]: any }) => {
    const params = { ...filtersData };
    if (params.not_null) params.not_null = params.not_null.join(",");
    return await primaryInstance.get("call_center/applay_filter/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params,
    });
  },
  getSms: async (token: string) => {
    return await primaryInstance.get("call_center/sms/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getSmsServices: async (token: string) => {
    return await primaryInstance.get("call_center/sms/services/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  sendAttachment: async (token: string, data: FormData) => {
    return await primaryInstance.post("call_center/email/attachment/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteAttachment: async (token: string, fileId: number) => {
    return await primaryInstance.delete(`call_center/email/attachment/${fileId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postSms: async (
    token: string,
    data: SendSmsAction
  ) => {
    return await primaryInstance.post(
      "call_center/sms/",
      { filters: {}, ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getSmsCampaigns: async (token: string) => {
    return await primaryInstance.get(
      "call_center/sms/compaings/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getSmsAudienceRecCount: async (token: string, audience_ids: number[]) => {
    return await primaryInstance.post(
      "call_center/sms/count_recipients/",
      { audience_ids },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getEmail: async (token: string) => {
    return await primaryInstance.get("call_center/email/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getEmailServices: async (token: string) => {
    return await primaryInstance.get("call_center/email/services/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postEmail: async (
    token: string,
    data: SendEmailAction,
    addresses?: string[]
  ) => {
    return await primaryInstance.post(
      "call_center/email/",
      { filters: {}, addresses, ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  translateHTML: async (token: string, html: string) => {
    return await primaryInstance.post(
      "core/translate_text/",
      { text: html },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getEmailAudienceRecCount: async (token: string, audience_ids: number[]) => {
    return await primaryInstance.post(
      "call_center/email/count_recipients/",
      { audience_ids },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getQuestionariesList: async (token: string) => {
    return await primaryInstance.get("call_center/questionaries/list/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getQuestionariesInterviewees: async (
    token: string,
    filtersData: { [key: string]: any },
    questionarie: number
  ) => {
    const params = { ...filtersData };
    if (params.not_null) params.not_null = params.not_null.join(",");
    return await primaryInstance.get("call_center/questionaries/interviewees/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { ...params, questionarie },
    });
  },
  postAnswers: async (
    token: string,
    params: IDistributionAnswerParams) => {
    return await primaryInstance.post(
      "call_center/questionaries/answers/",
      params,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postLogId: async (
    token: string,
    logId: number
  ) => {
    return await primaryInstance.post(
      `call_center/questionaries/call_interviewees/${logId}/`, {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  updateField: async (
    token: string,
    id: number,
    values: { [slug: string]: InputValueType }
  ) => {
    return await primaryInstance.post(
      "call_center/update_fields/",
      { interviewee: id, values },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getFBAccountList: async (token: string) => {
    return await primaryInstance.get("fb_marketing/accounts/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getFBCampaings: async (token: string, acc_id: number) => {
    return await primaryInstance.get("fb_marketing/campaings/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { acc_id: acc_id },
    });
  },
  getFBSets: async (token: string, acc_id: number) => {
    return await primaryInstance.get("fb_marketing/sets/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { acc_id: acc_id },
    });
  },
  getFBAudiences: async (token: string, acc_id: number) => {
    return await primaryInstance.get("fb_marketing/customaudience/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { acc_id: acc_id },
    });
  },
  createFbPageAudeince: async (token: string, data: any) => {
    return await primaryInstance.post(
      "fb_marketing/customaudience/page_like/",
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createFbCampaignAudeince: async (token: string, data: any) => {
    return await primaryInstance.post(
      "fb_marketing/customaudience/campaign_conversions/",
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getDBAds: async (token: string, acc_id: number) => {
    return await primaryInstance.get("fb_marketing/ad/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { acc_id: acc_id },
    });
  },
  getFBCreatives: async (token: string, acc_id: number) => {
    return await primaryInstance.get("fb_marketing/creatives/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { acc_id: acc_id },
    });
  },
  getCampaingParams: async () => {
    return await primaryInstance.get("fb_marketing/campaing_params/");
  },
  getSetParems: async () => {
    return await primaryInstance.get("fb_marketing/set_params/");
  },
  getCreativesParams: async (token: string) => {
    return await primaryInstance.get("fb_marketing/creatives_params/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postCampaings: async (token: string, data: CreateCampaingAction) => {
    return await primaryInstance.post(
      "fb_marketing/campaings/",
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postSets: async (token: string, data: CreateSetAction) => {
    return await primaryInstance.post(
      "fb_marketing/sets/",
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postCreatives: async (token: string, data: any) => {
    return await primaryInstance.post("fb_marketing/creatives/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postCustomAudience: async (
    token: string,
    filters: { [key: string]: string | number },
    data: CreateAudienceAction
  ) => {
    return await primaryInstance.post(
      "fb_marketing/customaudience/",
      { filters: filters, ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postAd: async (token: string, data: CreateAdAction) => {
    return await primaryInstance.post(
      "fb_marketing/ad/",
      { ...data },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteFbNode: async (token: string, data: DeleteNodeAction) => {
    return await primaryInstance.delete(`fb_marketing/${data.node}/${data.id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
