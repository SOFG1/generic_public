import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { Button } from "../../UI/Button";
import { colors } from "../../styles/colors";
import { InputValueType } from "../../types";
import { Text } from "../../components/common/Text";
import { FileDrop } from "react-file-drop";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const FacebookPostsViewStyled = styled(Card)`
  margin-top: 2.08vw;
  padding: 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 26px;
  }
`;

const TitleStyled = styled(Title)`
  margin-top: 0;
  font-size: 1.25vw;
  line-height: 1.2;
  margin-bottom: 0;
  font-weight: 500;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.04vw 1.04vw 1.04vw 1.56vw;
  box-sizing: border-box;
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px 13px 13px 20px;
  }
`;

const ButtonStyled = styled(Button)`
  padding: 0.57vw 1.04vw;
  width: 100%;
  max-width: 15.31vw;
  font-size: 0.73vw;
  line-height: 0.89vw;
  letter-spacing: 1px;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 13px;
    max-width: 192px;
    font-size: 9px;
    line-height: 11px;
  }
`;

const FormBlock = styled.div`
  border-top: 1px solid ${colors.graphite_1};
  width: 100%;
`;

const FormHeader = styled.div`
  border-bottom: 1px solid ${colors.graphite_1};
  padding: 1.04vw 1.56vw;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px 20px;
  }
`;

const FormBody = styled(FormHeader)`
  flex-direction: column;
  border-bottom: none;
  align-items: flex-start;
  align-content: flex-start;
  padding-bottom: 0;
`;

const PostContent = styled.div`
  display: flex;
  align-content: center;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 0.78vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
  }
`;

const TitleInputFileStyled = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 7px;
  }
`;
const TextInputFileStyled = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const FileDropWrapper = styled.div`
  background: #ffffff;
  border: 2px dashed ${colors.graphite_1};
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Textarea = styled.textarea`
  background: #ffffff;
  border: 1px solid ${colors.graphite_1};
  box-sizing: border-box;
  box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.05);
  flex: 1;
  padding: 0.52vw;
  border-radius: 0.52vw;
  margin-right: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 7px;
    border-radius: 7px;
    margin-right: 13px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  margin-top: 1.04vw;
  padding: 1.04vw;
  button {
    max-width: 15.21vw;
    &:first-child {
      margin-right: 2.08vw;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
    padding: 13px;
    button {
      max-width: 191px;
      &:first-child {
        margin-right: 26px;
      }
    }
  }
`;

const FacebookPostsView = React.memo(() => {
  const { t } = useTranslation();
  const [isLoginFacebook, setIsLoginFacebook] = useState(false);
  const [data, setData] = useState<{ [key: string]: InputValueType }>({
    group: "",
    post: "",
    author: "",
    file: "",
  });
  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const onTargetClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);


  const saveFile = useCallback(
    (file: File) => {
      setData((p) => ({...p, file: file.name}))
    },
    []
  );

  return (
    <FacebookPostsViewStyled>
      <Header>
        <TitleStyled>{t("ranking_facebook-title")}</TitleStyled>
        <ButtonStyled onClick={() => setIsLoginFacebook(!isLoginFacebook)}>
          {isLoginFacebook ? "Log out" : "Login with facebook"}
        </ButtonStyled>
      </Header>
      {isLoginFacebook && (
        <FormBlock>
          <FormHeader>
            <Dropdown
              placeholder="Select group or page"
              label="Select group or page"
              value={data.group || ""}
              options={[
                { item: "My group", value: "My group" },
                { item: "Group 1", value: "Group 1" },
              ]}
              onSelect={(v) => setData((p) => ({ ...p, group: v }))}
            />
            <Dropdown
              placeholder="Select a post"
              label="Select a post"
              value={data.post || ""}
              options={[
                { item: "My post", value: "My post" },
                { item: "Post 1", value: "Post 1" },
              ]}
              onSelect={(v) => setData((p) => ({ ...p, post: v }))}
            />
          </FormHeader>
          <FormBody>
            <Dropdown
              placeholder="Who posted"
              label="Who posted"
              value={data.author || ""}
              options={[
                { item: "Me", value: "Me" },
                { item: "User 1", value: "User 1" },
              ]}
              onSelect={(v) => setData((p) => ({ ...p, author: v }))}
            />
            <PostContent>
              <Textarea />
              <FileDropWrapper>
                <FileDrop
                  onTargetClick={onTargetClick}
                  onDrop={(files) => {
                    if (files !== null && files.length > 0) {
                      saveFile(files[0]);
                    }
                  }}
                >
                  <TitleInputFileStyled>
                    {t("ranking_file-images")}
                  </TitleInputFileStyled>
                  <TextInputFileStyled>
                    {t("ranking_file-click")}
                  </TextInputFileStyled>
                  <Text>{t("ranking_file-format")}</Text>
                </FileDrop>
              </FileDropWrapper>
            </PostContent>
          </FormBody>
          <ButtonBlock>
            <Button>{t("ranking_file-clear")}</Button>
            <Button>{t("ranking_file-publish")}</Button>
          </ButtonBlock>
        </FormBlock>
      )}
    </FacebookPostsViewStyled>
  );
});

export default withErrorBoundaryHOC(FacebookPostsView);
