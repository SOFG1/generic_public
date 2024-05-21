import {primaryInstance, handle, PRIMARY_SERVER_URL} from "./index";

export const SmStats = {
    pages: async (token: string, group_ids?: string) => {
        return await primaryInstance.get(`sm_stats/pages/`, {
            params: { group_ids },
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    smStats: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/sm_stats/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    getOfflineScore: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/offline_score/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    postViews: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/post_views/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    engagementRate: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/engagement_rate/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    postList: async (token: string, filters: any) => {
        const params: any = { days: 90, ...filters }
        return await primaryInstance.get(`sm_stats/post_list/`, {
            params,
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    mapPoints: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/map_points/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    mapLevel: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/map_level/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    postKeywords: async (token: string, keyword: string) => {
        return await primaryInstance.post(`sm_stats/keywords/`, { keyword }, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    deleteKeywords: async (token: string, keyword: string) => {
        return await primaryInstance.delete(`sm_stats/keywords/${keyword}/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    getAddedKeywords: async (token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/sercers_keywords/`, {
            params: filters ? { ...filters } : {},
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    postPreview: async (post_id: string, token: string, filters?: { [key: string]: number | string }) => {
        return await primaryInstance.get(`sm_stats/post_preview/`, {
            params: {
                ...filters,
                post_id
            },
            headers: {
                "Authorization": `Token ${token}`
            }
        })
    },
    putUploadTable: async (data: { file_name: string; slectedSheet: string; columns: { [key: string]: string }; results: string[] }, token: string) => {
        return await primaryInstance.put(`sm_stats/upload_map/`, { ...data }, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
    },
    abordUploadedTable: async (token: string, uploadid: string) => {
        return await primaryInstance.get(`sm_stats/upload_map/?action=abord`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Upload-id": uploadid
            }
        })
    },
    getTemplate:async(token:string)=>{
        return await handle(primaryInstance.get("sm_stats/map_template/", {
            headers:{
                "authorization":`Token ${token}`,
            },
            responseType:"blob"
        }));
    }
}



