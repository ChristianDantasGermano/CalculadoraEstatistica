import React, { useState } from "react";
import { sqrt } from 'mathjs'
import "./style.css";
import { Card, Col, Button } from "reactstrap";

export default function App() {
  //variaveis gerais
  const [dados, setDados] = useState([]);
  const [pesos, setPesos] = useState([]);
  const [mediana, setMediana] = useState(0);
  const [moda, setModa] = useState("");
  const [numero, setNumero] = useState(0);
  const[dm, setDesvioMedio] = useState(0);
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
    let r = soma/numero
    setResultadomedia(r);
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
    let r = somaValor/somaPeso
    setResultadomedia(r);
  };

  //3- Mediana

  const calculoMediana = () => {
    //verificação de condições de par ou ímpar do número de dados do input
    //para saber o valor ou valores centrais
    if (n % 2 == 1) {
      let index = (n + 1) / 2;
      //setando o valor central na variávekl
      setMediana(dados[index]);
    } else if (n % 2 == 0) {
      let index = (n + 1) / 2;
      let valor1 = dados[index];
      let valor2 = dados[index + 1];
      //pegando a média dos dois valores centrais e setando na variável
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
    let media = resultadoMedia
    let num = numero
    let soma_desvios = 0
    dados.map(item =>{
      let auxiliar = 0
      auxiliar = auxiliar + (item.value - media)
      if(auxiliar < 0){
        auxiliar = auxiliar * (-1)
      }
      soma_desvios = soma_desvios + auxiliar
    })
    let r = soma_desvios/num
    setDesvioMedio(r);
  };

  //CÁLCULO DAS DISPERSÕES

  //1- Variância Amostral

  const varianciaAmostral = () => {
    let n = this.numero - 1;
    let media = resultadoMedia
    let somaValores = 0;
    dados.map(item => {
      let calculo = (item.value - media)**2
      somaValores = somaValores + calculo
    })
    let r = somaValores/n
    setVariancia(r);

  };

  //2- Variância Populacional

  const varianciaPopulacional = () => {
    let n = this.numero;
    let media = resultadoMedia
    let somaValores = 0;
    dados.map(item => {
      let calculo = (item.value - media)**2
      somaValores = somaValores + calculo
    })
    let r = somaValores/n
    setVariancia(r);
  };

  //3- Desvio Padrão

  const desvioPadrao = () => {
    let varianc = variancia
    let r = sqrt(varianc)
    setDp(r);
  };

  //4- Coeficiente de Variação

  const coeficienteVariacao = () => {
    let desvio = this.dp;
    let media = this.resultadoMedia;
    let r = (desvio/media) * 100
    setCv(r);
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
