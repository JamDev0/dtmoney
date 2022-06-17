import { useEffect, useState } from "react";
import { LogCards } from "./LogCards";
import { Logs } from "./Logs";

import { api } from "../services/api";

interface transactionsInterface {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: 'withdrawn' | 'deposit' ;
    date: [number, number, number, number, number];
}

export function Main() {
    const [transactions, setTransactions] = useState<transactionsInterface[] | []>([])
    const [transactionsTotal, setTransactionsTotal] = useState<number>(0);
    const [transactionsWithdrawnTotal, setTransactionsWithdrawnTotal] = useState<number>(0);
    const [transactionsDepositTotal, setTransactionsDepositTotal] = useState<number>(0);

    function defineTransactionsTotal() {
        let total = 0;


        transactions.forEach( element => {
            if(element.type === 'deposit') {
                total = total + element.amount;
            } else if(element.type === 'withdrawn') {
                total = total - element.amount;
            }
        });

        return total
    }


    function defineTotalOfWithdraws() {
        let total = 0;


        transactions.forEach( element => {
            if(element.type === 'withdrawn') {
                total = total + element.amount;
            }
        });

        return total
    }

    function defineTotalOfDeposits() {
        let total = 0;


        transactions.forEach( element => {
            if(element.type === 'deposit') {
                total = total + element.amount;
            }
        });

        return total
    }

    useEffect(()=> {
        api.get('transactions')
        .then(res => setTransactions(res.data));
    }, [])

    useEffect(()=>{
        setTransactionsTotal(defineTransactionsTotal());
        setTransactionsDepositTotal(defineTotalOfDeposits());
        setTransactionsWithdrawnTotal(defineTotalOfWithdraws());
    }, [transactions])

    return(
        <main
         className="
            md:px-[160px]
         "
        >
            <section
             className='
                -translate-y-2/4 flex gap-x-4 w-full overflow-x-hidden pl-6
                md:gap-8 md:ml-0
             '
            >

                <LogCards
                 quantity={transactionsDepositTotal}
                 type='input'
                />

                <LogCards
                 quantity={transactionsWithdrawnTotal}
                 type='output'
                />

                <LogCards
                 quantity={transactionsTotal}
                 type='total'
                />
            </section>

            <Logs
             transactions={transactions}
            />
        </main>
    )
}