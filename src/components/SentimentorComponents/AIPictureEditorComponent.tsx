import React, {useCallback, useEffect, useMemo, useState} from "react"
import {IAIPost, IImageRequest, useSentimentorActions} from "../../store/sentimentor"
import styled from "styled-components"
import {usePermissions, useUserState} from "../../store/user"
import {handle, PRIMARY_SERVER_URL} from "../../api"
import FakeProgressBar from "../common/FakeProgressBar/FakeProgressBar"
import {AIPictureAspectRatioType, IAIPictureTextParams, Sentimentor} from "../../api/sentimentor"
import {useAppActions} from "../../store/app"
import {TrashIcon} from "../../UI/Svg"
import {desktopBp} from "../../styles/variables"

import AIPicturesSliderComponent from "./AIPicturesSliderComponent"
import AIPictureEditComponent from "./AIPictureEditComponent"
import AIUploadedImageComponent from "./AIUploadedImageComponent"
import AIPictureTextComponent from "./AIPictureTextComponent"
import {useTranslation} from "react-i18next"
import {Dropdown} from "../../UI/Dropdown"
import {activityList} from "../../config/userActivityList";
import Upload from "../../UI/Svg/icons/Upload";
import UploadImageToBotfarmComponent from "./UploadImageToBotfarmComponent";
import {AiPictureSettingsComponent, SettingsHint} from "./index";
import {HintComponent} from "../../UI/HintComponent";


const StyledWrapper = styled.div<{isPreview?:boolean}>`
    position: relative;
    background: #FFF;  
    flex-grow: 1;
  ${props => !props.isPreview ? `
      width: calc(100% - 3.65vw * 2);
      @media(max-width:${desktopBp}) {
        width: calc(100% - 46px * 2);
      }
  ` : `
      max-width: 31.46vw;
      @media screen and (max-width: ${desktopBp}) {
        max-width: 395px;
      }
  `}
 
`
const ButtonWrapper = styled.div`
    display: flex;
`



const StyledContainer = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    overflow: hidden;
`

const StyledContent = styled.div`
    display: flex;
    padding: 2.08vw;
    gap: 2.60vw;
    box-sizing: border-box;
    height: 20.20vw;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 12px;
        border: 0;
        border-inline-start: 1px solid #000;
    }
    @media screen and (max-width: ${desktopBp}) {
        padding: 26px;
        gap: 33px;
        height: 250px;
    }
    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
    }
`

const StyledText = styled.p`
    text-align: center;
    font-size: 1.04vw;
    width: 100%;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 13px;
    }
`


const StyledHeader = styled.div`
    position: relative;
    z-index: 2;
    padding: 0 1.72vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.52vw;
    transform: translateY(50%);
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
        padding: 0 22px;
    }
`

const StyledFooter = styled.div`
    position: relative;
    z-index: 1;
    padding: 0 2.45vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.52vw;
    transform: translateY(-50%);
    @media screen and (max-width: ${desktopBp}) {
        gap: 7px;
        padding: 0 31px;
    }
`

const StyledButton = styled.button<{ selected?: boolean }>`
    white-space: nowrap;
    font-size: 0.63vw;
    height: 1.25vw;
    max-width: 6.25vw;
    border-radius: 5.21vw;
    flex-grow: 1;
    flex-shrink: 0;
    min-width: 5.21vw;
    border: 1px solid #000;
    background: #FFF;
    cursor: pointer;
    transition: 150ms;
    :disabled {
        cursor: not-allowed;
    }
    :hover:not(:disabled) {
        background-color: #000;
        color: #fff;
    }
    ${({ selected }) => selected && ` background-color: #000; color: #fff;`};
    @media screen and (max-width: ${desktopBp}) {
        font-size: 8px;
        height: 16px;
        border-radius: 65px;
        min-width: 65px;
        max-width: 78px;
    }
`

const StyledFooterBtn = styled(StyledButton)`
    height: 1.56vw;
    min-width: 0;
    flex-shrink: 0;
    @media screen and (max-width: ${desktopBp}) {
        height: 20px;
    }
`

const StyledProgressBar = styled(FakeProgressBar)`
    width: 80%;
    margin: 2.08vw auto 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
        margin: 26px auto 7px;
    }
`


const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
    padding: 0;
    height: 1.56vw;
    width: 1.56vw;
    border-radius: 50%;
    :disabled {
        cursor: not-allowed;
    }
    svg {
        height: 63%;
        width: 63%;
    }
    cursor: pointer;
    @media screen and (max-width: ${desktopBp}) {
        height: 20px;
        width: 20px;
    }
`


const StyledDropdown = styled(Dropdown)`

`


const aspectRatioOptions = [
    { item: "1:1", value: "1:1" },
    { item: "16:9", value: "16:9" },
    { item: "9:16", value: "9:16" },
]

interface IProps {
    post?: IAIPost,
    isPreview?:boolean,
}

type TabType = "image" | "prompt" | "text" | "uploaded image" | "edit" | "aspect ratio" | "settings"


const initialAddTextParams: IAIPictureTextParams = {
    text: "",
    text_color: "rgb(0,0,0)",
    outline_color: "rgb(255,255,255)",
    alignment: "center",
    text_position: [0.1, 0.5],
    outline_size: 2,
    text_size: 40,
}



export interface IAiImage{
    id:number,
    url:string,
}
export interface IAiSettings{
    model:string,
    width:number,
    height:number,
    steps:number,
    batch_size:number,
    seed:number,
    cfg_scale:number,
    negativePrompt:string
}

const SettingInitialState:IAiSettings = {
    model:"",
    width:0,
    height:0,
    steps:15,
    batch_size:1,
    seed:-1,
    cfg_scale:7,
    negativePrompt:""
}
const extractChildren = (request:IImageRequest[]):IImageRequest => {
    let lastRequest = request[request.length - 1];
    if(lastRequest && lastRequest.childs.length){
        return extractChildren(lastRequest.childs)
    }
    return lastRequest;
}

const AIPictureEditorComponent = React.memo(({ post, isPreview }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const { onUpdateAIPost, addAiPost, setSelectedAi } = useSentimentorActions();
    const permissions = usePermissions("Ranking");
    const [tab, setTab] = useState<TabType>("settings")
    const [currentSlide, setCurrentSlide] = useState<number | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [generatePrompt, setGeneratePrompt] = useState("")
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [settings, setSettings] = useState<IAiSettings>(SettingInitialState)
    const [addTextParams, setAddTextParams] = useState<IAIPictureTextParams>(initialAddTextParams)
    const [aspectRatio, setAspectRatio] = useState<AIPictureAspectRatioType>("1:1")
    const [isUploadImageModal, setIsUploadImageModal] = useState(false);
    const [images, setImages] = useState<IAiImage[]>([]);
    const [requestId, setRequestId] = useState<number | undefined>(undefined);
    const noImages = useMemo(() => {
        return images.length === 0
    }, [images])
    const imagesSorted = useMemo(() => {
        const list: IAiImage[] = []
        images.forEach(image => {
            if (image.url) list.push(image)
        })
        return list
    }, [images])

    const selectedImage = useMemo(() => {
        if (currentSlide !== null && imagesSorted.length) {
            return imagesSorted[currentSlide]
        }
    }, [imagesSorted, currentSlide])

    //Generate Prompt for AI picture

    useEffect(()=>{
        if(!post?.id || !post?.text_request || generatePrompt) return;
        setTimeout(()=>{
            handleGeneratePromptForPicture(post?.id);
        }, 1000)
    },[post?.text_request, post?.id]);

    const handleGeneratePromptForPicture = useCallback(async (id:number)=>{
        if(!token) return
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(Sentimentor.generateAIPicturePrompt(token, id));
        setIsFetching(false);
        if (dataRes)  setGeneratePrompt(dataRes);
        if (dataErr) onShowAlert(false, dataErr.error);
    },[]);

    const handleCreateAIRequest = useCallback(async (prompt:string)=>{
        let postid = post?.id;
        if(!token) return;
        if(!postid){
            const [res, error] = await handle(Sentimentor.createAIPost(token));
            if(error){
                onShowAlert(false, res.error);
                setIsFetching(false);
                return;
            }
            addAiPost(res);
            setSelectedAi(res);
            postid = res.id;
        }
        if(!postid) return;
        setIsFetching(true);
        const [dataRes, dataErr] = await handle(
            Sentimentor.createAIImageRequest(token, postid, uploadedImage || undefined)
        );
        if (dataErr) {
            onShowAlert(
                false,
                dataErr.error
            );
            setIsFetching(false);
            return;
        }
        setRequestId(dataRes.id);
        handleGenerateImage(token,dataRes.id, prompt);

    }, [token, post?.id, settings, generatePrompt, uploadedImage]);

    //Generate Image
    const handleGenerateImage = useCallback(async (token, id:number | undefined, prompt:string)=>{
        if(!id) return;
        const {negativePrompt, model, ...rest} = settings;
        const [res, err] = await handle(
            Sentimentor.generateImage(token, id, {...rest, prompt, src_image_id:images.length ? images[0].id : undefined, negative_prompt:negativePrompt, model_title:model})
        );
        if(err){
            onShowAlert(
                false,
                err.error
            );
            setIsFetching(false);
            return
        }
        handleGetRequestedImage(token, id);
    },[settings, generatePrompt, images])
    //Get Requested Image
    const handleGetRequestedImage = useCallback(async(token, id)=>{
        setIsFetching(true);
        const [resReq, errReq] = await handle(
            Sentimentor.getGeneratedImage(token, id)
        );
        if(resReq && resReq.status === "Success"){
            if(resReq.childs.length){
                const lastReq = extractChildren(resReq.childs);
                if(lastReq.status !== "Success") return;
                lastReq.files.forEach((file:IAiImage) => {file.url = PRIMARY_SERVER_URL + file.url})
                setImages(lastReq.files);
                setIsFetching(false);
                setTab("image")
                return;
            }
            setIsFetching(false);
            resReq.files.forEach((file:IAiImage) => {file.url = PRIMARY_SERVER_URL + file.url})
            setImages(resReq.files);
            setTab("image");
            return;
        }
        if (errReq) {
            onShowAlert(
                false,
                errReq.error
            );
            setIsFetching(false);
            return;
        }
    },[])




    const handleDeletePicture = useCallback(async () => {
        setCurrentSlide(null) //
        if (token  && requestId && post) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(
                Sentimentor.deleteAIPicture(token, requestId)
            );
            setIsFetching(false);
            if (!dataErr) {
                onUpdateAIPost(post.id)
                setRequestId(undefined)
                setImages([]);
                onShowAlert(
                    true,
                    t("ranking_ai-request_success")
                );
            }
            if (dataErr) {
                onShowAlert(
                    false,
                    dataErr.error
                );
            }
        }

    }, [token, post, selectedImage, t])


    const handleAddText = useCallback(async () => {
        if (token && selectedImage && requestId) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.addTextOnImage(token,requestId, {file_id:selectedImage.id, ...addTextParams}))
            if (dataRes) {
                console.log(dataRes)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
                setIsFetching(false)
            }
        }

    }, [token, selectedImage, addTextParams])



    const handleSaveImage = useCallback(async () => {
        if (selectedImage?.url) {
            const image = await fetch(selectedImage?.url)
            const imageBlob = await image.blob()
            const imageURL = URL.createObjectURL(imageBlob);

            const link = document.createElement('a')
            link.href = imageURL
            link.download = generatePrompt.split(" ").slice(0, 3).join("")
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }

    }, [selectedImage?.url]);

    const handleRegenerateImage = (token:string | null, id:number | undefined, prompt:string)=>{
        setSettings({...settings, seed:-1});
        return handleGenerateImage(token, requestId, generatePrompt)
    }


    useEffect(()=>{
        let interval: any
        if (isFetching && requestId) {
            interval = setInterval(() => {
                handleGetRequestedImage(token, requestId);
            }, 5000);
        }
        return () => clearInterval(interval);
    },[isFetching, requestId, token])


    //Set isFetching false if last post image url has been updated
    useEffect(() => {
        if (imagesSorted[0] && imagesSorted[0].url) {
            setIsFetching(false);
            setCurrentSlide(0)
        }
    }, [imagesSorted.length]);


    // //Set selected tab to "uploaded image" if no image generated yet
    useEffect(() => {
        if (noImages) setTab("settings") // Set tab to uploaded image
        if (!noImages){
            setUploadedImage(null)
            setTab("image");
        } // Set uploaded image to null
    }, [noImages])


    // //Set isFetching if last image url is not composed yet
    useEffect(() => {
        if(!post) return;
        const element = extractChildren(post.image_requests)

        if(!element || !element.id) return;
        setRequestId(element.id);
        setImages(element.files.map(el => ({id:el.id, url:PRIMARY_SERVER_URL + el.url})));
    }, [post]);

    //Clear ai image info if post regenerated;
    useEffect(()=>{
        if(!post) return;
        if(!post.image_requests.length && requestId){
            setRequestId(undefined);
            setImages([]);
            setGeneratePrompt("");
        }
    },[post])


    return <StyledWrapper isPreview = {isPreview}>
        <StyledHeader>
            {!noImages && <StyledButton selected={tab === "image"} onClick={() => setTab("image")}>{t("ranking_ai-tab_image")}</StyledButton>}
            {/*<StyledButton selected={tab === "aspect ratio"} onClick={() => setTab("aspect ratio")}>{t("ranking_ai-tab_ar")} {aspectRatio}</StyledButton>*/}
            <ButtonWrapper>
                <StyledButton selected={tab === "settings"} onClick={() => setTab("settings")}>
                    {t("ranking_ai-settings")}
                </StyledButton>
                <HintComponent items={[<SettingsHint/>]} position={"end"}/>
            </ButtonWrapper>
            {/*{!noImages && <StyledButton selected={tab === "edit"} onClick={() => setTab("edit")}>{t("ranking_ai-tab_edit-prompt")}</StyledButton>}*/}
            {noImages && <StyledButton selected={tab === "uploaded image"} onClick={() => setTab("uploaded image")}>{t("ranking_ai-tab_used-img")}</StyledButton>}
        </StyledHeader>
        <StyledContainer>
            <StyledContent>
                {isFetching && <StyledProgressBar />}
                {!isFetching && <>
                    {tab === "image" && <AIPicturesSliderComponent images={imagesSorted} onSlide={(s) => setCurrentSlide(s)}
                        currentSlide={currentSlide} />}
                    {tab === "edit" && !noImages && <AIPictureEditComponent selectedImageId={selectedImage?.id} setIsFetching={setIsFetching} />}
                    {tab === "uploaded image" && noImages && <AIUploadedImageComponent image={uploadedImage} onChange={setUploadedImage} />}
                    {tab === "aspect ratio" && <StyledDropdown label={t("ranking_ai-ar_label")} placeholder={t("ranking_ai-ar_label")} value={aspectRatio} onSelect={setAspectRatio} options={aspectRatioOptions} />}
                    {tab === "text" && !noImages && <AIPictureTextComponent data={addTextParams} onChange={(k, v) => setAddTextParams(p => ({ ...p, [k]: v }))} onSubmit={handleAddText} />}
                    {tab === "settings" && <AiPictureSettingsComponent generatePrompt={generatePrompt} setGeneratePrompt={setGeneratePrompt} data={settings} onChange={(k, v) => setSettings(p => ({ ...p, [k]: v }))}/>}
                </>}
            </StyledContent>
        </StyledContainer>
        <StyledFooter>
            {noImages && <StyledFooterBtn disabled={isFetching} onClick={()=>handleCreateAIRequest(generatePrompt)}>{t("ranking_ai-generate-img")}</StyledFooterBtn>}
            {!noImages && <>
                <StyledFooterBtn disabled={isFetching || !post} onClick={()=>handleRegenerateImage(token, requestId, generatePrompt)}>{t("ranking_ai-regenerate-img")}</StyledFooterBtn>
                <StyledFooterBtn selected={tab === "text"} onClick={() => setTab("text")}>{t("ranking_ai-add-text")}</StyledFooterBtn>
                <StyledFooterBtn onClick={handleSaveImage}>{t("ranking_ai-save-image")}</StyledFooterBtn>
                <IconButton onClick={handleDeletePicture}><TrashIcon /></IconButton>
                {permissions.post_to_googlesheet && <IconButton data-action={activityList["ranking-upload-ai-post"]} disabled={isFetching} onClick={() => setIsUploadImageModal(true)}><Upload fill="#000" /></IconButton>}
            </>}
        </StyledFooter>
        <UploadImageToBotfarmComponent isOpen={!!(isUploadImageModal && imagesSorted[currentSlide || 0]?.url)} onClose={() => setIsUploadImageModal(false)} image={imagesSorted[currentSlide || 0]?.url as string} />
    </StyledWrapper>
})

export default AIPictureEditorComponent
