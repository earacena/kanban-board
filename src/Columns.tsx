import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Static as RtStatic } from 'runtypes';
import { Columns as ColumnArray } from './column.types';
import Column from './Column';
import columnsStyle from './columns.styles';

interface ColumnsProps {
  columns: RtStatic<typeof ColumnArray>;
}

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
