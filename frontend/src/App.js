import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from './config-axios';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function App() {
  async function carregaPerguntas() {
    const { data } = await Axios.get('/perguntas');
    setPerguntas(data);
  };

  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [mostraMsgSuccess, setMostraMsgSuccess] = useState(false);
  const [mostraMsgError, setMostraMsgError] = useState(false);

  useEffect(() => {
    carregaPerguntas();
  }, []);

  function atualizaResposta(resposta) {
    const resSplit = resposta.split('_');
    const index = resSplit[0];
    const alternativa = resSplit[1];
    const tituloPergunta = perguntas[index].titulo;
    const objResposta = { titulo: tituloPergunta, resposta: alternativa };
    const novasRespostas = respostas;
    novasRespostas[index] = objResposta;
    setRespostas(novasRespostas);
  };

  async function enviaRespostas() {
    try {
      await Axios.post('/respostas', {
        respostas: respostas
      });
      setMostraMsgSuccess(true);
      setRespostas([]);
    } catch (err) {
      setMostraMsgError(true);
      throw err;
    }
  };

  return (
    <div className="App" style={{ height: '100%'}}>
      <Snackbar open={mostraMsgSuccess} autoHideDuration={5000} onClose={() => setMostraMsgSuccess(false)}>
        <Alert severity="success">Respostas Enviadas!</Alert>
      </Snackbar>
      <Snackbar open={mostraMsgError} autoHideDuration={5000} onClose={() => setMostraMsgError(false)}>
        <Alert severity="error">Erro ao enviar!</Alert>
      </Snackbar>
      { perguntas.length ? perguntas.map((pergunta, indexPergunta) => {
        return (
          <Card key={indexPergunta} style={{ width: '30%', margin: 40, padding: 20, backgroundColor: '#EBEBEB' }}>
            <CardContent>
              <Typography variant="h5" component="h2">{pergunta.titulo}</Typography>
              <RadioGroup name={`${indexPergunta}_questao`} onChange={option => atualizaResposta(option.target.value)}>
                { pergunta.alternativas.map((alternativa, index) => {
                  return <FormControlLabel key={index} value={`${indexPergunta}_${alternativa}`} control={<Radio />} label={alternativa} />
                })}
              </RadioGroup>
            </CardContent>
          </Card>)
        }) : ('')
      }
      { perguntas.length ?
        <Button variant="contained" color="primary" onClick={enviaRespostas} style={{ margin: 40 }}>
          Enviar Respostas
        </Button> : ('')
      }
    </div>
  );
}

export default App;
