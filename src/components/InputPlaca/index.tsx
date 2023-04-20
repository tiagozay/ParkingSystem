import React, { useState } from 'react';

interface InputPlacaProps {
    className?: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPlaca = ({className, onChange, value = ''}: InputPlacaProps) => {
  const [placa, setPlaca] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    //Transorma os caracteres em letras maiúsculas e remove caracteres que fogem do padrão das placas 
    let placa = value.toUpperCase().replace(/[^A-Za-z0-9]/g, '');

    //Verifica se o quarto digito já foi preenchido e se ele não é uma letra, se ele não for uma letra, indica que a placa segue o padrão antigo e adiciona um "-"
    if( placa[4] && !isNaN(Number(placa[4]))){
        placa = placa.replace(/(\w{3})(\w*)/, '$1-$2');
    }

    //Remove o "-" e verifica se o valor digitado no input passou do numero de digitos que uma placa (do padrão antigo o mercosul) já atingiu seu tamanho, se atingiu, usa um Early Return e não define o valor no state, fazendo uma limitação na quantidade de caracteres 
    if(placa.replace('-', '').length > 7){
        return;
    }

    setPlaca(placa);

    if(onChange){
        onChange(e);
    }

  }

  return (
    <input
      type="text"
      value={placa}
      onChange={handleChange}
      className={className}
    />
  );
}

export default InputPlaca;
