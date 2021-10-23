import "./App.css";
import "./style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

function App() {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(false);
  const [answer, setAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState();
  const [error, setError] = useState(false);
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
      setStarted(true);

      if (status === "Você acertou!!!!") {
        setAnswer("");
        setStatus(false);
      }
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  }

  const submit = (e) => {
    e.preventDefault();
    const formValid = +answer >= 0;
    if (!formValid) {
      return;
    }
    if (+answer === +rightAnswer) {
      setStatus("Você acertou!!!!");
      setStarted(false);
    } else if (+answer < +rightAnswer) {
      setStatus("É maior");
    } else {
      setStatus("É menor");
    }
  };

  return (
    <div className="homeContainer">
      <div className="wrapper">
        <h1 className="title">Qual é o número?</h1>
        <hr />
        <div className="numberContainer">
          {error ? (
            <p className="statusError">Erro</p>
          ) : (
            <p className="status">{status}</p>
          )}

          {status === "Você acertou!!!!" ? (
            <span className="rightAnswer">{answer}</span>
          ) : (
            <span className="">{answer}</span>
          )}

          {!started && (
            <button type="button" className="newGame" onClick={() => start()}>
              <i>
                <IoMdRefresh />
              </i>
              Nova partida
            </button>
          )}
        </div>
        <form onSubmit={submit} className="inputContainer">
          <input
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite o palpite"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
