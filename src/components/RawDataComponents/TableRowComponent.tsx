import React from "react"
import { ITableColumn, useRawDataState } from "../../store/rawData";
import styled from "styled-components";
import { convert972to0 } from "../../utils/convert972to0";
import TableStatusComponent from "./TableStatusComponent";

const PhoneLink = styled.a`
  text-decoration: none;
  color: inherit;
`;



interface IProps {
    rows: ITableColumn[]
}

const TableRowComponent = React.memo(({ rows }: IProps) => {
    const { tableColumns } = useRawDataState();


    return <>
        {rows.map((row, index) => {
            return <tr key={index}>
                {tableColumns.map((column) => {
                    const cell = row[column.slug];
                    const isPhone =
                        column.slug === "phone" ||
                        column.slug === "mobile_phone";

                    if (isPhone) {
                        return (
                            <td key={column.slug}>
                                <PhoneLink
                                    href={`tel:${convert972to0(cell)}`}
                                >
                                    {cell}
                                </PhoneLink>
                            </td>
                        );
                    }


                    if (column.slug === "status") {
                        return <TableStatusComponent row={row} key={column.slug} />
                    }

                    if (column.slug === "mobilizer") {
                        return < td key={column.slug} > {row.mobilizer_full_name}</td>
                    }

                    if (column.slug === "referal") {
                        return < td key={column.slug} > {row.referal_full_name}</td>
                    }

                    return <td key={column.slug}>{cell}</td>
                })}
            </tr >
        })}
    </>
})

export default TableRowComponent