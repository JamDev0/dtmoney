import Modal from 'react-modal';

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { useMediaQuery } from 'react-responsive';

import styles from './NewTransactionModal.module.css'

Modal.setAppElement('#root');

interface NewTransactionModalProps {
    isModalOpen: boolean;
    closeTransactionModalFunction: () => void;
}   

export function NewTransactionModal({isModalOpen, closeTransactionModalFunction}:NewTransactionModalProps) {
    const { createNewTransaction } = useTransactions();

    const isMobile = !useMediaQuery({ query: '(min-width: 1000px)' });

    const [isDepositOptionSelected, setIsDepositOptionSelected] = useState<boolean>(false);
    const [isWithdrawnOptionSelected, setIsWithdrawnOptionSelected] = useState<boolean>(false);

    const [titleValue, setTitleValue] = useState<string>('');
    const [amountValue, setAmountValue] = useState<number>(0);
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
        setAmountValue(0);
        setCategoryValue('')
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        await createNewTransaction({
            title: titleValue,
            amount: amountValue,
            category: categoryValue,
            type: isDepositOptionSelected ? 'deposit' : 'withdrawn'
        });

        closeTransactionModalFunction();
    }

    return(
        <Modal
             isOpen={isModalOpen}
             overlayClassName={styles.overlay}
             className={styles.modal}
             shouldCloseOnEsc={true}
             onRequestClose={closeTransactionModalFunction}
             onAfterClose={modalCloseCallbacks}
            >
                <X
                 data-title='Cancelar nova transação'
                 role="button"
                 tabIndex={0}
                 className='
                    absolute top-[21px] right-[21px] cursor-pointer w-6 h-6 transition duration-300
                    hover:opacity-50
                 '
                 onKeyDown={ event => event.key == 'Enter' ? closeTransactionModalFunction() : null}
                 onClick={closeTransactionModalFunction}
                />

                
                <form
                 className='
                    flex flex-col justify-between h-full
                    md:h-auto
                 '
                 onSubmit={handleFormSubmit}
                >
                    <h2 
                     className='
                        text-xl text-brand-text-title font-semibold mb-[16px]
                        md:text-2xl
                     '
                    >
                        Cadastrar transação
                    </h2>

                    <section
                     className='
                        flex flex-col gap-y-[10px]
                        md:gap-y-[16px]
                     '
                    >
                        <input
                        type='text'
                        placeholder='Título'
                        className='
                            w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] rounded-[5px] text-sm
                            md:text-base
                            placeholder:text-brand-text-body
                        '
                        onChange={event => setTitleValue(event.target.value)}
                        value={titleValue}
                        ></input>

                        <input
                        type='number'
                        placeholder='Preço'
                        className='
                            w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] text-sm rounded-[5px]
                            md:text-base
                            placeholder:text-brand-text-body
                        '
                        onChange={event => setAmountValue(parseFloat(event.target.value))}
                        value={amountValue}
                        ></input>

                        <div
                        className='flex w-full gap-x-1'
                        >
                            <div
                            title='button'
                            tabIndex={0}
                            className={`
                                py-3 border-[1.5px] border-solid border-brand-text-body flex justify-center gap-x-4 grow rounded-[5px] cursor-pointer transition duration-200
                                md:py-5
                                ${isDepositOptionSelected ? 'bg-brand-green border-brand-green' : 'bg-transparent'}
                                hover:border-brand-green
                            `}
                            onKeyDown={ event => event.key === 'Enter' ? handleDepositSelection() : null}
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
                                    text-sm
                                    md:text-base
                                    ${isDepositOptionSelected ? 'text-brand-shape' : 'text-brand-text-title'}
                                `}
                                >
                                    Entrada
                                </span>
                            </div>

                            <div
                            role='button'
                            tabIndex={0}
                            className={`
                                py-3 border-[1.5px] border-solid border-brand-text-body flex justify-center gap-x-4 grow rounded-[5px] cursor-pointer transition duration-200
                                md:py-5
                                ${isWithdrawnOptionSelected ? 'bg-brand-red border-brand-red' : 'bg-transparent'}
                                hover:border-brand-red
                            `}
                            onKeyDown={ event => event.key === 'Enter' ? handleWithdrawnSelection() : null}
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
                                    text-sm
                                    md:text-base
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
                            w-full py-5 px-6 bg-[#E7E9EE] border border-solid border-[#D7D7D7] rounded-[5px] text-sm
                            md:text-base
                            placeholder:text-brand-text-body
                        '
                        onChange={event => setCategoryValue(event.target.value)}
                        value={categoryValue}
                        ></input>
                    </section>

                    <button
                     className='
                        bg-brand-green w-full py-5 font-semibold text-brand-shape mt-[8px] rounded-[5px] transition duration-300 text-sm justify-self-end
                        md:text-base md:justify-self-center
                        hover:brightness-90
                     '
                    >
                        Cadastrar
                    </button>
                </form>
            </Modal>
    )
}