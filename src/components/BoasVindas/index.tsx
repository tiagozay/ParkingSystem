import React, { useState } from 'react';
import MensagemSucesso from '../MensagemSucesso';
import LoginService from '../../services/LoginService';

export default function BoasVindas() {
    return (
        <>
            <MensagemSucesso mensagem={'Seja bem vindo, '+LoginService.usuarioLogado?.nome+'!'} />
        </>
    )
}
