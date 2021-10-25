import "./style.scss";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import axios from "axios";

let ACERTO = "Você acertou!!!!";
let MENOR = "É menor";
let MAIOR = "É maior";
let ERRO = "ERRO";

function App() {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(false);
  const [answer, setAnswer] = useState();
  const [error, setError] = useState(false);
  const [rightAnswer, setRightAnswer] = useState();
  console.log(rightAnswer);

  useEffect(() => {
    start();
  }, []);

  async function start() {
    try {
      const res = await axios.get(
        "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"
      );
      setRightAnswer(res.data.value);
      setError(false);
      setStarted(true);
      setAnswer();
      setStatus();

      if (status === ACERTO) {
        setAnswer();
        setStatus(false);
      }
    } catch (error) {
      if (error.response) {
        setStatus(ERRO);
        setError(true);
        setAnswer(error.response.data.StatusCode);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = answer >= 0;
    if (!validForm) {
      return;
    }
    if (+answer === rightAnswer) {
      setStatus(ACERTO);
      setStarted(false);
    } else if (answer < rightAnswer) {
      setStatus(MAIOR);
    } else {
      setStatus(MENOR);
    }
  };

  const newGameButton = (
    <button type="button" className="newGame" onClick={() => start()}>
      <i>
        <IoMdRefresh />
      </i>
      Nova partida
    </button>
  );

  return (
    <div className="homeContainer">
      <div className="wrapper">
        <h1 className="title">Qual é o número?</h1>
        <hr />
        <div className="numberContainer">
          <p className={error ? "statusError" : "status"}>{status}</p>
          {status === ACERTO ? (
            <span className="rightAnswer">{answer}</span>
          ) : (
            <span className={status === ERRO ? "errorMsg" : ""}>{answer}</span>
          )}

          {error || !started ? newGameButton : null}
        </div>
        <form onSubmit={handleSubmit} className="inputContainer">
          <input
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite o palpite"
          />
          <button
            type="submit"
            disabled={error}
            className={
              error || status === ACERTO ? "disabledButton" : "enabledButton"
            }
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
