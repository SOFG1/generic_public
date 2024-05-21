import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../../styles/variables"
import { INotification, useAppActions } from "../../../store/app"
import { useTranslation } from "react-i18next"
import { activityList } from "../../../config/userActivityList"
import { handle } from "../../../api"
import { User } from "../../../api/user"
import { useUserState } from "../../../store/user"
import { saveAs } from "file-saver";
import { Loader } from "../../../UI/Spinners"
import { getDateFromString, getFormatDateTime } from "../../../utils"
import { NoIcon } from "../../../UI/Svg"
import { Button } from "../../../UI/Button"
import { IPdfReportData, useSentimentorActions } from "../../../store/sentimentor"
import { useNavigate } from "react-router-dom"


const StyledWrapper = styled.div`
    position: relative;
    padding: 25px;
    width: 1000px;
    max-width: 90%;
    border-radius: 0.78vw;
    background-color: #fff;
    box-shadow: 0 4px 10px #a2a2a2;
    margin-bottom: 0.8vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`

const StyledLoader = styled(Loader)`
  height: 0.8vw;
  width: 0.8vw;
  display: inline-block;
  margin-inline-start: 0.52vw;
  border-width: 2px;
  @media screen and (max-width: ${desktopBp}) {
    height: 10px;
    width: 10px;
    margin-inline-start: 7px;
  }
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.08vw;
    gap: 2.60vw;
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 26px;
        gap: 33px;  
  }
`

const StyledText = styled.p`
    margin: 0;
    font-size: 0.94vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 12px;
    }
`

const StyledTarget = styled.p`
    margin: 0;
    :not(:last-child) {
        padding-inline-end: 20px;
        border-inline-end: 1px solid #AAA;
    }
`

const StyledContent = styled(StyledText)`
    margin-bottom: 10px;
`

const StyledTitle = styled(StyledText)`
    font-weight: 700;
`

const StyledConfusion = styled.div`
    flex-grow: 1;
`

const ConfusionRow = styled.div`
    display: flex;
    &:first-child {
        border-bottom: 1px solid #AAA;
    }
`

const StyledRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`


const StyledFile = styled.div`
  color: -webkit-link;
  cursor: pointer;
  word-break: break-all;
  margin-bottom: 0.54vw;
  &:last-child {
    border-bottom: 1px solid #AAAAAA;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;


const DeleteBtn = styled.button`
  position: absolute;
  top: 5px;
  inset-inline-end: 5px;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.65;
  }
`;



const StyledButton = styled(Button)`
    padding: 3px;
    width: fit-content;
`


interface IProps {
    notification: INotification
}


const NotificationComponent = React.memo(({ notification }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState();
    const navigate = useNavigate()
    const { onGetNotifications, onShowAlert, onDeleteNotification } = useAppActions()
    const { onSetPdfReportData } = useSentimentorActions();
    const [loadingFileId, setLoadingFileId] = useState<null | number>(null);


    const [date, time] = useMemo(() => {
        return notification.created_at.split(" ")
    }, [notification.created_at])



    const isPdfReportNotification = useMemo(() => {
        return notification.them === "Annotated report"
    }, [notification.them])


    const handleDownload = useCallback(
        async (fileId: number, fileName: string) => {
            if (token && loadingFileId !== fileId) {
                setLoadingFileId(fileId);
                const [dataRes, dataErr] = await handle(
                    User.downloadNotificationFile(token, fileId)
                );
                setLoadingFileId(null);
                if (dataRes) {
                    saveAs(dataRes, fileName);
                    onGetNotifications();
                }
                if (dataErr) {
                    const { error } = JSON.parse(await dataErr.text());
                    onShowAlert(false, error);
                }
            }
        },
        [token, loadingFileId]
    );

    //Get time difference in milliseconds
    const timeDifference = useMemo(() => {
        const offset = new Date().getTimezoneOffset();
        //return in milliseconds
        return offset * 60 * 1000;
    }, []);

    const dateFormat: number = getDateFromString(
        notification.created_at
    ).getTime();

    //Formatted time in user time zone
    const formattedTime = getFormatDateTime(
        new Date(dateFormat - timeDifference)
    );


    const handleOpenPdfReport = useCallback(() => {
        navigate("/monitoring")
        onSetPdfReportData(notification?.json as IPdfReportData)
    }, [notification.json])

    return <StyledWrapper>
        <DeleteBtn onClick={() => onDeleteNotification(notification.id)} data-action={activityList["notification-delete"]}>
            <NoIcon />
        </DeleteBtn>
        <StyledHeader>
            <StyledTitle>{notification.them}</StyledTitle>
            <StyledText>{t("notification-time")}{formattedTime}</StyledText>
            <StyledText>{t("notification-date")}{date}</StyledText>
        </StyledHeader>
        <StyledContent>{notification.text}</StyledContent>
        {notification?.json && notification?.json?.targets?.length > 0 && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-targets")}</StyledTitle>
                {notification?.json?.targets?.map((t: string) => <StyledTarget>{t}</StyledTarget>)}
            </StyledRow>
        )}
        {notification?.json && notification?.json?.accuracy !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-accuracy")}</StyledTitle>
                <StyledText>{notification.json?.accuracy}</StyledText>
            </StyledRow>
        )}
        {notification?.json && typeof notification?.json?.score === "number" && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-score")}</StyledTitle>
                <StyledText>{notification.json?.score?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.balanced_score_on_test !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-balanced_score_on_test")}</StyledTitle>
                <StyledText>{notification.json?.balanced_score_on_test?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.balanced_score_on_train !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-balanced_score_on_train")}</StyledTitle>
                <StyledText>{notification.json?.balanced_score_on_train?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.test_set_score !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-test_set_score")}</StyledTitle>
                <StyledText>{notification.json?.test_set_score?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.train_set_los !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-train_set_los")}</StyledTitle>
                <StyledText>{notification.json?.train_set_los?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.training_set_score !== null && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-training_set_score")}</StyledTitle>
                <StyledText>{notification.json?.training_set_score?.toFixed(3)}</StyledText>
            </StyledRow>
        )}
        {notification?.json && notification?.json?.confusion && !isPdfReportNotification && !isPdfReportNotification && (
            <StyledRow>
                <StyledTitle>{t("notification-confusion")}</StyledTitle>
                <StyledConfusion>
                    <ConfusionRow>
                        <StyledText>{t("notification-true_positive")}{notification?.json?.confusion["True Positive"]}</StyledText>
                        <StyledText>{t("notification-true_negative")}{notification?.json?.confusion["True Negative"]}</StyledText>
                    </ConfusionRow>
                    <ConfusionRow>
                        <StyledText>{t("notification-false_positive")}{notification?.json?.confusion["False Positive"]}</StyledText>
                        <StyledText>{t("notification-false_negative")}{notification?.json?.confusion["False Negative"]}</StyledText>
                    </ConfusionRow>
                </StyledConfusion>
            </StyledRow>
        )}

        {isPdfReportNotification && <StyledButton onClick={handleOpenPdfReport}>{t("notification-open_report")}</StyledButton>}

        <div>
            {notification?.files?.map((file) => (
                <StyledFile
                    onClick={() => handleDownload(file.id, file.name)}
                    data-action={activityList["notification-file-download"]}
                    key={file.id}
                >
                    {file.name}
                    {loadingFileId === file.id && <StyledLoader />}
                </StyledFile>
            ))}
        </div>
    </StyledWrapper>
})

export default NotificationComponent