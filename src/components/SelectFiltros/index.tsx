import React from 'react';
import { ReactElement } from 'react';
import Icone from './down-arrow.svg';

interface SelectFiltrosProps {
    children: ReactElement[]
}

export default function SelectFiltros({children}: SelectFiltrosProps ) {
  return (
    <select className="selectFiltros" style={{backgroundImage: `url(${Icone})`}}>
        {children}        
    </select>
  )
}
