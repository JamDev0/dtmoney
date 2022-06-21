import { useEffect, useLayoutEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useTransactions } from '../../hooks/useTransactions';
import { Desktop } from './desktop';

import { Mobile } from './mobile'

export function LogsResume() {
    let targetCurrentXPosition = 0;

    const [section, setSection] = useState<HTMLDivElement>();
    const [sectionInitialLeftSpacing, setSectionInitialLeftSpacing] = useState<number>(0)

    const isMobile = !useMediaQuery({ query: '(min-width: 1000px)' });

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

    function defineLatestWithdrawn() {
        let latestDate = [0, 0, 0, 0, 0];

        transactions.forEach(({ date, type }) => {
            if(type === 'withdrawn') {
                latestDate = date.filter((date, index) => date > latestDate[index])?? latestDate
            }
        });

        return latestDate as [number, number, number, number, number];
    }

    function defineLatestDeposit() {
        let latestDate = [0, 0, 0, 0, 0];

        transactions.forEach(({ date, type }) => {
            if(type === 'deposit') {
                latestDate = date.filter((date, index) => date > latestDate[index])?? latestDate
            }
        });

        return latestDate as [number, number, number, number, number];
    }

    
    useEffect(()=> {
        setSection(document.getElementById('TheSection') as HTMLDivElement);
    }, [isMobile]);

    useEffect(()=>{
        setSectionInitialLeftSpacing(section?.offsetLeft!);
    }, [section]);
    
    useEffect(()=>{
        setTransactionsTotal(defineTransactionsTotal());
        setTransactionsDepositTotal(defineTotalOfDeposits());
        setTransactionsWithdrawnTotal(defineTotalOfWithdraws());
    }, [transactions])


    return(
            <>
                {
                    isMobile ?
                        <section
                         id="TheSection"

                         className='
                            -translate-y-2/4 flex gap-x-4 w-full relative
                         '

                         onTouchStart={event => {
                            let Target = section as HTMLDivElement;
                            let Touch =  event.touches[0];
                
                
                            Target.style.transition = 'none';
                
                            targetCurrentXPosition = Touch.clientX - Target.offsetLeft;
                         }}

                         onTouchMove={ event => {
                            let Target = section as HTMLDivElement;
                            let Touch =  event.touches[0];
                
                
                            let X = Touch.clientX - targetCurrentXPosition;
                            Target.style.left = X + 'px';
                         }}

                         onTouchEnd={event => {
                             
                             let Target = section as HTMLDivElement;
                             let TargetRight = Target.offsetLeft + Target.scrollWidth;
                             
                            Target.style.transition = 'left 200ms cubic-bezier(0.510, -0.300, 0.805, 0.365)';
                            

                            if(TargetRight < window.innerWidth - sectionInitialLeftSpacing) {   
                                Target.style.left = (window.innerWidth - 2*sectionInitialLeftSpacing - Target.scrollWidth) + 'px';
                            } else if(Target.offsetLeft > sectionInitialLeftSpacing) {
                                Target.style.left = '0px';
                            }
                         }}
                        >
                            <Mobile
                            quantity={transactionsDepositTotal}
                            type='input'
                            date={defineLatestDeposit()}
                            />

                            <Mobile
                            quantity={transactionsWithdrawnTotal}
                            type='output'
                            date={defineLatestWithdrawn()}
                            />

                            <Mobile
                            quantity={transactionsTotal}
                            type='total'
                            />
                        </section>
                    :
                        <section
                         className='
                            -translate-y-2/4 flex gap-x-4 w-full overflow-x-hidden pl-6
                            md:gap-x-8 md:ml-0 md: md:pl-0
                         '
                        >
                            <Desktop
                            quantity={transactionsDepositTotal}
                            type='input'
                            />

                            <Desktop
                            quantity={transactionsWithdrawnTotal}
                            type='output'
                            />

                            <Desktop
                            quantity={transactionsTotal}
                            type='total'
                            />
                        </section>
                }
            </>
    )
}