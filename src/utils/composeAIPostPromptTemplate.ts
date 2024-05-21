import { IAIPostParams } from "../api/sentimentor";



export const composeAIPostPromptTemplate = (params: IAIPostParams) => {

    let info = params.additional_info
    if(params.attitude) {
        info+=`\n Attitude: ${params.attitude}`
    }
    let prompt = `Please, write me text for ${params.item} for ${params.social_media} in ${params.language} on topic of ${params.topic}. ${info}. Make it up to ${params.count} ${params.length}.`;

    console.log(prompt)
    return prompt
}