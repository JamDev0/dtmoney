import { HeaderDesktop } from "./modules/Desktop/HeaderDesktop";
import { HeaderMobile } from "./modules/Mobile/HeaderMobile";
import { LogDesktop } from "./modules/Desktop/LogDesktop";
import { LogMobile } from "./modules/Mobile/LogMobile";

import { useMediaQuery } from 'react-responsive';

import styles from './index.module.css';

interface LogsProps {
    transactions: {
        id: number;
        title: string;
        category: string;
        amount: number;
        type: 'withdrawn' | 'deposit' ;
        date: [number, number, number, number, number];
    }[] | []
}

export function Logs({transactions}:LogsProps) {    
    const isMobile = !useMediaQuery({ query: '(min-width: 1000px)' });

    return(
        <section
         className={styles.section}
        >
            {
                isMobile ? 
                    <>
                        <HeaderMobile
                         amountOfLogs={transactions.length}
                        />

                        {
                            transactions.length > 0 ?
                                transactions.map( ({id, title, category, amount, type, date}) => {
                                    return (
                                        <LogMobile
                                         key={id}
                                         title={title}
                                         category={category}
                                         amount={amount}
                                         type={type}
                                         date={date}
                                        />
                                    )
                                })
                            :
                                null
                        }
                    </>
                :
                <>
                    <HeaderDesktop/>

                    {
                        transactions.length > 0 ?
                        transactions.map( ({id, title, category, amount, type, date}) => {
                            return (
                                <LogDesktop
                                 key={id}
                                 title={title}
                                 category={category}
                                 amount={amount}
                                 type={type}
                                 date={date}
                                />
                            )
                        })
                    :
                        null
                    }
                </>
            }

            
        </section>
    )
}