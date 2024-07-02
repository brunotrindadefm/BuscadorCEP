import { useState } from "react";
import { useEffect } from "react";

function FetchData({ cep }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const validarCep = (cep) => {
        const regex = /^[0-9]{8}$/;
        return regex.test(cep);
    };

    const fetchData = () => {

        if (!validarCep(cep)) {
            setErro("CEP inválido. Digite um CEP válido.");
            setData(null);
            return;
        }

        setLoading(true);
        setErro(null);


        const apiCepUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;

        fetch(apiCepUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`404 Not Found` + response.statusText)
                }
                return response.json();
            })

            .then(data => {
                setData(data)
                setLoading(false)
            })

            .catch(error => {
                setErro(error.message);
                setLoading(false);
            })

    }

    useEffect(() => {
        if (cep) {
            fetchData();
        }
    }, [cep]);



    return (
        <>
            <div className="container text-center text-white">
                {loading && <p>Carregando...</p>}
                {erro && <p>Erro: {erro}</p> }
                {data  ? (
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