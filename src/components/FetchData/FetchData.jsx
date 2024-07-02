import { useState } from "react";
import { useEffect } from "react";

function FetchData({ cep }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const validarCep = (cep) => {
        const digitos = /^[0-9]{8}$/;
        return digitos.test(cep);
    };

    const fetchData = () => {

        // Validação para o cep digitado
        if (!validarCep(cep)) {
            setErro("CEP inválido. Digite um CEP válido.");
            setData(null);
            return;
        }

        // Começa o carregamento para fazer a consulta
        setLoading(true);

        // Erro começa como nulo
        setErro(null);

        // Link da API, que recebe o valor de cep. Isso tudo se passar pela validação
        const apiCepUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;

        // função fetch faz uma requisição HTTP get para a url fornecida
        fetch(apiCepUrl)

            .then(response => {
                if (!response.ok) {
                    throw new Error(`404 Not Found` + response.statusText)
                }
                return response.json();
            })
            // response.ok é uma propriedade booleana que será true se a resposta HTTP estiver no intervalo de 200-299.

            // Se response.ok for false, significa que a requisição falhou.

            // Se o response.ok for true, irá retornar a função response.json()

            .then(data => {
                // Dados (data) convertidos são armazenados no setData
                setData(data)
                // Fim de carregamento, já tem a resposta
                setLoading(false)
            })

            .catch(error => {
                // Qualquer erro capturado a mensagem de erro é armazenada no setErro
                setErro(error.message);
                // Fim de carregamento, já tem a resposta
                setLoading(false);
            })

    }

    // O useEffect monitora a variável cep. Sempre que cep muda, o useEffect será executado.
    useEffect(() => {
        if (cep) {
            fetchData();
        }
    }, [cep]);
    //Se cep for verdadeiro (ou seja, não é null, undefined ou uma string vazia), chama-se a função fetchData.

    return (
        <>
            <div className="container text-center text-white">
                {loading && <p>Carregando...</p>}
                {erro && <p>Erro: {erro}</p>}
                {data ? (
                    <div id="endereco" >
                        <h2>Endereço</h2>
                        <p><b>CEP:</b> {data.cep}</p>
                        <p><b>Estado:</b> {data.state}</p>
                        <p><b>Cidade:</b> {data.city}</p>
                        <p><b>Bairro:</b> {data.neighborhood}</p>
                        <p><b>Rua:</b> {data.street}</p>
                    </div>
                ) : (
                    !loading && !erro && <p>Digite um CEP para buscar o endereço.</p>
                )}
            </div>
            {console.log(data)}
        </>
    )
}

export default FetchData