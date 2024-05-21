import React, { useCallback, useMemo, useState } from "react"
import { PDFReportCountries } from "../../store/sentimentor"
import styled from "styled-components"



const StyledWrapper = styled.div`
`

const StyledHeader = styled.div`
    background-color: #20a4ff;
    color: #fff;
    padding: 16px 12px;
    box-sizing: border-box;
`

const StyledList = styled.div`
    padding: 20px 20px 40px;
`

const StyledCountry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    font-size: 13px;
    span:first-child {
        min-width: 35%;
    }
`

const StyledBar = styled.div<{ percent: number }>`
    width: 37%;
    height: 14px;
    border-radius: 3px;
    background-color: #4285f4;
    padding: 1px 2px;
    box-sizing: border-box;
    span {
        display: block;
        border-radius: 3px;
        height: 100%;
        width: ${({ percent }) => `${percent}%`};
        background-color: #fff;
    }
`

const StyledTotal = styled.div`
    display: flex;
    justify-content: space-between;
    padding-inline-start: 20px;
    padding-inline-end: 50px;
    border-top: 1px solid #000;
    font-size: 14px;
`

const StyledSort = styled.p`
    margin: 0;
    font-size: 13px;
    margin-bottom: 28px;
    cursor: pointer;
    span {
        color: #4285f4;
    }
`


interface IProps {
    data: PDFReportCountries
    view_by: "%" | "#"
}

const PdfReportCountriesComponent = React.memo(({ data, view_by }: IProps) => {
    const [sort, setSort] = useState<"country" | "value">("country")


    const totalValues = useMemo(() => {
        const values = Object.values(data).map(d => d.num_posts)
        return values.reduce((f, p) => f + p, 0)
    }, [data])


    const dataSorted = useMemo(() => {
        const list = Object.keys(data).map(c => {
            const value = data[c].num_posts
            const percent = (value / (totalValues / 100))
            return {
                country: c,
                value,
                percent
            }
        })
        if (sort === "country") {
            return [...list].sort((c, p) => {
                if (c.country < c.country) {
                    return -1;
                }
                if (c.country > c.country) {
                    return 1;
                }
                return 0;
            })
        }
        return [...list].sort((c, p) => c.value - p.value)
    }, [data, totalValues, sort])


    const handleChangeSorting = useCallback(() => {
        setSort(p => p === "country" ? "value" : "country")
    }, [])

    return <StyledWrapper>
        <StyledHeader>Country Types</StyledHeader>
        <StyledList>
            <StyledSort onClick={handleChangeSorting}>Sort by: {sort === "country" ? <span>Country</span> : <span>Value</span>}</StyledSort>
            {dataSorted.map(c => {
                return <StyledCountry>
                    <span>{c.country}</span>
                    {view_by === "#" && <span>{c.value}</span>}
                    {view_by === "%" && <span>({c.percent.toFixed(1)}%)</span>}
                    <StyledBar percent={c.percent}><span></span></StyledBar>
                </StyledCountry>
            })}
        </StyledList>
        <StyledTotal>
            <span>Total</span>
            {view_by === "#" && <span>{totalValues}</span>}
            {view_by === "%" && <span>100%</span>}
        </StyledTotal>
    </StyledWrapper>
})

export default PdfReportCountriesComponent