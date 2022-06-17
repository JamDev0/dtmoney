import Modal from 'react-modal';

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useState } from 'react';


Modal.setAppElement('#root');

interface NewTransactionModalProps {
    isModalOpen: boolean;
    closeTransactionModalFunction: () => void;
}   

export function NewTransactionModal({isModalOpen, closeTransactionModalFunction}:NewTransactionModalProps) {
    const [isDepositOptionSelected, setIsDepositOptionSelected] = useState<boolean>(false);
    const [isWithdrawnOptionSelected, setIsWithdrawnOptionSelected] = useState<boolean>(false);

    const [titleValue, setTitleValue] = useState<string>('');
    const [amountValue, setAmountValue] = useState<number | undefined>(undefined);
    const [categoryValue, setCategoryValue] = useState<string>('');

    function handleWithdrawnSelection() {
        setIsDepositOptionSelected(false);
        setIsWithdrawnOptionSelected(true);
    }

    function handleDepositSelection() {
        setIsDepositOptionSelected(true);
        setIsWithdrawnOptionSelected(false);
    }

    function modalCloseCallbacks() {
        setIsDepositOptionSelected(false);
        setIsWithdrawnOptionSelected(false);

        setTitleValue('');
        setAmountValue(undefined);
        setCategoryValue('')
    }

    return(
        <Modal
             isOpen={isModalOpen}
             style={{
                 overlay: {
                    backgroundColor: 'rgba(0,0,0, 0.6)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'       
                 }
             }}
             className='
                bg-brand-background rounded-[5px] px-12 py-16 w-2/5 min-w-[470px] h-min relative
             '
             shouldCloseOnEsc={true}
             onRequestClose={closeTransactionModalFunction}
             onAfterClose={modalCloseCallbacks}
            >
                
                <form
                 className='
                    flex flex-col gap-y-[16px]
                 '
                >
                    <h2 className='text-2xl text-brand-text-title font-semibold mb-[16px]'>
                        Cadastrar transação
                    </h2>

                    <input
                     type='text'
                     placeholder='Título'
                     className='
                        w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] text-base rounded-[5px]
                        placeholder:text-brand-text-body
                     '
                     onChange={event => setTitleValue(event.target.value)}
                     value={titleValue}
                    ></input>

                    <input
                     type='number'
                     placeholder='Preço'
                     className='
                        w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] text-base rounded-[5px]
                        placeholder:text-brand-text-body
                     '
                     onChange={event => setAmountValue(parseFloat(event.target.value))}
                     value={amountValue}
                    ></input>

                    <div
                     className='flex w-full gap-x-2'
                    >
                        <div
                         title='button'
                         tabIndex={0}
                         className={`
                             py-5 border-[1.5px] border-solid border-brand-text-body flex justify-center gap-x-4 grow rounded-[5px] cursor-pointer transition duration-200
                             ${isDepositOptionSelected ? 'bg-brand-green border-brand-green' : 'bg-transparent'}
                             hover:border-brand-green
                         `}
                         onClick={handleDepositSelection}
                        >
                            <ArrowCircleUp
                             className={`
                                w-6 h-6
                                ${isDepositOptionSelected ? 'text-brand-shape' : 'text-brand-green'}
                             `}
                            />

                            <span
                             className={`
                                text-base
                                ${isDepositOptionSelected ? 'text-brand-shape' : 'text-brand-text-title'}
                             `}
                            >
                                Entrada
                            </span>
                        </div>

                        <div
                         title='button'
                         tabIndex={0}
                         className={`
                             py-5 border-[1.5px] border-solid border-brand-text-body flex justify-center gap-x-4 grow rounded-[5px] cursor-pointer transition duration-200
                             ${isWithdrawnOptionSelected ? 'bg-brand-red border-brand-red' : 'bg-transparent'}
                             hover:border-brand-red
                         `}
                         onClick={handleWithdrawnSelection}
                        >
                            <ArrowCircleDown
                             className={`
                                w-6 h-6 
                                ${isWithdrawnOptionSelected ? 'text-brand-shape' : 'text-brand-red'}
                             `}
                            />

                            <span
                             className={`
                                text-base 
                                ${isWithdrawnOptionSelected ? 'text-brand-shape' : 'text-brand-text-title'}
                             `}
                            >
                                Saída
                            </span>
                        </div>
                    </div>

                    <input
                     type='text'
                     placeholder='Categoria'
                     className='
                        w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] text-base rounded-[5px]
                        placeholder:text-brand-text-body
                     '
                     onChange={event => setCategoryValue(event.target.value)}
                     value={categoryValue}
                    ></input>

                    <button
                     className='
                        bg-brand-green w-full py-5 text-base font-semibold text-brand-shape mt-[8px] rounded-[5px] transition duration-300
                        hover:brightness-90
                     '
                    >
                        Cadastrar
                    </button>
                </form>

                <X
                 data-title='button'
                 tabIndex={0}
                 className='
                    absolute top-[21px] right-[21px] cursor-pointer w-6 h-6 transition duration-300
                    hover:opacity-50
                 '
                 onClick={closeTransactionModalFunction}
                />
            </Modal>
    )
}