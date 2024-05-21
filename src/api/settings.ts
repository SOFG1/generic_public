import {primaryInstance, secondaryInstance} from "./index";
import {IColumnsForm, ICreateField, IDefaultPage,} from "../store/settings";

export interface IEditInstitution {
  inst_name?: string;
  is_main?: boolean;
  color?: string | null;
}

export interface ISwithAppModeParams {
  voter_users: number[],
  mode: string,
  update_negative_status?: boolean
  ballot_id?: number
}

export type VoterContactsModeType = "Contacts sync and inject" | "Inject only";

export const Settings = {
  getColumns: async (token: string) => {
    return await primaryInstance.get(`settings/columns/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  putColumn: async (
    data: IColumnsForm | { id: number; options: Array<[string, string]> },
    token: string
  ) => {
    return await primaryInstance.put(`settings/columns/${data.id}/`, { ...data, order: 2 }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  changeColumnOrder: async (token: string, id: number, order: number) => {
    return await primaryInstance.post(`settings/columns/${id}/drag/`, { order }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteColumn: async (token: string, fieldId: number) => {
    return await primaryInstance.delete(`settings/columns/${fieldId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getColumnOptions: async (token: string, field: string) => {
    return await primaryInstance.get(`settings/columns/options/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: { field },
    });
  },
  postOption: async (token: string, column_id: number, option: string) => {
    return await primaryInstance.post(
      `settings/columns/options/${column_id}/`,
      { option: [option] },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getStatus: async (token: string) => {
    return await primaryInstance.get(`settings/status/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postStatus: async (
    data: { statuses: any[]; default: string | undefined },
    token: string
  ) => {
    return await primaryInstance.post(`settings/status/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteStatus: async (token: string, statusId: number) => {
    return await primaryInstance.delete(`settings/status/${statusId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getSMTP: async (token: string) => {
    return await primaryInstance.get(`settings/SMTP/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postSMTP: async (data: any, token: string) => {
    return await primaryInstance.post(`settings/SMTP/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  postPayment: async (token: string, message: string) => {
    return await primaryInstance.post(
      `settings/payment_system/`,
      { message },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getSms: async (token: string) => {
    return await primaryInstance.get("settings/sms_service", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  postSms: async (token: string, data: { [key: string]: any }) => {
    return await primaryInstance.post(`settings/sms_service/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editSms: async (
    token: string,
    serviceId: number,
    data: { [key: string]: any }
  ) => {
    return await primaryInstance.post(
      `settings/sms_service/${serviceId}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getEmailServices: async (token: string) => {
    return await primaryInstance.get("settings/email_service", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editEmailService: async (
    token: string,
    serviceId: number,
    data: { [key: string]: any }
  ) => {
    return await primaryInstance.post(
      `settings/email_service/${serviceId}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postEmailService: async (token: string, data: { [key: string]: any }) => {
    return await primaryInstance.post(`settings/email_service/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  putEmail: async (token: string, message: string) => {
    return await primaryInstance.put(
      `settings/email_service/`,
      { message },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  postPhone: async (token: string, message: string) => {
    return await primaryInstance.post(
      `settings/ip_phone_service/`,
      { message },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getInstitution: async (token: string) => {
    return await primaryInstance.get(`settings/institution/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createInstitution: async (
    inst_name: string,
    inst_code: number,
    token: string
  ) => {
    return await primaryInstance.post(
      `settings/institution/`,
      { inst_name, inst_code },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editInstitution: async (
    token: string,
    inst_id: number,
    params: IEditInstitution
  ) => {
    return await primaryInstance.patch(
      `settings/institution/${inst_id}/`,
      params,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  bindInstitutionKeyword: async (
    token: string,
    inst_id: number,
    keyword_id: number
  ) => {
    return await primaryInstance.post(
      `settings/institution/${inst_id}/keywords/`, {keywords: [keyword_id]},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteInstitutionKeyword: async (
    token: string,
    inst_id: number,
    id: number
  ) => {
    return await primaryInstance.delete(
      `settings/institution/${inst_id}/keywords/`,
      {
        data: {keywords: [id]},
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteInstitution: async (
    token: string,
    inst_id: number,
    is_kw_delete: boolean
  ) => {
    return await primaryInstance.delete(`settings/institution/${inst_id}/`, {
      data: { is_kw_delete },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createField: async (data: ICreateField, token: string) => {
    return await primaryInstance.post("settings/columns/create/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getDefaultPages: async (token: string) => {
    return await primaryInstance.get(`settings/facebook_pages/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editDefaultPages: async (token: string, pages: IDefaultPage[]) => {
    return await primaryInstance.post("settings/facebook_pages/", pages, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  connectApp: async (token: string) => {
    return await primaryInstance.post(
      "settings/connect_voterapp/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  disconnectApp: async (token: string) => {
    return await primaryInstance.post(
      "settings/disconnect_voterapp/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getQuestionaries: async (token: string, is_voter: boolean) => {
    return await primaryInstance.get("settings/questionaries/", {
      params: {
        is_voter,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createQuestionarie: async (
    token: string,
    questionarie_name: string,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      "settings/questionaries/",
      { questionarie_name, is_voter },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  cloneQuestionarie: async (
    token: string,
    id: number,
  ) => {
    return await primaryInstance.post(
      `settings/questionaries/${id}/clone/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteQuestionarie: async (
    token: string,
    questionarieId: number,
    is_voter: boolean
  ) => {
    return await primaryInstance.delete(
      `settings/questionaries/${questionarieId}/`,
      {
        data: { is_voter },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editQuestionarieName: async (
    token: string,
    questionarieId: number,
    questionarie_name: string,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      `settings/questionaries/${questionarieId}/`,
      { questionarie_name, is_voter },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createQuestionarieQuestion: async (
    token: string,
    questionarie_id: number,
    query: string,
    field_to_update: string,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      "settings/questionaries/question/",
      {
        questionarie_id,
        query,
        field_to_update: field_to_update ? field_to_update : null,
        is_voter,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editQuestionarieQuestion: async (
    token: string,
    questionarie_id: number,
    question_id: number,
    query: string,
    field_to_update: string,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      `settings/questionaries/question/${question_id}/`,
      {
        questionarie_id,
        query,
        field_to_update: field_to_update ? field_to_update : null,
        is_voter,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editQuestionarieQuestionOrder: async (
    token: string,
    questionarie_id: number,
    question_id: number,
    query_pos: number,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      `settings/questionaries/question/${question_id}/`,
      {
        questionarie_id,
        query_pos,
        is_voter,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteQuestionarieQuestion: async (
    token: string,
    question_id: number,
    is_voter: boolean
  ) => {
    return await primaryInstance.delete(
      `settings/questionaries/question/${question_id}/`,
      {
        data: { is_voter },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createQuestionarieAnswer: async (
    token: string,
    question_id: number,
    answer_words: string,
    value_to_set: any,
    related_question_id: number | null,
    is_update_referal: boolean,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      "settings/questionaries/answer/",
      {
        question_id,
        answer_words,
        value_to_set: value_to_set ? value_to_set : null,
        related_question_id,
        is_update_referal,
        is_voter,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editQuestionarieAnswer: async (
    token: string,
    question_id: number,
    answer_id: number,
    answer_words: string,
    value_to_set: string,
    related_question_id: number | null,
    is_update_referal: boolean,
    is_voter: boolean
  ) => {
    return await primaryInstance.post(
      `settings/questionaries/answer/${answer_id}/`,
      {
        question_id,
        answer_words,
        value_to_set: value_to_set ? value_to_set : null,
        related_question_id,
        is_update_referal,
        is_voter
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteQuestionarieAnswer: async (
    token: string,
    answer_id: number,
    is_voter: boolean
  ) => {
    return await primaryInstance.delete(
      `settings/questionaries/answer/${answer_id}/`,
      {
        data: { is_voter },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editUsersCount: async (
    token: string,
    questionarie_id: number,
    audience_id: number,
    count: number
  ) => {
    return await primaryInstance.post(
      "settings/call_center/create_users/",
      { questionarie_id, audience_id, count },
      {
        responseType: "blob",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getDistributionUsers: async (token: string) => {
    return await primaryInstance.get("settings/call_center/users/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getAudiences: async (token: string) => {
    return await primaryInstance.get("settings/call_center/audience/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getAudienceCount: async (token: string, filters: any) => {
    return await primaryInstance.post("settings/call_center/audience/", filters, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createAudience: async (token: string, data: any) => {
    return await primaryInstance.put("settings/call_center/audience/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  updateAudience: async (token: string, audience_id: number, data: any) => {
    return await primaryInstance.put(
      `settings/call_center/audience/${audience_id}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteAudience: async (token: string, audienceId: number) => {
    return await primaryInstance.delete(
      `settings/call_center/audience/${audienceId}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  setMapping: async (token: string, data: any) => {
    return await primaryInstance.post("settings/call_center/mapping/", data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  connectVolunteers: async (token: string) => {
    return await primaryInstance.post(
      "settings/connect_volunteer_modul/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  disconnectVolunteers: async (token: string) => {
    return await primaryInstance.post(
      "settings/disconnect_volunteer_modul/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  connectElectionDay: async (token: string) => {
    return await primaryInstance.post(
      "settings/connect_electionday_module/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  disconnectElectionDay: async (token: string) => {
    return await primaryInstance.post(
      "settings/disconnect_electionday_module/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  connectGoogleAds: async (token: string) => {
    return await primaryInstance.post(
      "settings/connect_google/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  disconnectGoogleAds: async (token: string) => {
    return await primaryInstance.post(
      "settings/disconnect_google/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  facebookLogin: async (token: string) => {
    return await primaryInstance.get("settings/facebook_connect/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  facebookLogout: async (token: string) => {
    return await primaryInstance.post(
      "settings/facebook_logout/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  facebookDisconnect: async (token: string) => {
    return await primaryInstance.post(
      "settings/facebook_disconnect/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createSignature: async (token: string, lang: string, image: File) => {
    const data = new FormData();
    data.append("lang", lang);
    data.append("file", image);
    return await secondaryInstance.post(`settings/email_signature/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteSignature: async (token: string, id: number) => {
    return await secondaryInstance.delete(`settings/email_signature/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getVoterUsers: async (token: string) => {
    return await primaryInstance.get("settings/voter_users/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  injectVoterUsers: async (
    token: string,
    voter_users: number[],
    filters: any
  ) => {
    return await primaryInstance.post(
      "settings/distribute_voters_phones/",
      {
        ...filters,
        voter_users,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  clearVoterUsers: async (token: string, voter_users: number[]) => {
    return await primaryInstance.post(
      "settings/clear_voters_contacts/",
      {
        voter_users,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getInjectedCount: async (token: string, filters: any) => {
    return await primaryInstance.get("settings/distribute_voters_phones/", {
      params: filters,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  changeVoterPassword: async (
    token: string,
    userId: number,
    password: string
  ) => {
    return await primaryInstance.post(
      `settings/voter_users/${userId}/change_password/`,
      { password },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getVoterContactMode: async (token: string) => {
    return await primaryInstance.get(`settings/voter_contact_mode/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  switchVoterContactMode: async (token: string, contacts_mode: string, skip_upload_contacts: boolean) => {
    return await primaryInstance.post(
      `settings/voter_contact_mode/`,
      { contacts_mode, skip_upload_contacts },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  switchVoterMode: async (
    token: string,
    params: ISwithAppModeParams
  ) => {
    return await primaryInstance.post(
      `settings/voter_switch_mode/`,
      params,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getVoterNotifyStatus: async (token: string) => {
    return await primaryInstance.get(`settings/voter_notify_users/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  setVoterNotifyStatus: async (token: string, notify_users: boolean) => {
    return await primaryInstance.post(
      `settings/voter_notify_users/`,
      { notify_users },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  setQuestionnaireUsers: async (token: string, questionnaireId: number, voter_users: number[]) => {
    return await primaryInstance.post(
      `settings/voter_questionarie_map/${questionnaireId}/`,
      { voter_users },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  injectAudienceToUsers: async (token: string, audience_id: number, voter_users: number[], resync_contacts: boolean) => {
    return await primaryInstance.post(
      `settings/voter_inject_audience/`,
      { voter_users, audience_id, resync_contacts },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  resyncContacts: async (token: string, voter_users: number[]) => {
    return await primaryInstance.post(
      `settings/voter_resync_contacts/`,
      { voter_users },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createVoterUsers: async (token: string, candidates: { id: string, mobile_phone: string }[]) => {
    return await primaryInstance.post(
      `settings/voter_users/`,
      { candidates },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getCreateUsersTemplate: async (token: string) => {
    return await primaryInstance.get(`settings/voter_users/upload/template/`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getAssignmentsExcel: async (token: string) => {
    return await secondaryInstance.get("settings/voter_users/download/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getPostTypes: async (token: string) => {
    return await primaryInstance.get("settings/post_types/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  savePostTypes: async (token: string, post_types: string[]) => {
    return await primaryInstance.post("settings/post_types/", { post_types }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addInstitutionKeyword: async (token: string, institution_id: number, keyword: string, parsing_style?:string) => {
    return await primaryInstance.post(
      `settings/institution/${institution_id}/add_keyword/`,
      { keyword, parsing_style},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteVoterUsers: async (token: string, id: number[], permanently: boolean) => {
    return await primaryInstance.delete(`settings/voter_users/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: { id, permanently }
    });
  },
  getActivePrompt:async (token:string)=>{
    return await primaryInstance.get("/settings/monitoring/sentiment_prompt/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  setActivePrompt:async(token:string, negative:string, positive:string)=>{
    return await primaryInstance.post("/settings/monitoring/sentiment_prompt/", {negative, positive}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  generateSentimentPrompt:async(token:string, keywords:number[])=>{
    return await primaryInstance.post("/settings/monitoring/generate_sentiment_prompt/", {keywords},{
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }
};
