import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

import { useMediaQuery } from 'react-responsive';

interface LogCardsProps {
    type: 'output' | 'input' | 'total';
    quantity: string;
    date?: number;
}

console.log(Math.sign(-5))

export function LogCards({type, quantity, date}:LogCardsProps) {
    const isMobile = !useMediaQuery({ query: '(min-width: 1000px)' });

    function defineCurrentIcon() {
        switch(type) {
            case 'output': 
                return <ArrowCircleDown
                         className='
                            text-brand-red w-10 h-10 absolute top-[20px] right-[20px]
                            md:w-8 md:h-8
                         '
                        />;

            case 'input':
                return <ArrowCircleUp
                         className='
                            text-brand-green w-10 h-10 absolute top-[20px] right-[20px]
                            md:w-8 md:h-8
                         '
                        />;

            case 'total':
                return <CurrencyDollar
                         className='
                            text-brand-shape w-10 h-10 absolute top-[20px] right-[20px]
                            md:w-8 md:h-8
                         '
                        />
        }
    }

    function defineCurrentTitle() {
        switch(type) {
            case 'input':
                return 'Entradas';

            case 'output':
                return 'Saídas';

            case 'total':
                return 'Total';
        }
    }

    function isThisLogCardAnTotalType() {
        return type === 'total';
    }

    function isThisQuantityPositive() {
        return Math.sign(Number(quantity)) === 1;
    }

    console.log(isThisLogCardAnTotalType(), isThisQuantityPositive())

    return(
        <section
         className={`
            ${isThisLogCardAnTotalType() && isThisQuantityPositive() ? 'bg-brand-green' : ''}
            ${isThisLogCardAnTotalType() && !isThisQuantityPositive() ? 'bg-brand-red' : ''}
            ${!isThisLogCardAnTotalType() ? 'bg-brand-shape' : ''}
            w-[300px] rounded-[5px] relative p-[23px] grow-0 shrink-0
            md:grow md:shrink 
         `}
        >
            <h3
             className={`
                ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-title'}
                text-sm mb-[55.5px]
                md:mb-[14.5px] md:text-base
             `}
            >
                {defineCurrentTitle()}
            </h3>
            <div>
                <h2
                 className={`
                    ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-title'}
                    text-3xl
                    md:text-4xl 
                 `}
                >
                    R$ {quantity} 
                </h2>
                {
                    isMobile && type !== 'total' ?
                        <span
                         className={`
                            ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-body'}
                            text-xs
                         `}
                        >
                            Última {type === 'input' ? 'entrada' : 'saída'} {date}
                        </span>
                    :
                        null
                }
            </div>
            {
                defineCurrentIcon()
            }
        </section>
    )
}