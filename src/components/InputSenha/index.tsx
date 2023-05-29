import React, {useState} from 'react';
import "./InputSenha.css";

interface InputSenhaProps {
    className?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}

export default function InputSenha({ className, onChange, required, value = '' }: InputSenhaProps) {

    const [tipoBotao, setTipoBotao] = useState("visibility");
    const [tipoInput, setTipoInput] = useState("password");

    function trocarTipo()
    {
        if(tipoBotao === 'visibility'){
            setTipoBotao('visibility_off');
            setTipoInput('text');
        }else{
            setTipoBotao('visibility');
            setTipoInput('password');
        }   
    }

    return (
        <div id='containerInputSenha'>
            <input
                type={tipoInput}
                className={className}
                onChange={onChange}
                required={required}
                value={value}
                id='inputSenha'
            />
            <button type='button' className='material-icons' id='btnExibirSenha' onClick={trocarTipo}>{tipoBotao}</button>
        </div>
    );
}
