import { DateTime } from 'luxon';

import styles from './LogMobiles.module.css';

interface LogMobileProps {
    title: string;
    category: string;
    amount: number;
    type: 'withdrawn' | 'deposit' ;
    date: [number, number, number, number, number];
}

export function LogMobile({title, category, amount, type, date}: LogMobileProps) {
    function convertedDate() {
        return DateTime.local(date[0], date[1], date[2]).toLocaleString()
    }

    function isThisTransactionADeposit() {
        return type === 'deposit';
    }

    return(
        <section className='flex flex-col gap-y-[15px] bg-brand-shape px-8 py-6 rounded-[5px]'>
            <div className='flex flex-col items-start gap-y-[5px]'>
                <p
                className="
                    text-brand-text-title 
                    text-sm
                "
                >
                    {title}
                </p>

                <p
                className={`
                    ${isThisTransactionADeposit() ? 'text-brand-green' : 'text-brand-red'}
                    text-xl
                `}
                >
                    {isThisTransactionADeposit() ? `R$ ${new Intl.NumberFormat().format(amount)}` : `-R$ ${new Intl.NumberFormat().format(amount)}`}
                </p>
            </div>
            
            <div className='flex justify-between'>
                <p
                className="
                    text-brand-text-body
                "
                >
                    {category}
                </p>

                <p
                className="
                    text-brand-text-body 
                "
                >
                    {convertedDate()}
                </p>
            </div>
        </section>
    )
}