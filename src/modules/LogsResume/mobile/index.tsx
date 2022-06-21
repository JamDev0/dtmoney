import { DateTime } from "luxon";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar, IconProps } from "phosphor-react";

interface MobileProps {
    type: 'output' | 'input' | 'total';
    quantity: string;
    date?: [number, number, number, number, number];
}

export function Mobile({quantity, type, date}: MobileProps) {
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
        if(Number(quantity) === 0) {
            return true;
        } else {
            return Math.sign(Number(quantity)) === 1;
        }
    }

    return(
        <section
         className={`
            ${isThisLogCardAnTotalType() && isThisQuantityPositive() ? 'bg-brand-green' : ''}
            ${isThisLogCardAnTotalType() && !isThisQuantityPositive() ? 'bg-brand-red' : ''}
            ${!isThisLogCardAnTotalType() ? 'bg-brand-shape' : ''}
            w-[300px] rounded-[5px] relative p-[23px] grow-0 shrink-0
         `}
        >
            <h3
             className={`
                ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-title'}
                text-sm mb-[55.5px]
             `}
            >
                {defineCurrentTitle()}
            </h3>
            <div>
                <h2
                 className={`
                    ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-title'}
                    text-3xl
                 `}
                >
                    R$ {quantity} 
                </h2>
                {
                    type !== 'total' ?
                        <span
                         className={`
                            ${isThisLogCardAnTotalType() ? 'text-brand-shape' : 'text-brand-text-body'}
                            text-xs
                         `}
                        >
                            {
                                date![0] > 0 ?
                                    (
                                        `Última ${type === 'input' ? 'entrada' : 'saída'} ${DateTime.local(date![0], date![1], date![2], date![3], date![4]).toRelative()}`
                                    )
                                :
                                    null
                            }

                            
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