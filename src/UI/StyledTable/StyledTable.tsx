import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  border: 1px solid transparent;
  &::-webkit-scrollbar {
    height: 16px;
    border: 1px solid #000;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  transition: 200ms linear;

  th {
    font-size: 12px;
    padding: 12px 24px;
    text-align: center;
    color:rgba(131, 128, 128, 1);
  }

  tbody tr:hover {
    background-color: rgba(131, 128, 128, 0.2);
    color: #000;
  }

  td {
    position: relative;
    font-size: 10px;
    padding: 6px 24px;
    text-align: center;
    border-top:1px solid rgba(220, 220, 220, 1);
  }

  th,
  td {
    white-space: nowrap;
  }

  tfoot {
    font-weight: 700;
  }

  tfoot td {
    padding: 4px 20px;
    font-size: 15px;
  }

  @media screen and (max-width: 1000px) {
    th {
      padding: 12px 4px;
    }
    td {
      padding: 6px 4px;
    }
  }
`;

export const StyledTableActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledScrollBtn = styled.button`
  margin-top: 16px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: transparent;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 100ms linear;
  svg {
    stroke: #000;
  }
  &:hover {
    background-color: #000;
    svg {
      stroke: #fff;
    }
  }
`;

export const StyledTableAction = styled.td`
  position: relative;
  text-align: center;
  padding: 8px 2px !important;
  border: 1px solid #000;
  min-width: 31px;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #cccccc;
  }
  span {
    inset-inline-start: 0;
    pointer-events: none;
    color: #000;
    background-color: #fff;
    opacity: 0;
    position: absolute;
    white-space: nowrap;
    bottom: 100%;
    transition: 200ms;
  }
  &:hover span {
    opacity: 1;
    transform: translateY(-50%);
  }
`;


export const StyledIdTD = styled.td<{ color?: string }>`
text-align: center;
background-color: ${({ color }) => color || "#ffffff"};
color: #000;
font-size: 14px;
font-weight: 500;
`;
