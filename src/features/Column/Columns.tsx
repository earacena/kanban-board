import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import type { ColumnArrayType } from './types/column.types';
import Column from './Column';
import columnsStyle from './styles/columns.styles';

type ColumnsProps = {
  columns: ColumnArrayType;
};

function Columns({ columns }: ColumnsProps) {
  return (
    <ul css={columnsStyle}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} label={column.label} />
      ))}
    </ul>
  );
}

export default Columns;
