import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import sucessLogo from '../../assets/sucess.svg';


import './styles.css';

const SucessRegister = () => {
    function handleClickButton() {
        console.log('clicou');
    }

    return (
        <div id="page-sucess">
            <header>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <div id="div-sucess">
                <header>
                    <img src={sucessLogo} alt="Sucess"/>
                    <p>Cadastro com sucesso!</p>
                </header>
                <div>Obrigado por cadastrar seu ponto de coleta, utilize nosso App para verificar  
                    seu ponto no mapa da sua cidade.
                </div>
            </div>
            <button onClick={handleClickButton}/>
        </div>
    );
}

export default SucessRegister;