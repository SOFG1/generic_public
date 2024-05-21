import {botfarmInstance, primaryInstance, secondaryInstance} from ".";
import {
  IChangePublicationType, IGenerateImageData,
  ISentimentorFilters,
  ITrendingPost,
  PublicationSourceType,
} from "../store/sentimentor/types";
import { getDateFromString } from "../utils";

export interface IAIPostParams {
  item: string;
  social_media: string;
  topic: string;
  language: string;
  additional_info: string;
  count: string; //as number
  length: "words" | "characters";
  attitude: string | null
}


export interface IManualPostParams {
  link: string
  keyword_id?: number[]
  post_type?: string
  defamatory?: boolean
  lang: string | null
  score: number
  network: string
  date: string
}

export interface IManualUserParams {
  name: string
  link: string
  network: string
}


export interface IAIPictureTextParams {
  text: string
  text_color: string
  outline_color: string
  text_size: number
  outline_size: number
  text_position: [number, number]
  alignment: string
}



export interface IAIVideoParams {
  topic: string
  length: number
  chain: number
  language_code: string
}

export interface IAddTextOnImage{
  file_id: number
  text: string
  text_color: string
  outline_color:string
  text_size: number
  outline_size: number
  text_position:number[]
  alignment:string
}

export type AIPictureAspectRatioType = "1:1" | "16:9" | "9:16"

export const Sentimentor = {
  getAnalysis: async (token: string, filters: ISentimentorFilters) => {
    return await primaryInstance.get(`rankings/analysis_v2/`, {
      params: filters,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getKeywords: async (token: string) => {
    return await primaryInstance.get(`rankings/keywords_2_0/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addKeyword: async (token: string, keyword: string, parsing_style:string) => {
    return await primaryInstance.post(
      `rankings/keywords_2_0/${keyword}/`,
      {parsing_style},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editKeywordParsingStyle: async(token:string, keyword:number[], parsing_style:string)=>{
    return await primaryInstance.post(
        "/rankings/keywords_2_0/parsing_style/",
        {parsing_style, keyword},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
    )
  },
  deleteKeyword: async (token: string, id: number) => {
    return await primaryInstance.delete(`rankings/keywords_2_0/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getTags: async (token: string, filters: ISentimentorFilters) => {
    return await primaryInstance.get(`rankings/keyword_cloud_v2/`, {
      params: filters,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getFilters: async (token: string) => {
    return await primaryInstance.get(`rankings/filter_data/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteTag: async (token: string, keyword: string) => {
    return await primaryInstance.delete(`rankings/keyword_cloud_v2/${keyword}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getPosts: async (token: string, filters: ISentimentorFilters, offset: number, sentiment?: "positive" | "negative") => {
    return await primaryInstance.get(`rankings/posts_v2/`, {
      params: { ...filters, sentiment, offset },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deletePost: async (token: string, table: string, id: string) => {
    return await primaryInstance.delete(`rankings/posts_v2/${id}/`, {
      data: { table },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deletePostAuthor: async (token: string, table: string, id: string) => {
    return await primaryInstance.delete(
      `rankings/posts_v2/decline_author/${id}/`,
      {
        data: { table },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  declineKeyword: async (
    token: string,
    post_id: string,
    keyword_id: number
  ) => {
    return await primaryInstance.post(
      `rankings/posts_v2/decline_kw/`,
      { post_id, keyword_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editPostScore: async (
    token: string,
    table: string,
    post_id: string,
    new_score: string //as number
  ) => {
    return await primaryInstance.post(
      `rankings/posts_v2/edit_score/`,
      { post_id, table, new_score },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deletePostKeyword: async (token: string, keyword_id: number) => {
    return await primaryInstance.post(
      `rankings/posts_v2/delete_kw_request/`,
      { keyword_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getPublicationsFilters: async (token: string) => {
    return await primaryInstance.get(`rankings/publication_filters/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getPublications: async (token: string, source: PublicationSourceType, filters: ISentimentorFilters) => {
    return await primaryInstance.get(`rankings/generic/${source}/`, {
      params: filters,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getClientsEmails: async (token: string, option: string) => {
    return await primaryInstance.get("rankings/client_emails/", {
      params: {
        option,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  //AI
  getAIPostsList: async (token: string) => {
    return await primaryInstance.get(`rankings/ai_post/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createAIPost: async (token: string) => {
    return await primaryInstance.post(
      `rankings/ai_post/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  deleteAIPost: async (token: string, id: number) => {
    return await primaryInstance.delete(
      `rankings/ai_post/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  generateAIPostText: async (token: string, post_id: number, prompt: string) => {
    return await primaryInstance.post(
      `rankings/ai_post_text/`,
      { prompt, post_id },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getAIPost: async (token: string, id: number) => {
    return await primaryInstance.get(`rankings/ai_post/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editAIPostText: async (token: string, id: number, text: string) => {
    return await primaryInstance.post(
      `rankings/ai_post/edit_text/${id}/`,
      { text },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editAIPostPicture: async (token: string, imageId: number, prompt: string) => {
    return await primaryInstance.post(
      `rankings/ai_post/edit_image/${imageId}/`,
      { prompt },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  addTextAIPicture: async (
    token: string,
    imageId: number,
    params: IAIPictureTextParams
  ) => {
    return await secondaryInstance.put(
      `rankings/ai_post/images/${imageId}/`,
      params,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  editAIPictureByButton: async (
    token: string,
    imageId: number,
    button: string
  ) => {
    return await primaryInstance.post(
      `rankings/ai_post/image_button/${imageId}/`,
      { button },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getAiModels:async(token:string)=>{
    return await primaryInstance.get("/rankings/sd/models/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  generateAIPicturePrompt: async (token: string, postId: number) => {
    return await primaryInstance.post(
        `rankings/ai_post_generate_image_prompt/${postId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
    );
  },
  createAIImageRequest:async(token:string, postId:number, src_image?:File)=>{
    const formData = new FormData();
    formData.set("ai_post_id", postId.toString());
    if(src_image){
      formData.set("src_image", src_image);
    }
    return await primaryInstance.post("rankings/ai_post/image_reqeust/", formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
    )
  },
  generateImage:async(token:string, id:number, data:IGenerateImageData)=>{
    return await primaryInstance.post(`rankings/sd/generate_image/${id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  getGeneratedImage:async(token:string, id:number)=>{
    return await primaryInstance.get(`rankings/ai_post/image_reqeust/?image_request_id=${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  addTextOnImage:async(token:string, id:number, data:IAddTextOnImage)=>{
    return await primaryInstance.post(`rankings/ai_post/image_reqeust/${id}/add_text/`,data,{
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  },
  generateAIPicture: async (token: string, postId: number, prompt: string, initialImage: File | null, aspectRatio: AIPictureAspectRatioType) => {
    const data = new FormData();
    if (prompt) data.append("prompt", prompt)
    if (initialImage) data.append("src_image", prompt)
    data.append("ar", aspectRatio)
    console.log(aspectRatio)
    return await primaryInstance.post(
      `rankings/ai_post_image/${postId}/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  getKeywordsExcel: async (token: string) => {
    return await primaryInstance.get(`rankings/keywords_upload/`, {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  uploadKeywordsExcel: async (token: string, file: File) => {
    const formData = new FormData()
    formData.append("xlsx", file)
    return await primaryInstance.post(`rankings/keywords_upload/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteAIPicture: async (token: string, id: number) => {
    return await primaryInstance.delete(
      `rankings/ai_post/image_reqeust/`,
      {
        data:{
          image_request_id:id,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },

  // ./AI
  getPostScreenShot: async (token: string, table: string, id: string) => {
    return await primaryInstance.get("rankings/get_screenshot/", {
      responseType: "blob",
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        table,
        id,
      },
    });
  },
  addPostGoogleSheets: async (token: string, id: string) => {
    return await primaryInstance.post(`rankings/posts_v2/${id}/to_google_sheet/`, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getPdfReportData: async (token: string, filters: ISentimentorFilters) => {
    return await secondaryInstance.get(`rankings/report_data/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filters,
    });
  },
  getDefamatoryReport: async (token: string, filters: ISentimentorFilters) => {
    return await secondaryInstance.get(`rankings/defamatory_report/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: filters,
    });
  },
  sendPostProccess: async (token: string, postId: string, table: string) => {
    return await primaryInstance.post(
      `rankings/post/${postId}/process/`,
      { table },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  downloadGoogleNewsScreenshot: async (token: string, postId: string) => {
    return await primaryInstance.get(
      `rankings/generic/google_news/${postId}/screenshot/`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  downloadAiImage:async(imageUrl:string)=>{
    return await primaryInstance.get(imageUrl, {
      responseType:"blob"
    })
  },
  deleteGoogleNewsPublication: async (token: string, postId: string) => {
    return await primaryInstance.delete(
      `rankings/generic/google_news/${postId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  sendPublicationProccess: async (token: string, node: string, id: number) => {
    return await primaryInstance.post(
      `rankings/generic/${node}/${id}/process/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  collectPostData: async (token: string, postId: string) => {
    return await primaryInstance.post(
      `rankings/posts_v2/${postId}/collect_data/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  createTopicKeyword: async (
    token: string,
    postId: string,
    keyword: string
  ) => {
    return await primaryInstance.post(
      `rankings/posts_v2/${postId}/topic_keyword/`,
      { keyword },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  },
  addPostManually: async (token: string, params: IManualPostParams) => {
    return await primaryInstance.post("rankings/posts_v2/add/", params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addUserManually: async (token: string, params: IManualUserParams) => {
    return await primaryInstance.post("rankings/tracked_accounts/", params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getManualUsers: async (token: string) => {
    return await primaryInstance.get("rankings/tracked_accounts/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteManualUser: async (token: string, id: number) => {
    return await primaryInstance.delete(`rankings/tracked_accounts/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  changePostDefamatory: async (token: string, table: string, id: string, defamatory: boolean) => {
    return await primaryInstance.post(`rankings/posts_v2/${id}/change_attrs/`, { table, defamatory }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  changePostType: async (token: string, table: string, id: string, post_type: string[]) => {
    return await primaryInstance.post(`rankings/posts_v2/${id}/change_attrs/`, { table, post_type }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addKeywordToPost: async (token: string, id: string, keyword_id: number) => {
    return await primaryInstance.post(`rankings/posts_v2/${id}/add_keyword/`, { keyword_id }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addPostToTargets: async (post: ITrendingPost) => {
    const params: any = {
      link: post.link,
      network: post.network,
      score: post.score,
      likes: post.likes,
      comments: post.comments,
      lang: post.lang,
      defamatory: post.defamatory,
      origin: post.origin,
      topics: post.topics,
      view_count: 0,
      client_id:post.client_id,
      post_text:post.post_text,
      keyword_grouping:post?.institutions?.[0].inst_name,
      monitoring_category:post.post_type,
      date_added_to_db: getDateFromString(post.date).toISOString(),
    }
    return await botfarmInstance.post(`/add/live_targets/`, params);
  },
  getPostParent: async (token: string, parent_id: string) => {
    return await primaryInstance.get(`rankings/posts_v2/detail/${parent_id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  changePublicationType: async (token: string, params: IChangePublicationType) => {
    return await primaryInstance.post(`rankings/generic/${params._sender}/${params.id}/change_attrs/`, { post_type: params.type }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getSummarization: async (token: string) => {
    return await primaryInstance.get(`rankings/post_custom_list/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addSummarization: async (token: string, name: string) => {
    return await primaryInstance.post(`rankings/post_custom_list/`, { name }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteSummarization: async (token: string, id: number) => {
    return await primaryInstance.delete(`rankings/post_custom_list/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addSummarizationPosts: async (token: string, id: number, postIds: string[]) => {
    return await primaryInstance.post(`rankings/post_custom_list/${id}/add_posts/`, { posts: postIds }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  clearSummarization: async (token: string, id: number) => {
    return await primaryInstance.post(`rankings/post_custom_list/${id}/clear/`, { }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  summarize: async (token: string, id: number) => {
    return await primaryInstance.post(`rankings/post_custom_list/${id}/summarize/`, { }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  generateAIVideo: async (token: string, params: IAIVideoParams) => {
    return await primaryInstance.post(`core/video/create_storyboard/`, params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  renderAIVideo: async (token: string, id: number) => {
    return await secondaryInstance.post(`core/video/render/${id}/`, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
