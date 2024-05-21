import React, {memo, useEffect, useState} from "react";
import styled from "styled-components";
import {Dropdown} from "../../UI/Dropdown";
import {useSelector} from "react-redux";
import {sentimentorAiModels} from "../../store/sentimentor/selectors";
import {useSentimentorActions} from "../../store/sentimentor";
import {Input} from "../../UI/Input";
import {IAiSettings} from "./AIPictureEditorComponent";

interface IProps{
    data:IAiSettings,
    generatePrompt:string,
    setGeneratePrompt:(value:string) => void,
    onChange: (key: keyof IAiSettings, value: any) => void,
}

const AiPictureSettingsComponent = memo(({data, onChange, generatePrompt, setGeneratePrompt}:IProps)=>{
    const {width, height,cfg_scale, batch_size, steps, seed, model, negativePrompt} = data;
    const {getAiModels} = useSentimentorActions();
    const aiModels = useSelector(sentimentorAiModels);
    useEffect(()=>{
        getAiModels();
    },[])

    return(
        <Container>
            <Group>
                <Dropdown value={model} placeholder={"Select ai model"} onSelect={(vl)=>onChange("model", vl)} options={aiModels.map(model => ({item:model.title, value:model.title}))} label={"Select ai model"}/>
                <Input type="number" label="Width" onChange={(value)=>onChange("width", parseInt(value))} value={width || ""} name="width"/>
                <Input type="number" label="Height"  onChange={(value)=>onChange("height", parseInt(value))} value={height || ""} name="height"/>
                <Input type="number" label="Steps"  onChange={(value)=>onChange("steps", parseInt(value))} value={steps || ""} name="Steps"/>
                <Input type="number" label="Batch Size"  onChange={(value)=>onChange("batch_size", parseInt(value))} value={batch_size || ""} name="Batch Size"/>
                <Input type="number" label="Seed"  onChange={(value)=>onChange("seed", parseInt(value))} value={seed || ""} name="seed"/>
                <Input type="number" label="Cfg Scale"  onChange={(value)=>onChange("cfg_scale", parseInt(value))} value={cfg_scale || ""} name="cfg_scale"/>
            </Group>
            <Group>
                <StyledTextarea  label={"Prompt"} type={"text"} name={"prompt"} placeholder="Prompt" isTextarea value={generatePrompt} onChange={(vl) => setGeneratePrompt(vl)} />
                <StyledTextarea placeholder="Negative Prompt" isTextarea onChange={(vl)=>onChange("negativePrompt", vl)} label={"Negative prompt"} type={"text"} name={"negative prompt"} value={negativePrompt}/>
            </Group>
        </Container>
    )
})

export default AiPictureSettingsComponent;


const Container = styled.div`
    width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
`

const Group = styled.div`
    width: 50%;
  display: flex;
  flex-direction: column;
`

const StyledTextarea = styled(Input)`
  height: 100%;
    textarea {
        resize: none;
        min-height: 100px;
      height: 100%;
    }
  *{
    margin-top: 0;
    margin-bottom: 0;
  }
`
