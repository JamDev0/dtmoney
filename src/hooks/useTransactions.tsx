import { DateTime } from "luxon";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from "../services/api";


interface transactionsInterface {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: 'withdrawn' | 'deposit' ;
    date: [number, number, number, number, number];
}

interface contextValues {
    transactions: transactionsInterface[] | [];
    createNewTransaction: (transaction: transactionsInput) => Promise<void>;
}

interface transactionsProviderProps {
    children: ReactNode;
}

type transactionsInput = Omit<transactionsInterface, 'id' | 'date'>


const TransactionsContext = createContext<contextValues>({} as contextValues)

export function TransactionsProvider({children}: transactionsProviderProps) {
    const [transactions, setTransactions] = useState<transactionsInterface[] | []>([]);

    async function createNewTransaction({title,amount,category,type}: transactionsInput) {
        await api.get('transactions').then(res => {
            let transaction: transactionsInterface[] = res.data.transactions;
            
            let ids = transaction.map( element => Number(element.id));;
            
            let biggestId = 0;

            if(ids.length > 0) {
                ids.forEach(id => {
                    id > biggestId ? biggestId = id : biggestId = biggestId
                })
            }

            let now = DateTime.now();

            let data:transactionsInterface = {
                id: biggestId + 1,
                title: title,
                category: category,
                amount: amount,
                type: type,
                date: [now.year, now.month, now.day, now.hour, now.minute]
            } 

            api.post('/transactions', data);

            setTransactions( (current) => {return [data ,...current]})


            
            let LocalTransactions = JSON.parse(localStorage.getItem('Transactions')?? '[]');

            if(LocalTransactions === null) {
                LocalTransactions = [];
            }

            localStorage.setItem('Transactions', JSON.stringify([...LocalTransactions, data]));
        });

    }
    
    useEffect(()=> {
        api.get('transactions')
        .then(res => setTransactions(res.data.transactions));
    }, []);


    return(
        <TransactionsContext.Provider value={{transactions, createNewTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
} 