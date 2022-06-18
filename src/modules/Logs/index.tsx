import { HeaderDesktop } from "./modules/Desktop/HeaderDesktop";
import { HeaderMobile } from "./modules/Mobile/HeaderMobile";
import { LogDesktop } from "./modules/Desktop/LogDesktop";
import { LogMobile } from "./modules/Mobile/LogMobile";

import { useMediaQuery } from 'react-responsive';

import styles from './index.module.css';

import { useTransactions } from "../../hooks/useTransactions";

export function Logs() {    
    const isMobile = !useMediaQuery({ query: '(min-width: 1000px)' });
    
    const {transactions} = useTransactions();


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