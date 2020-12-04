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
  const [varianciaA, setVarianciaA] = useState(0);
  const [varianciaP, setVarianciaP] = useState(0);
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
    //setando as variaveis para o cálculo
    let media = resultadoMedia
    let num = numero
    let soma_desvios = 0
    //mapeando os dados
    dados.map(item =>{
      //criando variavel auxiliar para o calculo dos desvios
      let auxiliar = 0
      //calculando o desvio com a fórmula
      auxiliar = auxiliar + (item.value - media)
      //caso o valor dê negativo, é multiplicado para
      // virar positivo para a soma
      if(auxiliar < 0){
        auxiliar = auxiliar * (-1)
      }
      //adicionando os valores na variavel de somas
      soma_desvios = soma_desvios + auxiliar
    })
    //cálculos finais e colocando na variável definitiva o resultado
    let r = soma_desvios/num
    setDesvioMedio(r);
  };

  //CÁLCULO DAS DISPERSÕES

  //1- Variância Amostral

  const varianciaAmostral = () => {
    //criando variaveis locais para o calculo
    let n = this.numero - 1;
    let media = resultadoMedia
    let somaValores = 0;
    //mapeamento dos dados
    dados.map(item => {
      //calculando os valores pela fórmula de variãncia e somando na variavel
      let calculo = (item.value - media)**2
      somaValores = somaValores + calculo
    })
    //cálculos finais e setando o resultado na variável definitiva
    let r = somaValores/n
    setVarianciaA(r);

  };

  //2- Variância Populacional

  const varianciaPopulacional = () => {
    //criando as variaveis locais para o calculo
    let n = this.numero;
    let media = resultadoMedia
    let somaValores = 0;
    //mapeando os dados
    dados.map(item => {
      //calculando os valores com a fórula e adicionando na variável
      let calculo = (item.value - media)**2
      somaValores = somaValores + calculo
    })
    //cálculos finais e adicionando na variável final
    let r = somaValores/n
    setVarianciaP(r);
  };

  //3- Desvio Padrão

  const desvioPadrao = () => {
    //pegando o valor da variancia
    let varianc = varianciaA
    //calculando a raiz quadrada da variancia
    let r = sqrt(varianc)
    //setando na variável de desvio padrão
    setDp(r);
  };

  //4- Coeficiente de Variação

  const coeficienteVariacao = () => {
    //pegando os valores de desvio e média para calculo
    let desvio = this.dp;
    let media = this.resultadoMedia;
    //calculando o coeficiente
    let r = (desvio/media) * 100
    //setando a variável final
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
