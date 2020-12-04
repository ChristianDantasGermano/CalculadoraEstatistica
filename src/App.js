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
  const [contMediana, setContMediana] = useState(0);
  const [mediana, setMediana] = useState(0);

  //Monitorar variaveis de controle
  useEffect(() => {
    console.log("mediana", mediana);
  }, [mediana]);

  useEffect(() => {
    console.log("Contmediana", contMediana);
  }, [contMediana]);

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
    setContMediana(cont);
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
    if (contMediana % 2 == 1) {
      let index = (contMediana + 1) / 2;
      //setando o valor central na variávekl
      setMediana(valorMediaA[index - 1]);
    } else if (contMediana % 2 == 0) {
      let index = contMediana / 2;
      let valor1 = parseInt(valorMediaA[index - 1]);
      let valor2 = parseInt(valorMediaA[index]);
      //pegando a média dos dois valores centrais e setando na variável
      let resultado = (valor1 + valor2) / 2;
      setMediana(resultado);
    }
  };

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
            <Button color="primary" onClick={telamediaA}>
              Media Aritmetica
            </Button>{" "}
            <Button color="primary" onClick={telamediaP}>
              Media Ponderada
            </Button>{" "}
            <Button color="primary" onClick={telamediana}>
              Mediana
            </Button>{" "}
            <Button color="primary">Media Aritmetica</Button>{" "}
          </div>
        </Card>
      </Col>
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
    </div>
  );
}
