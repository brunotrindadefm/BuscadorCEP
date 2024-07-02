import Input from './components/Input/Input'
import FetchData from './components/FetchData/FetchData'
import { useState } from 'react'

import './index.css'

function App() {
  const [cep, setCep] = useState();

  const CliqueNoBotãoPesquisa = (inputCep) => {
    setCep(inputCep);
};

  return (
    <>
      <Input onClick={CliqueNoBotãoPesquisa} />
      {cep && <FetchData cep={cep} />}
    </>
  )
}

export default App
