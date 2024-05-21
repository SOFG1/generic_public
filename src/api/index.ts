import axios, { AxiosInstance, AxiosResponse } from "axios";

export const PRIMARY_SERVER_URL = "https://cms.stoi.co";
export const SECONDARY_SERVER_URL = "https://cms-load.stoi.co";
export const BOT_FARM_SEVER_URL = "https://maaher.stoi.co";

const primaryApiUrl = `${PRIMARY_SERVER_URL}/api/`;
const secondaryApiUrl = `${SECONDARY_SERVER_URL}/api/`;

export const BOT_FARM_TOKEN = "042b981e-774f-4339-b0e8-1fc0227b3b78";

const primaryInstance: AxiosInstance = axios.create({
  baseURL: primaryApiUrl,
});

const secondaryInstance: AxiosInstance = axios.create({
  baseURL: secondaryApiUrl,
});

const botfarmInstance:AxiosInstance = axios.create({
    baseURL:BOT_FARM_SEVER_URL,
    headers:{
        "X-Authentication":BOT_FARM_TOKEN,
    }
})

export const handle = (promise: Promise<AxiosResponse<any>>) => {
  return promise
    .then((data) => [data.data, undefined])
    .catch((error) => {
      const errObj = { ...error };
      //Dispatch custom event in order to show alert in UI when error status = 504/
      if (error?.response?.status === 504) {
        //We couldn't call dispatch here so we listen this event in App.tsx and show alert
        const event504 = new Event("504error");
        document.dispatchEvent(event504);
        //Don't return error because other alerts could overwrite 504 alert above
        return Promise.resolve([undefined, undefined]);
      }
      //Dispatch custom event in order to show alert in UI when error status = 504/
      if (error?.response?.status === 400) {
        //We coudn't return 400 error so we call custom event 400
        const event400 = new Event("400error");
        document.dispatchEvent(event400);
        //Don't return error because other alerts could overwrite 504 alert above
        return Promise.resolve([undefined, error?.response?.data || error?.response || errObj,]);
      }
      if (error.detail) errObj.error = error.detail;
      return Promise.resolve([
        undefined,
        error?.response?.data || error?.response || errObj,
      ]);
    });
};

export { primaryInstance, secondaryInstance, secondaryApiUrl, primaryApiUrl, botfarmInstance };
