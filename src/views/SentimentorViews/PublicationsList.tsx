import React, { useMemo, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { EmailEditorComponent } from "../../components/SentimentorComponents";
import PublicationComponent from "../../components/SentimentorComponents/PublicationComponent";
import { useSentimentorActions } from "../../store/sentimentor";
import {
  sentimentorPublicationsFetchingSelector,
  sentimentorPublicationsFilterSelector,
  sentimentorPublicationsFiltersSelector,
} from "../../store/sentimentor/selectors";
import {
  PublicationsCategory,
  PublicationType,
} from "../../store/sentimentor/types";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";
import { Modal } from "../../UI/Modal";
import { Loader } from "../../UI/Spinners";
import { useTranslation } from "react-i18next";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card) <{ fullWidth: boolean }>`
  margin-bottom: 0;
  ${({ fullWidth }) => fullWidth && 'grid-column: span 2;'}
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.85vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 48px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  width: 12.45vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 156px;
  }
`;

const StyledTitle = styled(Title)`
  align-self: stretch;
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const PublicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 30.16vw;
  overflow-y: auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 378px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 10.42vw;
  width: 10.42vw;
  margin: 50px auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 131px;
    width: 131px;
  }
`;

const StyledNoData = styled.p`
  margin-top: 2.08vw;
  font-size: 1.04vw;
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 26px;
    font-size: 13px;
  }
`;

interface IProps {
  publications: PublicationType[];
  title: string;
  category: PublicationsCategory;
  showFilter: boolean;
  fullWidth: boolean
}

const PublicationsList = React.memo(
  ({ publications, title, category, showFilter, fullWidth }: IProps) => {
    const { t } = useTranslation();
    const publicationsFilters = useSelector(
      sentimentorPublicationsFiltersSelector
    );
    //@ts-ignore
    const { [category]: isFetching } = useSelector(
      sentimentorPublicationsFetchingSelector
    );
    const appliedFilters = useSelector(sentimentorPublicationsFilterSelector);
    const { onSetPublicationsFilter } = useSentimentorActions();
    const [openedPublication, setOpenedPublication] =
      useState<PublicationType | null>(null);
    const [sliceLength, setSliceLength] = useState<number>(5);

    const onShowMore = () => {
      setSliceLength((p) => p + 10);
    };

    const hasMore = useMemo(() => {
      return sliceLength < publications.length;
    }, [sliceLength, publications]);

    const publicationsSlice = useMemo(() => {
      return publications.slice(0, sliceLength);
    }, [publications, sliceLength]);

    const filterOptions = useMemo(() => {
      const opts = publicationsFilters.map((f) => ({ item: f, value: f }));
      if (!appliedFilters[category]) return opts; //without empty option if not selected
      return [{ item: "", value: "" }, ...opts];
    }, [publicationsFilters, appliedFilters, category]);

    const handleApplyFilter = useCallback(
      (filter: string) => {
        onSetPublicationsFilter(category, filter);
      },
      [category]
    );

    return (
      <>
        <Modal
          show={!!openedPublication}
          onClose={() => setOpenedPublication(null)}
        >
          <EmailEditorComponent
            publication={openedPublication as PublicationType}
            onSelectPublication={setOpenedPublication}
            publications={publications}
          />
        </Modal>
        <StyledCard fullWidth={fullWidth}>
          <StyledHeader>
            <StyledTitle>{title}</StyledTitle>
            {showFilter && (
              <StyledDropdown
                label={t("publications_label1")}
                placeholder={t("publications_label1")}
                value={appliedFilters[category]}
                onSelect={(v) => handleApplyFilter(v)}
                options={filterOptions}
              />
            )}
          </StyledHeader>
          {isFetching && <StyledLoader />}
          {publications.length === 0 && !isFetching && <StyledNoData>{t("ranking_no-data")}</StyledNoData>}
          {!isFetching && publications.length !== 0 && <PublicationsWrapper id={title}>
            <InfiniteScroll
              dataLength={publicationsSlice.length}
              next={onShowMore}
              hasMore={hasMore}
              loader={<></>}
              scrollableTarget={title}
              scrollThreshold={0.98}
            >
              {publicationsSlice.map((publication, index) => {
                return (
                  <PublicationComponent
                    key={index}
                    is_news={category === "googlePubs"}
                    publication={publication}
                    onEmail={() => setOpenedPublication(publication)}
                  />
                );
              })}
            </InfiniteScroll>
          </PublicationsWrapper>}
        </StyledCard>
      </>
    );
  }
);

export default withErrorBoundaryHOC(PublicationsList);
