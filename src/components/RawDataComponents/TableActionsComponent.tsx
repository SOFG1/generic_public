import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {usePermissions} from "../../store/user";
import {desktopBp} from "../../styles/variables";
import {activityList} from "../../config/userActivityList";
import {useAppActions} from "../../store/app";
import {
    CloudIcon,
    ClusteringIcon,
    CreateAudienceIcon,
    CreateIcon,
    FacebookAudienceIcon,
    GearIcon,
    GroupFamiliesIcon,
    ModellingIcon,
    PerfomanceIcon,
    StrategicReportIcon,
} from "../../UI/Svg";
import {RawDataModalType} from "../../store/rawData";
import {useTranslation} from "react-i18next";
import ModellingModalView from "../../views/RawDataViews/ModellingModalView";
import ClusteringModalView from "../../views/RawDataViews/ClusteringModalView";
import FamiliesModalView from "../../views/RawDataViews/FamiliesModalView";
import CreateAudienceComponent from "./CreateAudienceComponent";
import AudienceCSVComponent from "./AudienceCSVComponent";
import {ConfigureAudienceComponent, ReportsPanel, ReportsPanelComponent} from "./index";
import {FloatingPanel} from "../common/FloatingPanel";
import ConfigureAudience from "../../UI/Svg/icons/ConfigureAudience";


const StyledWrapper = styled.div`
  width: 100%;
  flex-wrap: wrap;
    display: flex;
    gap: 0 4.17vw;
    @media screen and (max-width: ${desktopBp}) {
      gap:0 52px;
  }
`

const StyledGroup = styled.div`
  position: relative;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  
  // @media screen and (max-width: ${desktopBp}) {
  //   margin-inline-end: 16px;
  // }
`;


const StyledButtonContainer = styled(StyledGroup)<{active?:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  p {
    position: relative;
    z-index: 30;
  }
  button{
    position: relative;
  }
  transition: .2s ease-in-out;
  &:after{
    @media screen and (max-width: ${desktopBp}) {
      height:63px !important;
    }
  }
  ${props => props.active && (
      `
        &:after{
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            z-index:9;
            position: absolute;
            top:0;
            content: "";
            width: 100%;
            height: 5.00vw;
            background: #fff;
            box-shadow: 0px -2px 16px 0 rgba(0,0,0,0.12);
        }
      `
  )}
`


const ButtonLabel = styled.p`
  font-size: 0.53vw;
  line-height: 1;
  font-weight: 500;
  color: #626262;
  margin: 0;
  z-index: 1;
  word-break: break-word;
  width: 3.33vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    width: 42px;
    font-size: 7px;
  }
  
`


const StyledAction = styled.button`
  position: relative;
  display: flex;
  z-index: 11;
  margin-top: 4px;
  margin-right: 1.33vw;
  margin-left: 1.33vw;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  
  border: 0;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  svg,
  img {
    height: 1.61vw;
    width: 1.61vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-right: 17px;
    margin-left: 17px;
    svg,
    img {
      height: 20px;
      width: 20px;
    }
  }
`;


const ClusteringAction = styled(StyledAction)`
  svg {
    margin-inline-start: 4px;
  }
`


interface IProps {
  onAddRow: () => void;
  onSetModal: (m: RawDataModalType) => void;
}

type FloatingPanels = "reports" | "performance"

const TableActionsComponent = React.memo(({ onAddRow, onSetModal }: IProps) => {
  const { t } = useTranslation();
  const { onShowAlert } = useAppActions();
  const permissions = usePermissions("Raw_Data");
  const [showCreateAudience, setShowCreateAudience] = useState<boolean>(false)
  const [showCSVAudience, setShowCSVAudience] = useState<boolean>(false)
  const [floatingPanel, setFloatingPanel] = useState<FloatingPanels | null>(null)
  const [showConfigureAudience, setShowConfigureAudience] = useState(false);

  const [showModellingModal, setShowModellingModal] = useState<boolean>(false);
  const [showClusteringModal, setShowClusteringModal] =
    useState<boolean>(false);
  const [showFamiliesModal, setShowFamiliesModal] = useState<boolean>(false);

  const toggleReports = useCallback(()=>{
      if(floatingPanel === "reports") return setFloatingPanel(null);
      setFloatingPanel("reports");
  },[floatingPanel]);

  const togglePerfomance = useCallback(()=>{
      if(floatingPanel === "performance") return setFloatingPanel(null);
      setFloatingPanel("performance");
  },[floatingPanel])

  return (
    <>
      <ModellingModalView
        show={showModellingModal}
        onClose={() => setShowModellingModal(false)}
      />
      <ClusteringModalView
        show={showClusteringModal}
        onClose={() => setShowClusteringModal(false)}
      />
      <FamiliesModalView
        show={showFamiliesModal}
        onClose={() => setShowFamiliesModal(false)}
      />

      <CreateAudienceComponent show={showCreateAudience} onClose={() => setShowCreateAudience(false)} />
      <ConfigureAudienceComponent show={showConfigureAudience} onClose={()=>setShowConfigureAudience(false)} />
      <AudienceCSVComponent show={showCSVAudience} onClose={() => setShowCSVAudience(false)} />
      {/*<ReportsComponent isOpen={showReports} onClose={()=>setShowReports(false)}/>*/}
      {/*<StrategicReportComponent show={showStrategicReport} onClose={() => setShowStrategicReport(false)} />*/}

      <StyledWrapper>
        <StyledButtonContainer>
          <StyledAction
              data-action={activityList["rawdata-add-row"]}
              onClick={() => {
                if (!permissions["create"]) {
                  onShowAlert(false, t("raw-data_table-create_permit"));
                  return;
                }
                onAddRow();
              }}
          >
            <CreateIcon />
          </StyledAction>
          <ButtonLabel>Create</ButtonLabel>
        </StyledButtonContainer>
        <StyledGroup>
          <StyledButtonContainer>
              <StyledAction
                  data-action={activityList["rawdata-upload-table"]}
                  onClick={() => {
                      if (!permissions["upload"]) {
                          onShowAlert(false, t("raw-data_table-upload_permit"));
                          return;
                      }
                      onSetModal("file-upload");
                  }}
              >
                  <CloudIcon />
              </StyledAction>
              <ButtonLabel>{t("raw-data_table-upload")}</ButtonLabel>
          </StyledButtonContainer>
            {permissions.edit && (
                <StyledButtonContainer>
                    <StyledAction
                        data-action={activityList["rawdata-update-manually"]}
                        onClick={() => {
                            if (!permissions["edit"]) {
                                onShowAlert(false, t("raw-data_table-update_permit"));
                                return;
                            }
                            onSetModal("update");
                        }}
                    >
                        <GearIcon />
                    </StyledAction>
                    <ButtonLabel>{t("raw-data_table-configure")}</ButtonLabel>
                </StyledButtonContainer>
            )}
        </StyledGroup>
          { permissions.analytic_tools && <StyledGroup>
              <StyledButtonContainer>
                  <StyledAction
                      data-action={activityList["rawdata-open-modelling"]}
                      onClick={() => setShowModellingModal(true)}
                  >
                      <ModellingIcon />
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_table-modelling")}</ButtonLabel>
              </StyledButtonContainer>


              <StyledButtonContainer>
                  <StyledAction
                      data-action={activityList["rawdata-open-families_grouping"]}
                      onClick={() => setShowFamiliesModal(true)}
                  >
                      <GroupFamiliesIcon />
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_table-families")}</ButtonLabel>
              </StyledButtonContainer>

              <StyledButtonContainer>
                  <ClusteringAction
                      data-action={activityList["rawdata-open-clustering"]}
                      onClick={() => setShowClusteringModal(true)}
                  >
                      <ClusteringIcon />
                  </ClusteringAction>
                  <ButtonLabel>{t("raw-data_table-clustering")}</ButtonLabel>
              </StyledButtonContainer>
          </StyledGroup>}

          { permissions.audience_tools && <StyledGroup>
              <StyledButtonContainer>
                  <StyledAction
                      data-action={activityList["create-audience"]}
                      onClick={() => setShowCreateAudience(true)}
                  >
                      <CreateAudienceIcon />
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_filters-create-audience")}</ButtonLabel>
              </StyledButtonContainer>
              <StyledButtonContainer>
                  <StyledAction
                      data-action={activityList["configure-audience"]}
                      onClick={() => setShowConfigureAudience(true)}
                  >
                      <ConfigureAudience/>
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_filters-configure-audience")}</ButtonLabel>
              </StyledButtonContainer>
              <StyledButtonContainer>
                  <StyledAction
                      data-action={activityList["open-export-facebook-csv"]}
                      onClick={() => setShowCSVAudience(true)}
                  >
                      <FacebookAudienceIcon />
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_filters-facebook_audience")}</ButtonLabel>
              </StyledButtonContainer>
          </StyledGroup>}


           <StyledGroup>
              <StyledButtonContainer active={floatingPanel === "reports"}>
                  <StyledAction
                      onClick = {toggleReports}
                  >
                      <StrategicReportIcon />
                  </StyledAction>
                  <ButtonLabel>{t("raw-data_filters-reports")}</ButtonLabel>
                  <FloatingPanel  open = {floatingPanel === "reports"}>
                      <ReportsPanel/>
                  </FloatingPanel>
              </StyledButtonContainer>
               {permissions.planing_tools && <StyledButtonContainer active={floatingPanel === "performance"}>
                   <StyledAction onClick = {togglePerfomance}>
                       <PerfomanceIcon/>
                   </StyledAction>
                   <ButtonLabel>{t("raw-data_table-performance")}</ButtonLabel>
                   <FloatingPanel open = {floatingPanel === "performance"}>
                       <ReportsPanelComponent/>
                   </FloatingPanel>
               </StyledButtonContainer>}
              {/*<StyledButtonContainer>*/}
              {/*    <StyledAction*/}
              {/*        data-action={activityList["open-strategic-report"]}*/}
              {/*        onClick={() => setShowStrategicReport(true)}*/}
              {/*    >*/}
              {/*        <StrategicReportIcon />*/}
              {/*    </StyledAction>*/}
              {/*    <ButtonLabel>{t("raw-data_filters-strategic")}</ButtonLabel>*/}
              {/*</StyledButtonContainer>*/}

              {/* <StyledButtonContainer>*/}
              {/*     <StyledAction*/}
              {/*         data-action={activityList["rawdata-summarization-report"]}*/}
              {/*         onClick={onGetSummarizationReport}*/}
              {/*     >*/}
              {/*         <FlowIcon/>*/}
              {/*     </StyledAction>*/}
              {/*     <ButtonLabel>{t("raw-data_summarization")}</ButtonLabel>*/}
              {/* </StyledButtonContainer>*/}
          </StyledGroup>

      </StyledWrapper>

    </>
  );
});

export default TableActionsComponent;




