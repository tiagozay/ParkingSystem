import React, { useState } from 'react';
import './MensagemSucesso.css';

export default function MensagemSucesso({mensagem}: {mensagem: string}) {
    const [mensagemAberta, setMensagemAberta] = useState(true);

    return (
        <>
            {mensagemAberta && (
                <div id="mensagemSucesso" className="mensagem">
                <div id="conteudoMensagem">
                    <i className="material-icons">mood</i>
                    <span>{mensagem}</span>
                </div>
                <button id="btnFecharMensagem" className="material-icons" onClick={() => setMensagemAberta(false)}>close</button>
            </div>
            )}
        </>
    )
}
