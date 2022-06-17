import { DateTime } from "luxon";

import styles from './LogDesktop.module.css';

interface LogDesktopProps {
    title: string;
    category: string;
    amount: number;
    type: 'withdrawn' | 'deposit' ;
    date: [number, number, number, number, number];
}

export function LogDesktop({title, category, amount, type, date}: LogDesktopProps) {
    function convertedDate() {
        return DateTime.local(date[0], date[1], date[2]).toLocaleString()
    }

    function isThisQuantityPositive() {
        return type === 'deposit';
    }

    return(
        <section className={styles.section}>
            <p
             className="
                text-brand-text-title 
             "
            >
                {title}
            </p>

            <p
             className={`
                ${isThisQuantityPositive() ? 'text-brand-green' : 'text-brand-red'}
             `}
            >
                {isThisQuantityPositive() ? `R$ ${amount}` : `-R$ ${amount}`}
            </p>

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
            
        </section>
    )
}