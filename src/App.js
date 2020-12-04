import React, { useState } from "react";
import "./style.css";
import { Card, Col, Button } from "reactstrap";

export default function App() {
  //variaveis gerais
  const [dados, setDados] = useState([]);
  const [pesos, setPesos] = useState([]);
  const [mediana, setMediana] = useState(0);
  const [moda, setModa] = useState("");
  const [numero, setNumero] = useState(0);
  const [resultadoMedia, setResultadomedia] = useState(0);

  //variaveis de dispersão
  const [amplitude, setAmplitude] = useState(0);
  const [dp, setDp] = useState(0);
  const [variancia, setVariancia] = useState(0);
  const [cv, setCv] = useState(0);

  //controle Tela
  const [tela, setTela] = useState(0);

  const telamediaA = () => {
    setTela(0);
    console.log("oi");
  };
  const telamediaP = () => {
    setTela(1);
  };

  const mediaAritmetica = () => {
    let soma = 0;
    dados.map(item => {
      soma = soma + item.value;
    });
    setResultadomedia(soma / numero);
  };
  const mediaPonderada = () => {
    let somaValor = 0;
    let somaPeso = 0;
    dados.map(item => {
      somaValor = somaValor + item.value;
    });
    pesos.map(item => {
      somaPeso = somaPeso + item.value;
    });
    setResultadomedia(somaValor / somaPeso);
  };

  const calculoMediana = () => {
    if (n % 2 == 1) {
    } else if (n % 2 == 0) {
    }
  };

  const calculoModa = () => {
    dados.map();
  };

  const desvioMedio = () => {
    let media;
    let n;
    let soma_desvios;
  };

  const varianciaAmostral = () => {
    let n = this.numero - 1;
    let media;
    let somaValores;
    //setar resultado (somaValores / n)
  };

  const varianciaPopulacional = () => {
    let n = this.numero;
    let media;
    let somaValores;
    //setar resultado (somaValores / n)
  };

  const desvioPadrao = () => {
    //setando resultado (raiz da variancia)
  };

  const coeficienteVariacao = () => {
    let desvio = this.dp;
    let media = this.resultadoMedia;
    //setando resultado ((desvio/media)*100)
    console.log("te amo");
  };

  return (
    <div className="container align-self-center" id="container-home">
      <Col style={{ padding: 10 }}>
        <Card>
          <h1>MENU</h1>
          <br />

          <div id="buttons">
            <Button color="primary" OnClick={telamediaA}>
              Media Aritmetica
            </Button>{" "}
            <Button color="primary" OnClick={telamediaP}>
              Media Ponderada
            </Button>{" "}
            <Button color="primary">Media Aritmetica</Button>{" "}
            <Button color="primary">Media Aritmetica</Button>{" "}
          </div>
        </Card>
      </Col>
      {tela === 1 && (
        <container class="container-fluid">
          <p>1</p>
        </container>
      )}
      {tela === 1 && (
        <container class="container-fluid">
          <p>2</p>
        </container>
      )}
    </div>
  );
}
