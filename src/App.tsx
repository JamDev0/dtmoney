import { useState } from 'react';

import { Header } from "./modules/Header";
import { Main } from "./modules/Main";
import { NewTransactionModal } from './modules/NewTransactionModal'
import { TransactionsProvider } from './hooks/useTransactions';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalClose() {
    setIsModalOpen(false)
  }

  function handleModalOpen() {
      setIsModalOpen(true);
  }

  return (
    <TransactionsProvider>
      <Header
       openModalFunction={handleModalOpen}
      />

      <Main/>

      
      <NewTransactionModal
       closeTransactionModalFunction={handleModalClose}
       isModalOpen={isModalOpen}
      />
    </TransactionsProvider>
  )
}

export default App
