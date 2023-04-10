import React, { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface BtnVoltarProps {
    children: ReactNode,
    className?: string,
}

export default function BtnVoltar({children, className} : BtnVoltarProps) {
    const navigate = useNavigate();

    return (
        <button type='button' id="btnVoltar" className={className} onClick={() => navigate(-1)}>
            {children}
        </button>
    )
}
