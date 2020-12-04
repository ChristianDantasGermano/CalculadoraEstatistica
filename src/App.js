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

  //Monitorar variaveis de controle
  useEffect(() => {
    console.log(valorMediaA);
  }, [valorMediaA]);

  //Funções gerias da tela
  const telamediaA = () => {
    setTela(0);
  };
  const telamediaP = () => {
    setTela(1);
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

  const mediaAritmetica = () => {
    let soma = 0;
    let cont = 0;
    valorMediaA.map(item => {
      soma = soma + parseInt(item);
      cont++;
    });
    let r = soma / cont;
    console.log(r);
    setResultMediaA(r);
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
            <Button color="primary" onClick={telamediaA}>
              Media Aritmetica
            </Button>{" "}
            <Button color="primary" onClick={telamediaP}>
              Media Ponderada
            </Button>{" "}
            <Button color="primary">Media Aritmetica</Button>{" "}
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
        <container className="container-fluid">
          <Row>
            <Button color="primary" onClick={addValorMediaP}>
              +
            </Button>
          </Row>
          <Row>
            <Col sm={6}>
              {valorMediaP.map((valormedia, index) => (
                <FormGroup>
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
        </container>
      )}
    </div>
  );
}
