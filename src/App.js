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
  //Mediana
  const [mediana, setMediana] = useState(0);
  //Desvio Médio
  const [resultDesvioMedio, setResultDesvioMedio] = useState(0);
  //Variância Amostral
  const [resultVarianciaAmostral, setResultVarianciaAmostral] = useState(0);
  //Variância Populacional
  const [
    resultVarianciaPopulacional,
    setResultVarianciaPopulacional
  ] = useState(0);
  //Desvio Padrão
  const [resultDesvioPadrao, setResultDesvioPadrao] = useState(0);
  //Coeficiente de Variação
  const [resultCoeficienteVariacao, setResultCoeficienteVariacao] = useState(0);

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
    setTela(1);
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
    let r = somaValor / somaPeso;
    setResultMediaP(r);
    calculoGeral();
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
  const calculoGeral = () => {
    calculoMediana();
    desvioMedio();
    varianciaAmostral();
    varianciaPopulacional();
    setTela(2);
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
    desvioPadrao(r);
  };

  const desvioPadrao = varianca => {
    //pegando o valor da variancia
    let varianc = varianca;
    //calculando a raiz quadrada da variancia
    let r = sqrt(varianc);
    //setando na variável de desvio padrão
    setResultDesvioPadrao(r);
    coeficienteVariacao(r);
  };

  const coeficienteVariacao = desvioP => {
    //pegando os valores de desvio e média para calculo
    let desvio = desvioP;
    let media = resultMediaA;
    //calculando o coeficiente
    let r = desvio / media;
    //setando a variável final
    r = r * 100
    setResultCoeficienteVariacao(r);
  };

  return (
    <div className="container align-self-center" id="container-home">
      {tela === 0 && (
        <Container className="container-fluid">
          <Card>
            <h1>Média Aritmética</h1>
            <br />
            <div id="mediaAritmetica">
              <Row>
                <Col>
                  <Button color="primary" onClick={addValorMediaA}>
                    +
                  </Button>
                </Col>
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
            </div>
            <Button color="primary" onClick={mediaAritmetica}>
              Calcular Média
            </Button>
          </Card>
        </Container>
      )}
      {tela === 1 && (
        <Container className="container-fluid">
          <Card>
            <h1>Média Ponderada</h1>
            <br />
            <div id="mediaPonderada">
              <Row>
                <Col>
                  <Button color="primary" onClick={addValorMediaP}>
                    +
                  </Button>
                </Col>
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
            </div>
            <Button color="primary" onClick={mediaPonderada}>
              Calcular Média Ponderada
            </Button>
          </Card>
        </Container>
      )}
      {tela === 2 && (
        <Container className="container-fluid">
          <Card>
            <h1>Resultados</h1>
            <br />
            <FormGroup>
              <Label for="exampleEmail">Média Aritmética:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultMediaA}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Média Ponderada:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultMediaP}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Mediana:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={mediana}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Desvio Médio:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultDesvioMedio}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Desvio Padrão:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultDesvioPadrao}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Variancia Amostral:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultVarianciaAmostral}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Variancia Populacional:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultVarianciaPopulacional}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Coeficiente Variação:</Label>
              <Input
                type="number"
                name="valorMediaA"
                id="valorMediaA"
                placeholder="Resultado"
                value={resultCoeficienteVariacao}
                disabled
              />
            </FormGroup>
          </Card>
        </Container>
      )}
    </div>
  );
}
