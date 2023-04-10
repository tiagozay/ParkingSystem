import React, { useState } from 'react';
import './BoasVindas.css';

export default function BoasVindas() {
    const [mensagemAberta, setMensagemAberta] = useState(true);

    return (
        <>
            {mensagemAberta && (
                <div id="mensagemDeBoasVindas" className="mensagem">
                    <div id="conteudoMensagem">
                        <i className="material-icons">mood</i>
                        <span>Seja bem vindo (a) Tiago!</span>
                    </div>
                    <button id="btnFecharMensagem" className="material-icons" onClick={() => setMensagemAberta(false)}>close</button>
                </div>
            )}
        </>
    )
}
