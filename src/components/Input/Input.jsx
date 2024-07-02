import { useState } from "react"
import { FiSearch } from 'react-icons/fi';

function Input({onClick}) {

    const [cep, setCep] = useState("");

    const click = (e) => {
        e.preventDefault();
        onClick(cep);
    };
    
    return (
        <>
            <div className="container titulo text-center">
                <h1>Localizador de endereço</h1>
            </div>
            <h2 className="container text-center text-white">Digite o CEP</h2>
            <form className="container text-center text-white">
                <div className="form-floating my-3">
                    <input onChange={(e) => setCep(e.target.value)} value={cep} type="text" className="form-control" />
                    <label htmlFor="">Cep</label>
                </div>
                <div>
                    <button onClick={click} className="btn btn-secondary"><FiSearch /></button>
                </div>
            </form>
        </>
    )
}

export default Input