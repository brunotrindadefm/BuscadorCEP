import { useState } from "react";
import { useEffect } from "react";

function FetchData({ cep }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const fetchData = () => {
        setLoading(true);
        setErro(null);


        const apiCepUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;

        fetch(apiCepUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Não foi obtida reposta. Erro 374170` + response.statusText)
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
                {erro && <p>Erro: {erro}</p>}
                {data  ? (
                    <div>
                        <h2>Endereço</h2>
                        <p>CEP: {data.cep}</p>
                        <p>Estado: {data.state}</p>
                        <p>Cidade: {data.city}</p>
                        <p>Bairro: {data.neighborhood}</p>
                        <p>Rua: {data.street}</p>
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