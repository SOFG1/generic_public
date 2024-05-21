import React, {memo, useCallback, useState} from "react";
import styled from "styled-components";
import {InputDate} from "../../UI/Input";
import {DropdownSearchFetch, DropdownWithSearch} from "../../UI/Dropdown";
import {InputValueType} from "../../types";
import {handle} from "../../api";
import {CallCenterHistory} from "../../api/callCenterHistory";
import {useUserState} from "../../store/user";
import {useCallCenterHistoryState} from "../../store/callCenterHistory";

interface IProps{
    filterParams:any,
    setFilterParams:any,
}

const PerfomanceSmsOutgoingReport = memo(({filterParams, setFilterParams}:IProps)=>{
    const { token } = useUserState();
    const { filters } = useCallCenterHistoryState();

    const [fetchDropdownOptions, setFetchDropdownOptions] = useState<{
        [key: string]: Array<{ item: string; value: string }>;
    }>({});

    const fetchOptions = useCallback(
        async (slug: string, val: string) => {
            if (token && val.length > 3) {
                const [dataRes, dataErr]: any = await handle(
                    CallCenterHistory.getFiltersData(token, "sms", "outgoing", slug, val)
                );
                if (dataRes) {
                    setFetchDropdownOptions((prev) => ({
                        ...prev,
                        [slug]: dataRes.map((o: string) => ({ item: o, value: o })),
                    }));
                }
                if (dataErr) {
                    console.log(dataErr);
                }
            }
            if (val.length <= 3) {
                setFetchDropdownOptions((prev) => ({ ...prev, [slug]: [] }));
            }
        },
        [token]
    );

    return (
        <Container>
            {filters?.sms?.outgoing &&
                Object.keys(filters.sms.outgoing).map((slug) => {
                    const filter = filters.sms.outgoing[slug];
                    if (filter?.type === "date_range") {
                        return (
                            <InputDate
                                key={slug}
                                label={filter.name}
                                placeholder={filter.name}
                                startDate={
                                    Array.isArray(filterParams?.date)
                                        ? filterParams?.date[0]
                                        : null
                                }
                                expirationDate={
                                    Array.isArray(filterParams?.date)
                                        ? filterParams?.date[1]
                                        : null
                                }
                                onChange={(dates: Date[]) => {
                                    setFilterParams((prev: any) => ({
                                        ...prev,
                                        [slug]: dates,
                                    }));
                                }}
                            />
                        );
                    }
                    if (!filter.fetch) {
                        return (
                            <DropdownWithSearch
                                key={slug}
                                value={filterParams[slug] || ""}
                                placeholder={filter.name}
                                onSelect={(value) =>
                                    setFilterParams((prev:any) => ({ ...prev, [slug]: value }))
                                }
                                label={filter.name}
                                isMultiSelect={true}
                                options={
                                    filter.options
                                        ? filter.options.map((o) => ({ item: o, value: o }))
                                        : []
                                }
                            />
                        );
                    }
                    if (filter.fetch) {
                        return (
                            <DropdownSearchFetch
                                key={slug}
                                value={filterParams[slug] || ""}
                                placeholder={filter.name}
                                onSelect={(value) =>
                                    setFilterParams((prev:any) => ({ ...prev, [slug]: value }))
                                }
                                onSearch={(value) => fetchOptions(slug, value)}
                                label={filter.name}
                                isSmall={true}
                                isMultiSelect={true}
                                options={fetchDropdownOptions[slug] || []}
                            />
                        );
                    }
                })}
        </Container>
    )
})

export default PerfomanceSmsOutgoingReport;

const Container = styled.div``
