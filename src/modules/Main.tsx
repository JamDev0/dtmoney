import { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { LogCards } from "./LogCards";
import { Logs } from "./Logs";


export function Main() {
    const {transactions} = useTransactions();

    const [transactionsTotal, setTransactionsTotal] = useState<string>('');
    const [transactionsWithdrawnTotal, setTransactionsWithdrawnTotal] = useState<string>('');
    const [transactionsDepositTotal, setTransactionsDepositTotal] = useState<string>('');

    function defineTransactionsTotal() {
        let total = 0;

        if(transactions.length > 0) {
            transactions.forEach( element => {
                if(element.type === 'deposit') {
                    total = total + element.amount;
                } else if(element.type === 'withdrawn') {
                    total = total - element.amount;
                }
            });
        }


        return new Intl.NumberFormat().format(total)
    }


    function defineTotalOfWithdraws() {
        let total = 0;

        if(transactions.length > 0) {
            transactions.forEach( element => {
                if(element.type === 'withdrawn') {
                    total = total + element.amount;
                }
            });
        }

        return new Intl.NumberFormat().format(total)
    }

    function defineTotalOfDeposits() {
        let total = 0;

        if(transactions.length > 0) {
            transactions.forEach( element => {
                if(element.type === 'deposit') {
                    total = total + element.amount;
                }
            });
        }


        return new Intl.NumberFormat().format(total)
    }

    

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
                md:gap-x-8 md:ml-0 md: md:pl-0
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

            <Logs/>
        </main>
    )
}