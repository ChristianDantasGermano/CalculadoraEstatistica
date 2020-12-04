import React, { useState, useEffect } from "react";
import "./style.css";
import { sqrt } from "mathjs";
import {
  Card,
  Col,
  Button,
  Row,
  FormGroup,
  Input,
  Container,
  Label
} from "reactstrap";

export default function App() {
  //variaveis gerais
  const [dados, setDados] = useState([]);
  const [pesos, setPesos] = useState([]);
  const [contMediaA, setContMediaA] = useState(0);
  //controle Tela
  const [tela, setTela] = useState(0);
  //Tela media Aritimetica
  const [valorMediaA, setValorMediaA] = useState([]);
  const [resultMediaA, setResultMediaA] = useState(0);
  //Tela media Ponderada
  const [valorMediaP, setValorMediaP] = useState([]);
  const [pesoMediaP, setPesoMediaP] = useState([]);
  const [resultMediaP, setResultMediaP] = useState(0);
  //Tela Mediana
  const [mediana, setMediana] = useState(0);
  //Tela Moda
  const [resultModa, setResultModa] = useState(0);
  //Tela Desvio Médio
  const [resultDesvioMedio, setResultDesvioMedio] = useState(0);
  //Tela Variância Amostral
  const [resultVarianciaAmostral, setResultVarianciaAmostral] = useState(0);
  //Tela Variância Populacional
  const [
    resultVarianciaPopulacional,
    setResultVarianciaPopulacional
  ] = useState(0);
  //Tela Desvio Padrão
  const [resultDesvioPadrao, setResultDesvioPadrao] = useState(0);
  //Tela Coeficiente de Variação
  const [resultCoeficienteVariacao, setResultCoeficienteVariacao] = useState(0);

  //Monitorar variaveis de controle
  useEffect(() => {
    console.log("mediana", mediana);
  }, [mediana]);

  useEffect(() => {
    console.log("ContmediaA", contMediaA);
  }, [contMediaA]);

  //Funções gerias da tela
  const telamediaA = () => {
    setTela(0);
  };
  const telamediaP = () => {
    setTela(1);
  };
  const telamediana = () => {
    setTela(2);
  };
  const telamoda = () => {
    setTela(3);
  };
  const telaDesvioMedio = () => {
    setTela(4);
  };
  const telaVariancaAmostral = () => {
    setTela(5);
  };
  const telaVariancaPopulacional = () => {
    setTela(6);
  };
  const telaDesvioPadrao = () => {
    setTela(7);
  };
  const telaCoeficienteVarianca = () => {
    setTela(8);
  };
  //Funções Tela média
  const addValorMediaA = e => {
    e.preventDefault();
    setValorMediaA([...valorMediaA, ""]);
  };

  const handleChangeMediaA = (e, index) => {
    valorMediaA[index] = e.target.value;
    setValorMediaA([...valorMediaA]);
  };

  //Funções Tela média Ponderada
  const addValorMediaP = e => {
    e.preventDefault();
    setValorMediaP([...valorMediaP, ""]);
    setPesoMediaP([...pesoMediaP, ""]);
  };

  const handleChangeValorMediaP = (e, index) => {
    valorMediaP[index] = e.target.value;
    setValorMediaP([...valorMediaP]);
  };

  const handleChangePesoMediaP = (e, index) => {
    pesoMediaP[index] = e.target.value;
    setPesoMediaP([...pesoMediaP]);
  };
  //Calcular media aritmetica
  const mediaAritmetica = () => {
    let soma = 0;
    let cont = 0;
    valorMediaA.map(item => {
      soma = soma + parseInt(item);
      cont++;
    });
    setContMediaA(cont);
    let r = soma / cont;
    setResultMediaA(r);
  };
  //Calcular média ponderada
  const mediaPonderada = () => {
    let somaValor = 0;
    let somaPeso = 0;
    for (let i = 0; i < valorMediaP.length; i++) {
      let calculo = valorMediaP[i] * pesoMediaP[i];
      somaValor = somaValor + calculo;
    }
    pesoMediaP.map(item => {
      somaPeso = somaPeso + parseInt(item);
    });
    console.log(somaPeso);
    let r = somaValor / somaPeso;
    setResultMediaP(r);
  };
  //Mediana
  const calculoMediana = () => {
    //verificação de condições de par ou ímpar do número de dados do input
    //para saber o valor ou valores centrais
    if (contMediaA % 2 == 1) {
      let index = (contMediaA + 1) / 2;
      //setando o valor central na variávekl
      setMediana(valorMediaA[index - 1]);
    } else if (contMediaA % 2 == 0) {
      let index = contMediaA / 2;
      let valor1 = parseInt(valorMediaA[index - 1]);
      let valor2 = parseInt(valorMediaA[index]);
      //pegando a média dos dois valores centrais e setando na variável
      let resultado = (valor1 + valor2) / 2;
      setMediana(resultado);
    }
  };
  const preparaModa = () => {
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

    calculoModa(dados);
  };

  const calculoModa = function(valor) {
    const summary = summarize(dados);
    const mode = findMode(summary);
    const modeItems = filterMode(summary, mode);
    return modeItems.length == summary.length ? [] : getValues(modeItems);
  };

  const desvioMedio = () => {
    //setando as variaveis para o cálculo
    let media = resultMediaA;
    let num = contMediaA;
    let soma_desvios = 0;
    //mapeando os dados
    valorMediaA.map(item => {
      //criando variavel auxiliar para o calculo dos desvios
      let auxiliar = 0;
      //calculando o desvio com a fórmula
      auxiliar = auxiliar + (item - media);
      //caso o valor dê negativo, é multiplicado para
      // virar positivo para a soma
      if (auxiliar < 0) {
        auxiliar = auxiliar * -1;
      }
      //adicionando os valores na variavel de somas
      soma_desvios = soma_desvios + auxiliar;
    });
    //cálculos finais e colocando na variável definitiva o resultado
    let r = soma_desvios / num;
    setResultDesvioMedio(r);
  };

  const varianciaAmostral = () => {
    //criando variaveis locais para o calculo
    let n = contMediaA - 1;
    let media = resultMediaA;
    let somaValores = 0;
    //mapeamento dos dados
    valorMediaA.map(item => {
      //calculando os valores pela fórmula de variãncia e somando na variavel
      let calculo = (item - media) ** 2;
      somaValores = somaValores + calculo;
    });
    //cálculos finais e setando o resultado na variável definitiva
    console.log("somaValores", somaValores);
    let r = somaValores / n;
    setResultVarianciaAmostral(r);
  };

  const varianciaPopulacional = () => {
    //criando as variaveis locais para o calculo
    let n = contMediaA;
    let media = resultMediaA;
    let somaValores = 0;
    //mapeando os dados
    valorMediaA.map(item => {
      //calculando os valores com a fórula e adicionando na variável
      let calculo = (item - media) ** 2;
      somaValores = somaValores + calculo;
    });
    //cálculos finais e adicionando na variável final
    let r = somaValores / n;
    setResultVarianciaPopulacional(r);
  };

  const desvioPadrao = () => {
    //pegando o valor da variancia
    let varianc = resultVarianciaPopulacional;
    //calculando a raiz quadrada da variancia
    let r = sqrt(varianc);
    //setando na variável de desvio padrão
    setResultDesvioPadrao(r);
  };

  const coeficienteVariacao = () => {
    //pegando os valores de desvio e média para calculo
    let desvio = resultDesvioPadrao;
    let media = resultMediaA;
    //calculando o coeficiente
    let r = desvio / media;
    //setando a variável final
    r = r * 100;
    console.log("desvio", desvio);
    console.log("media", media);
    setResultCoeficienteVariacao(r);
  };

  return (
    <div className="container align-self-center" id="container-home">
      {tela === 0 && (
        <Container className="container-fluid">
          <Row>
            <Button color="primary" onClick={addValorMediaA}>
              +
            </Button>
          </Row>
          
          <Row>
            {valorMediaA.map((media, index) => (
              <Col sm={3} key={index}>
                <FormGroup>
                  <Input
                    type="number"
                    name="valorMediaA"
                    id="valorMediaA"
                    placeholder="Valor"
                    value={media}
                    onChange={e => handleChangeMediaA(e, index)}
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediaA"
                  id="valorMediaA"
                  placeholder="Resultado"
                  value={resultMediaA}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col>
              <Button color="primary" onClick={mediaAritmetica}>
                Calcular Média
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 1 && (
        <Container className="container-fluid">
          <Row>
            <Button color="primary" onClick={addValorMediaP}>
              +
            </Button>
          </Row>
          <Row>
            <Col sm={6}>
              {valorMediaP.map((valormedia, index) => (
                <FormGroup key={index}>
                  <Input
                    type="number"
                    name="valorMediaP"
                    id="valorMediaP"
                    placeholder="Valor"
                    value={valormedia}
                    onChange={e => handleChangeValorMediaP(e, index)}
                  />
                </FormGroup>
              ))}
            </Col>
            <Col sm={6}>
              {pesoMediaP.map((pesomedia, index) => (
                <FormGroup key={index}>
                  <Input
                    type="number"
                    name="pesoMediaP"
                    id="pesoMediaP"
                    placeholder="Peso"
                    value={pesomedia}
                    onChange={e => handleChangePesoMediaP(e, index)}
                  />
                </FormGroup>
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediaA"
                  id="valorMediaA"
                  placeholder="Resultado"
                  value={resultMediaP}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col>
              <Button color="primary" onClick={mediaPonderada}>
                Calcular Média Ponderada
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 2 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={mediana}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={calculoMediana}>
                Calcular Mediana
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 3 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultModa}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={calculoMediana}>
                Calcular Moda
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 4 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultDesvioMedio}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={desvioMedio}>
                Calcular Desvio Médio
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 5 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultVarianciaAmostral}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={varianciaAmostral}>
                Calcular Variância Amostral
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 6 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultVarianciaPopulacional}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={varianciaPopulacional}>
                Calcular Variância Populacional
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 7 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultDesvioPadrao}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={desvioPadrao}>
                Calcular Desvio Padrão
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {tela === 8 && (
        <Container className="container-fluid">
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Resultado:</Label>
                <Input
                  type="number"
                  name="valorMediana"
                  id="valorMediana"
                  placeholder="Resultado"
                  value={resultCoeficienteVariacao}
                  disabled
                />
              </FormGroup>
              <Button color="primary" onClick={coeficienteVariacao}>
                Calcular Coeficiente de Variação
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
