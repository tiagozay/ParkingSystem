import React, { useState } from 'react';
import './MensagemErro.css';

export default function MensagemErro({mensagem}: {mensagem: string}) {
    const [mensagemAberta, setMensagemAberta] = useState(true);

    return (
        <>
            {mensagemAberta && (
                <div id="mensagemErro" className="mensagem">
                <div id="conteudoMensagem">
                    <i className="material-icons">mood_bad</i>
                    <span>{mensagem}</span>
                </div>
                <button id="btnFecharMensagem" className="material-icons" onClick={() => setMensagemAberta(false)}>close</button>
            </div>
            )}
        </>
    )
}
