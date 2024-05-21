import React, { useCallback, useMemo, useState } from "react";
import { Modal } from "../../../UI/Modal";
import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";
import { Input, InputFile } from "../../../UI/Input";
import { useTranslation } from "react-i18next";
import { NoIcon, ReportBugIcon } from "../../../UI/Svg";
import { Button } from "../../../UI/Button";
import { useUserState } from "../../../store/user";
import { handle } from "../../../api";
import { User } from "../../../api/user";
import { useAppActions } from "../../../store/app";
import { activityList } from "../../../config/userActivityList";
import { Dropdown } from "../../../UI/Dropdown";
import { fixedMenuBP } from "../../../config/menu";
import { Loader } from "../../../UI/Spinners";

const StyledWrapper = styled.button<{ opened: boolean }>`
  display: flex;
  ${({ opened }) => opened && "width: 8.49vw;"}
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  border-radius: 50px;
  color: ${props => props.theme.color.lightBlue};
  padding-top: 1.93vw;
  transition: all 0.25s ease;
  padding-left: ${(s) => (!s.opened ? "1.3vw" : "2.07vw")};
  font-size: ${props => props.theme.fontSize.medium.vw};
  p {
    margin: 0 auto;
  }
  svg {
    height: 1.77vw;
    width: 1.77vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    svg {
      height: 22px;
      width: 22px;
    }
    
  @media screen and (max-width: ${desktopBp}) {
    padding-left: ${(s) => (!s.opened ? "19.3px" : "26px")};
    padding-top: 24px;
    font-size: ${props => props.theme.fontSize.medium.px};
  }
    
  @media(max-width: 750px){
    padding-left: 26px;
  }  

  ${({ opened }) => opened && "width: 107px;"}
  }
  @media screen and (max-width: ${fixedMenuBP}) {
    ${({ opened }) => !opened && 'display: none;'}
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1.3vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`;

const StyledTextArea = styled(Input)`
  margin-bottom: 1.3vw;
  width: 500px !important;
  max-width: 95%;
  textarea {
    min-height: 130px;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`;

const StyledFileInput = styled(InputFile)`
  margin-bottom: 20px;
`;

const InputTitle = styled.p`
  font-size: 1.3vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const InputText = styled.p`
  font-size: 0.99vw;
  margin: 0;
  text-decoration: underline;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const StyledFile = styled.p`
  margin: 0 0 5px;
  text-decoration: underline;
`;

const DeleteBtn = styled.button`
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

const StyledLoader = styled(Loader)`
  height: 20px;
  width: 20px;
`
const LoaderContainer = styled.div`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  
`

interface IProps {
  opened: boolean
}

const ReportBugComponent = React.memo(({ opened }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { onShowAlert } = useAppActions();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [criticality, setCriticality] = useState<"1" | "2" | "3" | "4">("4");
  const [files, setFiles] = useState<File[]>([]);

  const criticalityOptions = useMemo(() => {
    return [
      { item: t("bug_report-criticality1"), value: "1" },
      { item: t("bug_report-criticality2"), value: "2" },
      { item: t("bug_report-criticality3"), value: "3" },
      { item: t("bug_report-criticality4"), value: "4" },
    ];
  }, [t]);

  const resetData = useCallback(() => {
    setShowModal(false)
    setTitle("")
    setEmail("")
    setDescription("");
    setSteps("");
    setCriticality("4");
    setFiles([]);
  }, [])

  const handleReportBug = useCallback(async () => {
    //Check files size is less than 100mb
    const filesTotalSizeInMb = files.reduce((val, file) => val + file.size, 0) / 1000000
    if(filesTotalSizeInMb > 100) {
      onShowAlert(false, t("bug_report-files_error"));
      return
    }
    if (token && userInfo) {
      const data = {
        user_name: userInfo?.login,
        user_info: `Group id: ${userInfo.group.id}, User id: ${userInfo.id}`,
        title,
        email,
        description,
        steps,
        files,
        criticality
      };
      setIsFetching(true)
      const [dataRes, dataErr] = await handle(User.reportBug(token, data));
      setIsFetching(false)
      if (!dataErr) {
        resetData()
        onShowAlert(true, t("bug_report-success"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, userInfo, description, steps, files, t, criticality, title, email]);

  const handleChangeFiles = useCallback((files: FileList) => {
    const arr = Array.from(files);
    setFiles((p) => [...p, ...arr]);
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      const copy = [...files];
      copy.splice(index, 1);
      setFiles(copy);
    },
    [files]
  );

  return (
    <>
      <StyledWrapper
        opened={opened}
        onClick={() => setShowModal(true)}
        data-activity={activityList["open-bug_report"]}
      >
        <ReportBugIcon />
        {opened && <p>{t("bug_report")}</p>}
      </StyledWrapper>
      <Modal preventCloseOnClickOutside show={showModal} onClose={() => setShowModal(false)}>
        <StyledTextArea
          type="text"
          name="title"
          label={t("bug_report-title")}
          value={title}
          onChange={setTitle}
          isTextarea={false}
          errorMessage={title.length > 250 ? t("bug_report-title_err", { chars: 250 }) : ""}
        />
        <StyledTextArea
          type="text"
          name="description"
          label={t("bug_report-desc")}
          value={description}
          onChange={setDescription}
          isTextarea={true}
        />
        <StyledTextArea
          type="text"
          name="steps"
          label={t("bug_report-steps")}
          value={steps}
          onChange={setSteps}
          isTextarea={true}
        />
        <Input type="text" name="email" label={t("bug_report-email")} value={email} onChange={setEmail} />
        <StyledDropdown
          label={t("bug_report-criticality")}
          value={criticality}
          placeholder={t("bug_report-criticality")}
          onSelect={setCriticality}
          options={criticalityOptions}
        />
        {files.map((f, i) => {
          return (
            <StyledFile key={i}>
              {f.name}{" "}
              <DeleteBtn onClick={() => handleDelete(i)}>
                <NoIcon />
              </DeleteBtn>
            </StyledFile>
          );
        })}
        <StyledFileInput
          placeholder={t("bug_report-files")}
          isMultiple={true}
          content={
            <>
              <InputTitle>{t("raw-data_file-drop")}</InputTitle>
              <InputText>{t("raw-data_file-click")}</InputText>
            </>
          }
          onChange={(f) => handleChangeFiles(f as FileList)}
        />
        {isFetching && (
            <LoaderContainer>
              <StyledLoader/>
            </LoaderContainer>
        )}
        {!isFetching && (
            <StyledButton
                onClick={handleReportBug}
                disabled={title.length > 250 && isFetching}
                data-activity={activityList["send-bug_report"]}
            >
              {t("bug_report-btn")}
            </StyledButton>
        )}
      </Modal>
    </>
  );
});

export default ReportBugComponent;
