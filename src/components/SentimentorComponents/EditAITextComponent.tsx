import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../../UI/Input";
import { debounce } from "lodash";
import { IAIPost, useSentimentorActions } from "../../store/sentimentor";
import { useTranslation } from "react-i18next";

const StyledTitle = styled.p`
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 20px;
`;

const StyledTextarea = styled(Input)`
  width: 700px;
  max-width: 100%;
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

interface IProps {
  post: IAIPost
}

const EditAITextComponent = React.memo(({post}: IProps) => {
  const { t } = useTranslation();
  const { editAIPostText } =
    useSentimentorActions();
  const [text, setText] = useState<string>("");

  const editTextDebounced = useCallback(debounce(editAIPostText, 1000), []);

  useEffect(() => {
    if (text && text !== post.text_request?.text) {
      editTextDebounced(post.id, text);
    }
  }, [text, editTextDebounced, post.text_request?.text, post.id]);

  useEffect(() => {
    setText(post.text_request?.text || "");
  }, [post.text_request?.text]);

  return (
    <>
      <StyledTitle>{t("ranking_ai-generated_post")}</StyledTitle>
      <StyledTextarea
        label={t("ranking_ai-post_text")}
        type="text"
        name="text"
        isTextarea={true}
        value={text}
        onChange={setText}
      />
    </>
  );
});

export default EditAITextComponent;
