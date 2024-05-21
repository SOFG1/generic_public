// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import styled from "styled-components";
// import { IAIPost, useSentimentorActions } from "../../store/sentimentor";
// import { Loader } from "../../UI/Spinners";
// import { desktopBp } from "../../styles/variables";
// import { useUserState } from "../../store/user";
// import { Sentimentor } from "../../api/sentimentor";
// import { handle } from "../../api";
// import { useAppActions } from "../../store/app";
// import { useTranslation } from "react-i18next";
// import { Input } from "../../UI/Input";
// import { Button } from "../../UI/Button";
// import { activityList } from "../../config/userActivityList";
//
// const StyledLoader = styled(Loader)`
//   width: 18.23vw;
//   height: 18.23vw;
//   margin: 5px auto;
//   @media screen and (max-width: ${desktopBp}) {
//     width: 229px;
//     height: 229px;
//   }
// `;
//
// const StyledBox = styled.div`
//   display: flex;
//   width: 31.25vw;
//   margin: 0 auto;
//   justify-content: space-between;
//   @media screen and (max-width: ${desktopBp}) {
//     width: 392px;
//   }
// `;
//
// const StyledButtonsBox = styled.div`
//   display: flex;
//   gap: 10px;
//   margin: 5px 0;
// `;
//
// const StyledButton = styled.button`
//   height: 30px;
//   width: 30px;
//   background-color: transparent;
//   color: #000;
//   border-color: #000;
//   cursor: pointer;
// `;
//
//
// const StyledTextarea = styled(Input)`
//   width: 700px;
//   max-width: 100%;
//   margin-bottom: 10px;
//   textarea {
//     resize: vertical;
//   }
// `;
//
// const StyledBtn = styled(Button)`
//   margin: 0 auto;
// `;
//
// interface IProps {
//   post: IAIPost;
//   isFetching: boolean;
//   setIsFetching: (v: boolean) => void;
// }
//
// const EditPictureComponent = React.memo(
//   ({ post, isFetching, setIsFetching }: IProps) => {
//     const { t } = useTranslation();
//     const { token } = useUserState();
//     const [currentSlide, setCurrentSlide] = useState<number | null>(null)
//     const [editPrompt, setEditPrompt] = useState<string>("");
//     const { onShowAlert } = useAppActions();
//     const { onUpdateAIPost } = useSentimentorActions();
//
//
//     const imagesSorted = useMemo(() => {
//       return [...post.image_requests].sort((c, p) => p.id - c.id)
//     }, [post.image_requests])
//
//     const selectedImage = useMemo(() => {
//       if(currentSlide !== null && imagesSorted.length) {
//         return imagesSorted[currentSlide]
//       }
//     }, [imagesSorted, currentSlide])
//
//
//
//     const handleEditByButton = useCallback(
//       async (button: string) => {
//         setIsFetching(true);
//         if (token && selectedImage) {
//           const [dataRes, dataErr] = await handle(
//             Sentimentor.editAIPictureByButton(token, selectedImage.id, button)
//           );
//           if (dataRes) {
//             onShowAlert(
//               true,
//               "Your request received, wait untill your images has been changed"
//             );
//             console.log(dataRes);
//           }
//           if (dataErr) {
//             console.log(dataErr);
//           }
//         }
//       },
//       [token, selectedImage]
//     );
//
//     const handleEditPicture = useCallback(async () => {
//       setIsFetching(true);
//       if (token && selectedImage) {
//         const [dataRes, dataErr] = await handle(
//           Sentimentor.editAIPostPicture(token, selectedImage.id, editPrompt)
//         );
//         if (dataRes) {
//           onShowAlert(
//             true,
//             "Your request received, wait untill your images has been changed"
//           );
//           console.log(dataRes);
//         }
//         if (dataErr) {
//           console.log(dataErr);
//         }
//       }
//     }, [token, editPrompt, selectedImage]);
//
//     useEffect(() => {
//       if(post.image_requests.length !== 0) {
//           setCurrentSlide(0)
//       }
//   }, [post.image_requests])
//
//     useEffect(() => {
//       let interval: any
//       if(isFetching) {
//         interval = setInterval(() => {
//           onUpdateAIPost(post.id);
//         }, 5000);
//       }
//       return () => clearInterval(interval);
//     }, [isFetching, post.id]);
//
//     useEffect(() => {
//       if (imagesSorted[0] && imagesSorted[0].image_url) {
//         setIsFetching(false);
//         setCurrentSlide(0)
//       }
//     }, [imagesSorted[0]]);
//
//     return (
//       <>
//         {selectedImage && !isFetching && (
//           <>
//             <StyledBox>
//               <StyledButtonsBox>
//                 {selectedImage?.buttons?.includes("V1") && (
//                   <StyledButton onClick={() => handleEditByButton("V1")} data-action={activityList["rankings-AIpicture-V1"]}>
//                     V1
//                   </StyledButton>
//                 )}
//                 {selectedImage?.buttons?.includes("U1") && (
//                   <StyledButton onClick={() => handleEditByButton("U1")} data-action={activityList["rankings-AIpicture-U1"]}>
//                     U1
//                   </StyledButton>
//                 )}
//               </StyledButtonsBox>
//               <StyledButtonsBox>
//                 {selectedImage?.buttons?.includes("V2") && (
//                   <StyledButton onClick={() => handleEditByButton("V2")} data-action={activityList["rankings-AIpicture-V2"]}>
//                     V2
//                   </StyledButton>
//                 )}
//                 {selectedImage?.buttons?.includes("U2") && (
//                   <StyledButton onClick={() => handleEditByButton("U2")} data-action={activityList["rankings-AIpicture-U2"]}>
//                     U2
//                   </StyledButton>
//                 )}
//               </StyledButtonsBox>
//             </StyledBox>
//             <StyledBox>
//               <StyledButtonsBox>
//                 {selectedImage.buttons?.includes("V3") && (
//                   <StyledButton onClick={() => handleEditByButton("V3")} data-action={activityList["rankings-AIpicture-V3"]}>
//                     V3
//                   </StyledButton>
//                 )}
//                 {selectedImage.buttons?.includes("U3") && (
//                   <StyledButton onClick={() => handleEditByButton("U3")} data-action={activityList["rankings-AIpicture-U3"]}>
//                     U3
//                   </StyledButton>
//                 )}
//               </StyledButtonsBox>
//               <StyledButtonsBox>
//                 {selectedImage.buttons?.includes("V4") && (
//                   <StyledButton onClick={() => handleEditByButton("V4")} data-action={activityList["rankings-AIpicture-V4"]}>
//                     V4
//                   </StyledButton>
//                 )}
//                 {selectedImage.buttons?.includes("U4") && (
//                   <StyledButton onClick={() => handleEditByButton("U4")} data-action={activityList["rankings-AIpicture-U4"]}>
//                     U4
//                   </StyledButton>
//                 )}
//               </StyledButtonsBox>
//             </StyledBox>
//             <StyledTextarea
//               label={t("ranking_ai-picture_prompt")}
//               type="text"
//               name="edit_prompt"
//               isTextarea={true}
//               value={editPrompt}
//               onChange={setEditPrompt}
//             />
//             <StyledBtn
//               disabled={isFetching || !selectedImage}
//               onClick={handleEditPicture}
//             >
//               {t("ranking_ai-edit_btn")}
//             </StyledBtn>
//           </>
//         )}
//       </>
//     );
//   }
// );
//
// export default EditPictureComponent;
