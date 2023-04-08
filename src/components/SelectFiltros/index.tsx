import React from 'react';
import { ReactElement } from 'react';
import Icone from './down-arrow.svg';
import {ChangeEventHandler} from 'react';

interface SelectFiltrosProps {
    children: ReactElement[],
    onChange?: ChangeEventHandler<HTMLSelectElement>
    value: string
}

export default function SelectFiltros({children, value = 'todos', onChange = () => {}}: SelectFiltrosProps ) {
  return (
    <select className="selectFiltros" value={value} onChange={onChange} style={{backgroundImage: `url(${Icone})`}}>
        {children}        
    </select>
  )
}
