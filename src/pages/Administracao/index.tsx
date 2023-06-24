import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginService from '../../services/LoginService'

export default function Administracao() {
    if(LoginService.usuarioLogado?.nivelDeAcesso !== "Administrador"){
        return <></>;
    }

    return (
        <>
            <Outlet />
        </>
    )
}
