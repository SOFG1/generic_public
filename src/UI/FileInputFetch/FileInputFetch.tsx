
//@ts-ignore
import React, { useState, useId } from "react";
import styled from "styled-components";
import { handle } from "../../api";
import { useUserState } from "../../store/user/hooks";
import { ClipIcon, FileIcon, NoIcon } from "../Svg";
import { Loader } from "../Spinners";
import { desktopBp } from "../../styles/variables";
import { CallCenter } from "../../api/callCenter";
import { useTranslation } from "react-i18next";

const Wrapper = styled.label``;

const Input = styled.input`
  display: none;
`;

const StyledBtn = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #000;
  padding: 5px 1.04vw;
  border: 1px solid #999999;
  border-radius: 15px;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.55;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 3px 13px;
  }
`;

const FilesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.36vw;
  margin-top: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 5px;
    margin-top: 7px;
  }
`;

const StyledFile = styled.p`
  display: flex;
  align-items: center;
  padding: 5px 7px;
  gap: 6px;
  font-size: 0.83vw;
  line-height: 0.83vw;
  color: #000;
  background: #ffffff;
  border: 1px solid #f06543;
  border-radius: 0.68vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 10px;
    border-radius: 8px;
  }
`;


const DelBtn = styled.button`
  height: 1.04vw;
  width: 1.04vw;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: opacity 250ms linear;
  &:hover {
    opacity: 0.6;
  }
  svg {
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 13px;
    width: 13px;
  }
`;

const StyledLaoder = styled(Loader)`
  height: 2.08vw;
  width: 2.08vw;
  margin-top: 10px;
  @media screen and (max-width: ${desktopBp}) {
    height: 26px;
    width: 26px;
  }
`;

interface IProps {
  filesList: { name: string; id: number }[];
  onChange: (files: { name: string; id: number }[]) => void;
  className?: string;
}

const FileInputFetch = React.memo(
  ({ className, filesList, onChange }: IProps) => {
    const { t } = useTranslation()
    const { token } = useUserState();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const id = useId();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsFetching(true);
      if (typeof e.target?.files?.length === "number") {
        const filesArr: { name: string; id: number }[] = [];
        for (let i = 0; i < e.target?.files?.length; i++) {
          const data = new FormData();
          data.append("file", e.target?.files[i]);
          const [dataRes, dataErr] = await handle(
            CallCenter.sendAttachment(token as string, data)
          );
          if (dataErr) return;
          if (dataRes) console.log(dataRes);
          filesArr.push({ name: dataRes.name, id: dataRes.id });
        }
        setIsFetching(false);
        onChange([...filesArr, ...filesList]);
      }
    };

    const handleDelete = async (id: number) => {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        CallCenter.deleteAttachment(token as string, id)
      );
      setIsFetching(false);
      if (dataErr) console.log(dataErr);
      if (!dataErr) {
        const filtered = filesList.filter((f) => f.id !== id);
        onChange(filtered);
      }
    };

    return (
      <div className={className}>
        <Wrapper htmlFor={id}>
          <StyledBtn>
            <ClipIcon />
            {t("file_input-label")}
          </StyledBtn>
          <Input id={id} type="file" multiple={true} onChange={handleChange} value={""} />
        </Wrapper>
        {isFetching ? (
          <StyledLaoder />
        ) : (
          <FilesBox>
            {filesList.map((f) => {
              return (
                <StyledFile key={f.id}>
                  <FileIcon />
                  {f.name}
                  <DelBtn onClick={() => handleDelete(f.id)}>
                    <NoIcon />
                  </DelBtn>
                </StyledFile>
              );
            })}
          </FilesBox>
        )}
      </div>
    );
  }
);

export default FileInputFetch;
