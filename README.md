# Studio-Sol

## Rodar o projeto

- rodar o comando _yarn install_ ou _npm install_
- utilizar o comando _yarn dev_ para iniciar o projeto

## Lógica utilizada

```
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(false);
  const [answer, setAnswer] = useState();
  const [error, setError] = useState(false);
  const [rightAnswer, setRightAnswer] = useState();
```
Comecei declarando alguns estados com useState para poder gerencia-los de acordo com o andamento da aplicação
- 'started' para verificar se o jogo está iniciado
- 'status' para mostrar a mensagem de erro, acerto, etc
- 'answer' que armazena a resposta do usuário
- 'error' que verifica se ocorreu erro na requisição e é setado para 'true' caso verdadeiro
- 'rightAnswer' que armazena o número aleatorio através de uma requisição get

-------------
```
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
  
  useEffect(() => {
    start();
  }, []);
```
Para a requisição get da API fornecida, utilizei o AXIOS e criei uma função assincrona, após a requisição ser realizada, setei os estados de acordo com a funcionalidade de cada um. Para que a função fosse executada apenas no primeiro Render, utilizei um useEffect para chama-la.

----------------
```
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
```

Para a lógica do jogo em si, criei uma função para primeiro verificar se existe uma resposta digitada no input, e caso exista uma resposta, é executado o 'IF' verificando se a resposta digitada corresponde ao estado 'rightAnswer' que armazena o número recebido da API, caso a resposta esteja correta, o 'status' é setado para a mensagem "Você acertou" e o estado "started" para 'false', dessa forma é possível mostrar o botão para um novo jogo. Se o número for maior ou menor do que o valor retornado pela API, o status é setado para a mensagem "É maior" ou "É menor".

```
          <p className={error ? "statusError" : "status"}>{status}</p>
          {status === ACERTO ? (
            <span className="rightAnswer">{answer}</span>
          ) : (
            <span className={status === ERRO ? "errorMsg" : ""}>{answer}</span>
          )}

          {error || !started ? newGameButton : null}
        <
```
Para renderizar as mensagens com cores diferentes, de acordo com acerto, erro ou número maior e menor, utilizei If ternário para mudar a className de acordo com o estado atribuído a 'error' ou ao 'status', utilizando a mesma validação para mostrar o botão de nova partida e desabilitar o botão de envio, verificando se 'error' é verdadeiro ou se 'started' é falso.
