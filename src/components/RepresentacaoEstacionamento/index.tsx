import React from 'react';
import './RepresentacaoEstacionamento.css';

export default function RepresentacaoEstacionamento() {
    return (
        <section id="representacaoEstacionamento">
            <div id="representacaoEstacionamento__divTitulo">
                <h3>Estacionamento</h3>
            </div>

            <p id="balaoPlacaVeiculo">APN-2018</p>

            <div id="representacaoEstacionamento__estacionamento">
                <div id="ruaVerticalEsquerda">
                    <i className="material-icons iconeSinalizacaoRua_pCima">arrow_upward</i>
                    <i className="material-icons iconeSinalizacaoRua_pCima">arrow_upward</i>
                </div>
                <div id="ultimaLinhaDeVagas">
                    <div className="vaga vagaSemBordaEsquerda" id="vaga_c12" data-rowStart="1" data-columnStart="1"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>12</span></div>
                    <div className="vaga" id="vaga_c13" data-rowStart="1" data-columnStart="2"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>13</span> </div>
                    <div className="vaga" id="vaga_c15" data-rowStart="1" data-columnStart="3"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>15</span></div>
                    <div className="vaga" id="vaga_c17" data-rowStart="1" data-columnStart="4"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>17</span></div>
                    <div className="vaga" id="vaga_c19" data-rowStart="1" data-columnStart="5"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>19</span></div>
                    <div className="vaga" id="vaga_c21" data-rowStart="1" data-columnStart="6"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>21</span></div>
                    <div className="vaga" id="vaga_c23" data-rowStart="1" data-columnStart="7"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>23</span></div>
                    <div className="vaga" id="vaga_c25" data-rowStart="1" data-columnStart="8"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>25</span></div>
                    <div className="vaga" id="vaga_c27" data-rowStart="1" data-columnStart="9"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>27</span></div>
                    <div className="vaga" id="vaga_c29" data-rowStart="1" data-columnStart="10"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>29</span></div>
                    <div className="vaga" id="vaga_c31" data-rowStart="1" data-columnStart="11"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>31</span></div>
                    <div className="vaga" id="vaga_c33" data-rowStart="1" data-columnStart="12"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>33</span></div>
                    <div className="vaga" id="vaga_c35" data-rowStart="1" data-columnStart="13"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>35</span></div>
                    <div className="vaga vagaSemBordaDireita" id="vaga_c36" data-rowStart="1" data-columnStart="14" ><span className="spanNumeroVaga" ><span className="spanLetraVaga">c</span>36</span></div>
                </div>
                <div id="ultimaRuaHorizontal">
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_forward</i>
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_forward</i>
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_forward</i>
                </div>
                <div id="penultimaLinhaDeVagas">
                    <div className="vaga" id="vaga_c14" data-rowStart="3" data-columnStart="2">
                        <span className="spanNumeroVaga">
                            <span className="spanLetraVaga">c</span>14
                        </span>
                    </div>
                    <div className="vaga" id="vaga_c16" data-rowStart="3" data-columnStart="3"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>16</span></div>
                    <div className="vaga" id="vaga_c18" data-rowStart="3" data-columnStart="4"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>18 </span></div>
                    <div className="vaga" id="vaga_c20" data-rowStart="3" data-columnStart="5"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>20 </span></div>
                    <div className="vaga" id="vaga_c22" data-rowStart="3" data-columnStart="6"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>22 </span></div>
                    <div className="vaga" id="vaga_c24" data-rowStart="3" data-columnStart="7"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>24 </span></div>
                    <div className="vaga" id="vaga_c26" data-rowStart="3" data-columnStart="8"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>26 </span></div>
                    <div className="vaga" id="vaga_c28" data-rowStart="3" data-columnStart="9"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>28 </span></div>
                    <div className="vaga" id="vaga_c30" data-rowStart="3" data-columnStart="10"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>30 </span></div>
                    <div className="vaga" id="vaga_c32" data-rowStart="3" data-columnStart="11"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>32 </span></div>
                    <div className="vaga" id="vaga_c34" data-rowStart="3" data-columnStart="12"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>34 </span></div>
                </div>
                <div id="primeiraLinhaDeVagas">
                    <div className="vaga" id="vaga_c11" data-rowStart="4" data-columnStart="2"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>11</span> </div>
                    <div className="vaga" id="vaga_c10" data-rowStart="4" data-columnStart="3"><span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>10</span></div>
                    <div className="vaga" id="vaga_c9" data-rowStart="4" data-columnStart="4"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>9 </span></div>
                    <div className="vaga" id="vaga_c8" data-rowStart="4" data-columnStart="5"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>8 </span></div>
                    <div className="vaga" id="vaga_c7" data-rowStart="4" data-columnStart="6"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>7 </span></div>
                    <div className="vaga" id="vaga_c6" data-rowStart="4" data-columnStart="7"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>6 </span></div>
                    <div className="vaga" id="vaga_c5" data-rowStart="4" data-columnStart="8"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>5 </span></div>
                    <div className="vaga" id="vaga_c4" data-rowStart="4" data-columnStart="9"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>4 </span></div>
                    <div className="vaga" id="vaga_c3" data-rowStart="4" data-columnStart="10"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>3 </span></div>
                    <div className="vaga" id="vaga_c2" data-rowStart="4" data-columnStart="11"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>2 </span></div>
                    <div className="vaga" id="vaga_c1" data-rowStart="4" data-columnStart="12"> <span className="spanNumeroVaga"><span className="spanLetraVaga">c</span>1 </span></div>
                </div>
                <div id="primeiraRuaHorizontal">
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_back</i>
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_back</i>
                    <i className="material-icons iconeSinalizacaoRua_esquerda">arrow_back</i>
                </div>
                <div id="ruaVerticalSaida">
                    <i className="material-icons iconeSinalizacaoRua_pCima">arrow_downward</i>
                    <i className="material-icons iconeSinalizacaoRua_pCima">arrow_downward</i>
                </div>
                <div id="ruaVerticalEntrada">
                    <i className="material-icons iconeSinalizacaoRua_pCima">arrow_upward</i>
                </div>
                <div id="linhaVagasDasMotos">
                    <div className="vaga" id="vaga15"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>26</span></div>
                    <div className="vaga" id="vaga15"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>25</span></div>
                    <div className="vaga" id="vaga17"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>24 </span></div>
                    <div className="vaga" id="vaga19"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>23 </span></div>
                    <div className="vaga" id="vaga21"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>22 </span></div>
                    <div className="vaga" id="vaga23"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>21 </span></div>
                    <div className="vaga" id="vaga25"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>20 </span></div>
                    <div className="vaga" id="vaga27"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>19 </span></div>
                    <div className="vaga" id="vaga29"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>18 </span></div>
                    <div className="vaga" id="vaga31"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>17 </span></div>
                    <div className="vaga" id="vaga33"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>16 </span></div>
                    <div className="vaga" id="vaga13"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>15 </span></div>
                    <div className="vaga" id="vaga15"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>14</span></div>
                    <div className="vaga" id="vaga17"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>13 </span></div>
                    <div className="vaga" id="vaga19"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>12 </span></div>
                    <div className="vaga" id="vaga21"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>11 </span></div>
                    <div className="vaga" id="vaga23"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>10 </span></div>
                    <div className="vaga" id="vaga25"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>9 </span></div>
                    <div className="vaga" id="vaga27"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>8 </span></div>
                    <div className="vaga" id="vaga29"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>7 </span></div>
                    <div className="vaga" id="vaga31"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>6 </span></div>
                    <div className="vaga" id="vaga33"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>5 </span></div>
                    <div className="vaga" id="vaga29"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>4 </span></div>
                    <div className="vaga" id="vaga31"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>3 </span></div>
                    <div className="vaga" id="vaga33"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>2 </span></div>
                    <div className="vaga" id="vaga33"><span className="spanNumeroVaga spanVagaMoto"> <span className="spanLetraVaga">m</span>1 </span></div>
                </div>
            </div>

        </section>
    )
}
