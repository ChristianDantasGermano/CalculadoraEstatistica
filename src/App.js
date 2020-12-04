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


  //CÁLCULO DAS MEDIDAS DE TENDÊNCIA CENTRAL

  //1- Média Aritmética

  const mediaAritmetica = () => {
    //cria uma variável para somar os valores dos dados do input
    let soma = 0;
    //mapeamento dos dados para atribuir a soma
    dados.map(item => {
      soma = soma + item.value;
    });
    //setando o resultado com a fórmula da média
    setResultadomedia(soma / numero);
  };

  //2- Média Ponderada

  const mediaPonderada = () => {
    //cria 2 variáveis para somar valores e pesos dos dados
    let somaValor = 0;
    let somaPeso = 0;
    //mapeamento dos dados para as somas
    dados.map(item => {
      somaValor = somaValor + item.value;
    });
    pesos.map(item => {
      somaPeso = somaPeso + item.value;
    });
    //realização do cáuclulo e colocando o resultado na variável
    setResultadomedia(somaValor / somaPeso);
  };

  //3- Mediana

  const calculoMediana = () => {
    if (n % 2 == 1) {
      let index = (n + 1) / 2;
      setMediana(dados[index]);
    } else if (n % 2 == 0) {
      let index = (n + 1) / 2;
      let valor1 = dados[index];
      let valor2 = dados[index + 1];
      let resultado = (valor1 + valor2) / 2;
      setMediana(resultado);
    }
  };

  //4- Moda

  const toArray = obj => Object.keys(obj).map(key => obj[key]);

  const summarize = dados => toArray(dados.reduce(summarizeFn, {}));
  const summarizeFn = function(summary, num) {
    summary[num] = summary[num]
      ? { num, count: summary[num].count + 1 }
      : { num, count: 1 };
    return summary;
  };
  //achar o maior valor entre as frequencias
  const findMode = summary => summary.reduce(findModeFn, 0);
  const findModeFn = (max, { count }) => (count > max ? count : max);
  //cria um array em que só são adicionados os valores da contagem da moda
  const filterMode = (summary, mode) =>
    summary.filter(({ count }) => count == mode);

  const getValues = items => items.map(({ num }) => num);

  const calculoModa = function(dados) {
    const summary = summarize(dados);
    const mode = findMode(summary);
    const modeItems = filterMode(summary, mode);
    return modeItems.length == summary.length ? [] : getValues(modeItems);
  };

  //CALCULO DO DESVIO MÉDIO

  const desvioMedio = () => {
    let media;
    let n;
    let soma_desvios;
  };

  //CÁLCULO DAS DISPERSÕES

  //1- Variância Amostral

  const varianciaAmostral = () => {
    let n = this.numero - 1;
    let media;
    let somaValores;
    //setar resultado (somaValores / n)
  };

  //2- Variância Populacional

  const varianciaPopulacional = () => {
    let n = this.numero;
    let media;
    let somaValores;
    //setar resultado (somaValores / n)
  };

  //3- Desvio Padrão

  const desvioPadrao = () => {
    //setando resultado (raiz da variancia)
  };

  //4- Coeficiente de Variação

  const coeficienteVariacao = () => {
    let desvio = this.dp;
    let media = this.resultadoMedia;
    //setando resultado ((desvio/media)*100)
    console.log("te amo");
  };


  //RETORNO HTML

  return (
    <div className="container align-self-center" id="container-home">
      <Col style={{ padding: 10 }}>
        <Card>
          <h1>MENU</h1>
          <br />

          <div id="buttons">
            <Button outline color="primary">
              TENDÊNCIA CENTRAL
            </Button>

            <Button outline color="danger">
              DISPERSÃO
            </Button>

            <Button outline color="success">
              REGRESSÃO
            </Button>

            <Button outline color="warning">
              PROBABILIDADE
            </Button>
          </div>
        </Card>
      </Col>
    </div>
  );
}
