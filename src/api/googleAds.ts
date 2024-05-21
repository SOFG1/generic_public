import { primaryInstance } from "."

export const GoogleAds = {
    getCustomers: async (token: string) => {
        return await primaryInstance.get('google/ads/clients/', {
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getCampaigns: async (token: string, customer_id: number) => {
        return await primaryInstance.get('google/ads/campaign/', {
            headers: {
                "Authorization": `Token ${token}`
            },
            params: {
                customer_id
            }
        })
    },
    createCampaign: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/campaign/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    createCampaignWithAudience: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/audience_campaign/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGenders: async (token: string, audience_id: number) => {
        return await primaryInstance.get('google/ads/audience_campaign/',{
            params: {audience_id},
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    setCriteria: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/set_targeting_criteria/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    setCampaignCriteria: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/campaign/set_targeting_criteria/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    setGroupCriteria: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/ad_group/set_targeting_criteria/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    createGroup: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/ad_group/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    createAd: async (token: string, data: {[key: string]: any}) => {
        return await primaryInstance.post('google/ads/ad/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    getGroups: async (token: string, campaign_id: number) => {
        return await primaryInstance.get('google/ads/ad_group/', {
            headers: {
                "Authorization": `Token ${token}`
            },
            params: {
                campaign_id
            }
        })
    },
    uploadImage: async (token: string, customer_id: string, image: File) => {
        const data = new FormData()
        data.append('customer_id', customer_id)
        data.append('image', image)
        return await primaryInstance.post('google/ads/upload_image/', data,{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
    reloadData: async (token: string) => {
        return await primaryInstance.post('google/ads/reload_data/', {},{
            headers: {
                "Authorization": `Token ${token}`
            },
        })
    },
}