import React, {useCallback, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {Checkbox} from "../../UI/Input";
import {Button} from "../../UI/Button";
import {useTranslation} from "react-i18next";
import {desktopBp} from "../../styles/variables";
import {RelationsKeyword, relationsKeywordsSelector, useRelationsActions,} from "../../store/relations";
import {SentimentorKeyword, useSentimentorActions,} from "../../store/sentimentor";
import {useSelector} from "react-redux";
import {sentimentorKeywordsSelector} from "../../store/sentimentor/selectors";
import {Loader} from "../../UI/Spinners";
import {ConfirmDeleteFull} from "../common/ConfirmDeleteFull";
import {usePermissions, useUserState} from "../../store/user";
import {useAppState} from "../../store/app";
import KeywordInputComponent from "./KeywordInputComponent";
import AddExcelKeywordsComponent from "./AddExcelKeywordsComponent";
import {Dropdown} from "../../UI/Dropdown";
import {createPortal} from "react-dom";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const StyledLoader = styled(Loader)`
  height: 200px;
  width: 200px;
  margin: 20px auto;
`;

const StyledGrid = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StyledList = styled.div<{ fullWidth: boolean }>`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  justify-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 20.83vw;
  overflow-y: auto;
  ${({ fullWidth }) => fullWidth && "grid-column: span 3;"}
  @media screen and (max-width: ${desktopBp}) {
    max-height: 261px;
  }
`;

const StyledTitle = styled.p`
  width: 100%;
  font-weight: 700;
`;

const StyledKeyword = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.94vw;
  line-height: 1.2vw;
  gap: 0.94vw;
  padding: 0.36vw;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 50px;
  svg {
    height: 1.46vw;
    width: 1.46vw;
    cursor: pointer;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    gap: 12px;
    padding: 5px;
    padding-inline-start: 12px;
    svg {
      height: 18px;
      width: 18px;
    }
  }
`;
const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1vw;
  justify-content: flex-start;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
`
const StyledSelected = styled.p`
  margin: 0;
  white-space: nowrap;
  font-size: 16px;
  span {
    font-weight: 700;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const StyledCheckbox = styled(Checkbox)``;

const StyledBtn = styled(Button)``;

const EditKeywordsComponent = React.memo(() => {
  const { t } = useTranslation();
  const { alert } = useAppState()
  const { userInfo } = useUserState()
  const {
    onGetKeywords: getSentimentorKeywords,
    onDeleteKeyword: deleteSentimentorKeyword,
    onAddKeyword: addSenitmentorKeyword,
      onEditKeywordParsingStyle,
  } = useSentimentorActions();
  const {
    onCreateKeyword: addRelationsKeyword,
    onDeleteKeyword: deleteRelationsKeyword,
    onGetKeywords: getRelationsKeywords,
  } = useRelationsActions();
  const {token} = useUserState();
  const sentimentorKeywords = useSelector(sentimentorKeywordsSelector);
  const relationsKeywords = useSelector(relationsKeywordsSelector);
  let { Keywords: relationsPermission } = usePermissions("connections")
  let { add_keyword: sentimentorPermission } = usePermissions("Ranking")
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [keywordValue, setKeywordValue] = useState<string>("");
  const [parsingStyle, setParsingStyle] = useState("top");
  const [isSentimentor, setIsSentimentor] = useState<boolean>(true);
  const [isConnections, setIsConnections] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const settingsPermissions = usePermissions("Settings");

  const permissionForAllSegments = useMemo(() => {
    return !userInfo?.segments || userInfo?.segments.length === 0
  }, [userInfo])



  const isCreateDisabled: boolean = useMemo(() => {
    if (!keywordValue.trim()) return true;
    if (isFetching) return true;
    if (!isSentimentor && !isConnections) return true;
    return false;
  }, [
    keywordValue,
    isSentimentor,
    isConnections,
    isFetching,
  ]);

  //Keywords which are in monitoring and relations
  const commonKeywords = useMemo(() => {
    const arr: RelationsKeyword[] = [];
    sentimentorKeywords.forEach((keyword) => {
      const isCommon = relationsKeywords?.some((k) => k.word === keyword.word);
      if (isCommon) {
        arr.push(keyword);
      }
    });
    return arr;
  }, [sentimentorKeywords, relationsKeywords]);

  //Only sentimentor keywords
  const sentimentorFiltered = useMemo(() => {
    return sentimentorKeywords.filter(r => {
      return !relationsKeywords?.some(s => s.word === r.word)
    })
  }, [relationsKeywords, sentimentorKeywords])

  //Only relations keywords
  const relationsFiltered = useMemo(() => {
    return relationsKeywords?.filter(r => {
      return !sentimentorKeywords.some(s => s.word === r.word)
    })
  }, [relationsKeywords, sentimentorKeywords])

  const handleCreate = useCallback(() => {
    setIsFetching(true);
    if (isSentimentor) {
      addSenitmentorKeyword(keywordValue, parsingStyle);
    }
    if (isConnections) {
      addRelationsKeyword(keywordValue);
    }
  }, [keywordValue, isSentimentor, isConnections, parsingStyle]);

  const handleDeleteSelected = useCallback(() => {
    setIsFetching(true);
    const sentimentor = sentimentorKeywords?.find(
      (k) => k.word === selectedKeyword
    );
    if (sentimentor) {
      deleteSentimentorKeyword(sentimentor.id);
    }
    const relations = relationsKeywords?.find(
      (k) => k.word === selectedKeyword
    );
    if (relations) {
      deleteRelationsKeyword(relations.id);
    }
  }, [sentimentorKeywords, relationsKeywords, selectedKeyword]);

  const handleEdit = async () => {
    const sentimentor = sentimentorKeywords.find(
      (k) => k.word === selectedKeyword
    );
    const relations = relationsKeywords?.find(
      (k) => k.word === selectedKeyword
    );
    //delete if 'connections' is not checked
    if (relations && !isConnections) {
      setIsFetching(true);
      deleteRelationsKeyword(relations.id);
    }
    //delete if 'sentimentor' is not checked
    if (sentimentor && !isSentimentor) {
      setIsFetching(true);
      deleteSentimentorKeyword(sentimentor.id);
    }
    //create new if 'connections' checked but keyword doesn't exist
    if (!relations && isConnections) {
      setIsFetching(true);
      addRelationsKeyword((sentimentor as RelationsKeyword).word);
    }
    //create new if 'sentimentor' checked but keyword doesn't exist
    if (!sentimentor && isSentimentor) {
      setIsFetching(true);
      addSenitmentorKeyword((relations as SentimentorKeyword).word, parsingStyle);
    }
    if(sentimentor && sentimentor.parsing_style !== parsingStyle && token){
      setIsFetching(true);
      onEditKeywordParsingStyle(sentimentor.id, parsingStyle)
    }
  };
  const handleSelect = useCallback(
    (word: string) => {
      if (selectedKeyword === word) {
        setSelectedKeyword("");
        return;
      }
      setSelectedKeyword(word);
    },
    [selectedKeyword]
  );
  useEffect(()=>{

    const sentimentor = sentimentorKeywords.find(
        (k) => k.word === selectedKeyword
    );

    if(!sentimentor || !sentimentor?.parsing_style) return setParsingStyle("top");
    setParsingStyle(sentimentor.parsing_style);
  },[selectedKeyword])
  useEffect(() => {
    getRelationsKeywords();
    getSentimentorKeywords();
  }, []);

  useEffect(() => {
    setIsFetching(false);
    setKeywordValue("");
    setSelectedKeyword(null);
  }, [sentimentorKeywords, relationsKeywords]);

  useEffect(() => {
    const senitmentor = sentimentorKeywords.some(
      (k) => k.word === selectedKeyword
    );
    setIsSentimentor(!!senitmentor);
    const relations = relationsKeywords?.some(
      (k) => k.word === selectedKeyword
    );
    setIsConnections(!!relations);
  }, [selectedKeyword, sentimentorKeywords, relationsKeywords]);


  //Automaticallly select checkbox if there is no permissions for connections or sentimentor
  useEffect(() => {
    if (!relationsPermission && !selectedKeyword && !isSentimentor) setIsSentimentor(true)
    if (!sentimentorPermission && !selectedKeyword && !isConnections) setIsConnections(true)
  }, [relationsPermission, selectedKeyword, isSentimentor, isConnections])


  useEffect(() => {
    setIsFetching(false)
  }, [alert])

  return (
    <>
      {createPortal(<ConfirmDeleteFull
          title={t("settings_keywords-warning", { word: selectedKeyword })}
          show={confirmDelete}
          onDelete={handleDeleteSelected}
          onClose={() => setConfirmDelete(false)}
      />,  document.querySelector(".App") as Element)}
      {permissionForAllSegments && <StyledBox>
        {selectedKeyword && (
          <StyledSelected>
            {t("settings_keywords-selected")} <span> {selectedKeyword}</span>
          </StyledSelected>
        )}
        {!selectedKeyword && (relationsPermission || sentimentorPermission) && (
          <KeywordInputComponent
            value={keywordValue}
            onChange={setKeywordValue}
          />
        )}
        {settingsPermissions.parsing_style &&
            <Dropdown value={parsingStyle}
                      placeholder={t("settings_keywords_placeholder")}
                      onSelect={(value)=>{setParsingStyle(value)}}
                      options={[{item:"top", value:"top"}, {item:"recent", value:"recent"}]}
                      label={t("settings_keywords_parsing_style_label")}/>}
        {/* Show checkboxes below only if "relationsPermission" && "sentimentorPermission" exists */}
        {relationsPermission && sentimentorPermission && (
          <ItemContainer>
            <StyledCheckbox
              label={t("settings_keywords-is_monitoring")}
              isActive={isSentimentor}
              onChange={setIsSentimentor}
            />
            <StyledCheckbox
              label={t("settings_keywords-is_connections")}
              isActive={isConnections}
              onChange={setIsConnections}
            />
          </ItemContainer>
        )}
        {!selectedKeyword && (relationsPermission || sentimentorPermission) && (
          <StyledBtn onClick={handleCreate} disabled={isCreateDisabled}>
            {t("settings_keywords-add")}
          </StyledBtn>
        )}

        {selectedKeyword && (
          <>
            <StyledBtn
              onClick={handleEdit}
              disabled={(!isSentimentor && !isConnections) || isFetching}
            >
              {t("settings_keywords-edit")}
            </StyledBtn>
            <StyledBtn
              onClick={() => setConfirmDelete(true)}
              disabled={isFetching}
            >
              {t("settings_keywords-delete")}
            </StyledBtn>
          </>
        )}
        {(relationsPermission || sentimentorPermission) && <AddExcelKeywordsComponent />}
      </StyledBox>}




      {isFetching && <StyledLoader />}
      {!isFetching && (
        <StyledGrid>


          {sentimentorPermission && (
            <StyledList fullWidth={!relationsPermission}>
              <StyledTitle>{t("settings_keywords-monitoring")}</StyledTitle>
              {sentimentorFiltered?.map((keyword, index) => (
                <StyledKeyword
                  key={index}
                  onClick={() => handleSelect(keyword.word)}
                >
                  {keyword.word}
                </StyledKeyword>
              ))}
            </StyledList>
          )}

          {sentimentorPermission && relationsPermission && <StyledList fullWidth={false}>
            <StyledTitle>{t("settings_keywords-common")}</StyledTitle>
            {commonKeywords?.map((keyword, index) => (
              <StyledKeyword
                key={index}
                onClick={() => handleSelect(keyword.word)}
              >
                {keyword.word}
              </StyledKeyword>
            ))}
          </StyledList>}

          {relationsPermission && (
            <StyledList fullWidth={false}>
              <StyledTitle>{t("settings_keywords-relations")}</StyledTitle>
              {relationsFiltered?.map((keyword, index) => (
                <StyledKeyword
                  key={index}
                  onClick={() => handleSelect(keyword.word)}
                >
                  {keyword.word}
                </StyledKeyword>
              ))}
            </StyledList>
          )}
        </StyledGrid>
      )}
    </>
  );
});

export default EditKeywordsComponent;
