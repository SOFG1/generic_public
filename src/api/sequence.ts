import {botfarmInstance} from "./index";


interface IPostSequenceText{
    text: string,
    type: "post",
    campaign:string[],
    audience:string[],
}

interface IPostSequenceMedia{
    file:File,
    type:"image" | "video",
    campaign:string[],
    audience:string[],
}


export const Sequence = {
    postSequenceText:async(data:IPostSequenceText)=>{
        return await botfarmInstance.post("/sequence/add/texts/", data)
    },
    postSequenceMedia:async( body:IPostSequenceMedia)=>{
        const bodyFormData = new FormData();
        bodyFormData.set("file", body.file);
        bodyFormData.set("type", body.type)
        for(const item of body.campaign){
            bodyFormData.append("campaign", item)
        }
        for(const item of body.audience){
            bodyFormData.append("audience", item)
        }
        return await botfarmInstance.post("/sequence/add/medias/", bodyFormData);
    },
    getPostsCampaigns:async()=>{
        return await botfarmInstance.get("/campaigns/")
    },
    getAudience:async()=>{
        return await botfarmInstance.get("/audiences/")
    }
}
