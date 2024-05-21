import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Graph from "react-vis-network-graph";
import { Loader } from "../../UI/Spinners";
import { Card } from "../../components/common/Card";
import { composeGraphPosts } from "../../utils/composeGraphPosts";
import { useSelector } from "react-redux";
import {
  relationsIsFetchingSelector,
  relationsPersonsSelector,
  relationsPostsSelector,
  relationsRelationsSelector,
  relationsSelectedPersonsSelector,
  relationsSelectedPostSelector,
  relationsSelectedRelationsSelector,
  useRelationsActions,
  relationsKeywordFilterSelector,
  relationsKeywordsSelector,
  relationsTagsSelector,
} from "../../store/relations";
import { RefreshIcon } from "../../UI/Svg";
import { composeGraphEdges } from "../../utils/composeGraphEdges";
import { composeGraphPersons } from "../../utils/composeGraphPersons";
import { useTranslation } from "react-i18next";
import { removeDuplications } from "../../utils/removeDuplications";
import { activityList } from "../../config/userActivityList";
import { colorsChart } from "../../config";
import { ChartLegendComponent } from "../../components/RelationsComponents";
import "../../assets/scss/graph-minimap.scss";
import { drawVisMinimap } from "../../utils/drawVisMinimap";
import { composeGraphKeywords } from "../../utils/composeGraphKeywords";
import { ErrorBoundary } from "react-error-boundary";

const StyledCard = styled(Card)`
  position: relative;
  .vis-network {
    overflow: visible !important;
  }
  .vis-navigation {
    position: absolute;
    height: 60px;
    width: 30px;
    top: 50px;
    right: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    box-shadow: 0px 80px 32px rgba(0, 0, 0, 0.01),
      0px 45px 27px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.09),
      0px 5px 11px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .vis-zoomIn::after {
    content: "+";
    font-size: 35px;
    line-height: 100%;
  }
  .vis-zoomOut::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 3px;
    width: 13px;
    background-color: #000;
  }
  .vis-zoomIn,
  .vis-zoomOut {
    position: relative !important;
    bottom: 0 !important;
    right: 0 !important;
    height: 30px !important;
    display: flex !important;
    justify-content: center !important;
    width: 30px !important;
    background-image: none !important;
    border-radius: 0 !important;
    &:hover {
      box-shadow: none !important;
    }
  }
  .vis-up,
  .vis-left,
  .vis-right,
  .vis-down,
  .vis-zoomExtends {
    display: none !important;
  }
`;

const GraphWrapper = styled.div`
  position: relative;
  height: 85vh;
`;

const StyledLaoder = styled(Loader)`
  position: absolute;
  top: 20px;
  inset-inline-start: 20px;
  z-index: 2;
`;

const RefreshBtn = styled.button`
  position: absolute;
  top: 20px;
  inset-inline-start: 20px;
  height: 24px;
  width: 24px;
  padding: 0;
  border: 0;
  z-index: 2;
  background-color: transparent;
  cursor: pointer;
  transition: 150ms;
  &:active {
    transform: rotate(180deg);
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;

const StyledPostLink = styled.p`
  position: absolute;
  top: 0;
  inset-inline-start: 60px;
  inset-inline-end: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-inline-start: 20px;
  z-index: 2;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledError = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const options = {
  autoResize: true,
  interaction: {
    navigationButtons: true,
  },
  //orverlap
  physics: {
    barnesHut: {
      springConstant: 0,
      avoidOverlap: 2,
    },
    timestep: 3,
    stabilization: {
      enabled: false,
    },
  },
  nodes: {
    shape: "circle",
    mass: 8,
    color: {
      background: "#fff",
      border: "#000",
      highlight: {
        background: "#fff",
        border: "#000",
      },
    },
  },
  edges: {
    color: "#000",
    physics: false,
    arrows: {
      to: {
        enabled: false,
      },
    },
  },
  height: "100%",
};

const GraphView = React.memo(() => {
  const { t } = useTranslation();
  const keywordFilter = useSelector(relationsKeywordFilterSelector);
  const tags = useSelector(relationsTagsSelector);
  const posts = useSelector(relationsPostsSelector);
  const persons = useSelector(relationsPersonsSelector) || [];
  const relations = useSelector(relationsRelationsSelector) || [];
  //Rest
  const selectedPersons = useSelector(relationsSelectedPersonsSelector) || [];
  const selectedRelations =
    useSelector(relationsSelectedRelationsSelector) || [];
  const isFetching = useSelector(relationsIsFetchingSelector);
  const selectedPost = useSelector(relationsSelectedPostSelector);
  const { onResetData, onSelectPost, onSetKeywordFilter, onGetTags } = useRelationsActions();

  const tagsColors = useMemo(() => {
    const tagsList: any[] = [];
    posts.forEach((p: any) => {
      const tagId = p.properties.tag_id.low;
      const tag = p.properties.tag;
      const alreadyAdded = tagsList.some((t) => t.id === tagId);
      if (!alreadyAdded) {
        tagsList.push({ id: tagId, tag, color: colorsChart[tagsList.length] });
      }
    });
    return tagsList;
  }, [posts]);


  const graph = useMemo(() => {
    //Show keywords if no keyword filter
    if(!keywordFilter) {
      return {
        nodes: composeGraphKeywords(tags),
        edges: []
      }
    }



    const postsFormatted = composeGraphPosts(posts || [], tagsColors);
    const selectedPersonsFormatted = composeGraphPersons(selectedPersons || []);
    const relationsFormatted = composeGraphEdges(relations);
    const selectedRelationsFormatted = composeGraphEdges(
      selectedRelations || [],
      true
    );
    const personsFormatted = composeGraphPersons(persons);
    const nodesFiltered = removeDuplications([
      ...personsFormatted,
      ...postsFormatted,
      ...selectedPersonsFormatted,
    ])

    return {
      nodes: nodesFiltered,
      edges: [...relationsFormatted, ...selectedRelationsFormatted],
    };
  }, [
    keywordFilter,
    tags,
    selectedPost,
    posts,
    relations,
    selectedRelations,
    persons,
    selectedPersons,
    tagsColors,
  ]);

  const events = {
    click: (e: any) => {
      if (e?.nodes[0]) {
        const item = e?.nodes[0];
        //If clicked on keyword
        const keyword = tags?.find(k => k.tag === item)
        if(keyword) {
          onSetKeywordFilter(keyword.tag)
        }
        //If clicked on post
        const post = posts.find((p) => p.elementId === item);
        if (post) {
          onSelectPost(post);
        }
      }
    },
  };

  useEffect(() => {
    if (tags.length === 0) {
      onGetTags();
    }
  }, [tags?.length]);

  return (
    <StyledCard>
      {isFetching ? (
        <StyledLaoder />
      ) : (
        <RefreshBtn
          onClick={onResetData}
          data-action={activityList["relations-refresh"]}
        >
          <RefreshIcon />
        </RefreshBtn>
      )}
      {selectedPost && (
        <StyledPostLink>
          {t("relations-selected_post")}
          <a target="_blank" href={selectedPost.properties.link}>
            {selectedPost.properties.link}
          </a>
        </StyledPostLink>
      )}
      <ChartLegendComponent items={tagsColors} />
      <GraphWrapper>
        <ErrorBoundary
          fallback={<StyledError>{t("relations-graph_error")}</StyledError>}
        >
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network: any) => {
              drawVisMinimap(network);
              network.moveTo({
                scale: 0.031, // Zooms out; 1 is no zoom
              });
            }}
          />
        </ErrorBoundary>
        <div id="minimapWrapper" className="minimapWrapperIdle">
          <img id="minimapImage" className="minimapImage" />
          <div id="minimapRadar" className="minimapRadar"></div>
        </div>
      </GraphWrapper>
    </StyledCard>
  );
});

export default GraphView;
