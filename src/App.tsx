import { useState } from 'react';

import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { NewTransactionModal } from './modules/NewTransactionModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalClose() {
    setIsModalOpen(false)
  }

  function handleModalOpen() {
      setIsModalOpen(true);
  }

  return (
    <>
      <Header
       openModalFunction={handleModalOpen}
      />

      <Main/>

      <NewTransactionModal
       closeTransactionModalFunction={handleModalClose}
       isModalOpen={isModalOpen}
      />
    </>
  )
}

export default App
