import Input from './components/Input/Input'
import FetchData from './components/FetchData/FetchData'
import { useState } from 'react'

import './index.sass'

function App() {
  const [cep, setCep] = useState();

  const CliqueNoBotãoPesquisa = (inputCep) => {
    setCep(inputCep);
};

  return (
    <div className='app'>
      <Input onClick={CliqueNoBotãoPesquisa} />
      {cep && <FetchData cep={cep} />}
    </div>
  )
}

export default App
