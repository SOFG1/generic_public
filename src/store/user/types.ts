import { IStatus } from "../settings";

enum Role {
  caller = "caller",
  general = "general",
}

export interface IPageAccess {
  access: boolean;
  actions: { [action: string]: boolean };
  viewName?: string;
}

interface IRole {
  id: number;
  name: Role;
}

export const emptyPageAccess = {
  access: false,
  actions: {},
};

export interface ICountry {
  id: number;
  code: string;
  lng: number;
  lat: number;
  name: string;
}

export interface IEmailSignature {
  id: number;
  lang: string;
  url: string;
}

export interface IUserInfo {
  group: {
    status_colors: { id: number; status: string; color: string }[];
    id: number;
    limit_rows: number;
    sms_service: boolean;
    email_service: boolean;
    ip_phone_service: boolean;
    payment: boolean;
    facebook: string[];
    country: ICountry | null;
    voter_group_id: null | number;
    google_name: string | null;
  };
  permissions: { [page: string]: IPageAccess };
  email_signatures: IEmailSignature[];
  date_joined: string;
  email: string;
  full_name?: string;
  id: number;
  uid: string;
  is_admin: boolean;
  login: string;
  segments?: {inst_code: number, inst_name: string}[]
  pic: string;
  is_active: boolean;
  signature: string | null;
  role: IRole | null;
  group_connect: number[] | null
}
export const initialUserInfo: IUserInfo = {
  group: {
    status_colors: [],
    id: 0,
    limit_rows: 20,
    sms_service: false,
    email_service: false,
    ip_phone_service: false,
    payment: false,
    facebook: [],
    google_name: null,
    country: null,
    voter_group_id: null,
  },
  permissions: {
    Raw_Data: emptyPageAccess,
    SM_stats: emptyPageAccess,
    Settings: emptyPageAccess,
    History: emptyPageAccess,
    Users: emptyPageAccess,
  },
  email_signatures: [],
  date_joined: "",
  email: "",
  full_name: "",
  id: 0,
  uid: "",
  is_admin: false,
  is_active: true,
  signature: null,
  login: "",
  pic: "",
  role: null,
  group_connect: null
};

export type IStatusColors = IStatus[];

export interface IUserState {
  isLogin: boolean;
  token: string | null;
  errorMessage: string | null;
  step: number;
  userInfo: IUserInfo | null;
  statusCoors: IStatusColors;
  countries: { name: string; id: number }[];
}

export interface IRegistrationData {
  login: string;
  full_name: string;
  uid: string;
  password: string;
  password_confirmation: string;
  pic?: File;
  email: string;
}

export interface ILoginData {
  username: string;
  password: string;
}
