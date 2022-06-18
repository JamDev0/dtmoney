import Logo from '../assets/Logo.svg';

import { useState } from 'react';

interface HeaderProps {
    openModalFunction: () => void;
}

export function Header({openModalFunction}:HeaderProps) {

    

    return (
        <header
         className="
            p-[24px] bg-brand-purple-500 h-[234px] overflow-y-visible
            md:py-[36px] md:px-[160px] md:flex md:flex-col md:justify-between md:pb-0
         "
        >
            <div
             className='
                flex items-start justify-between
             '
            >

                <img
                className='
                    w-[8.4rem] h-[1.8rem]
                    md:w-[10.75rem] md:h-[2.5rem]
                '
                alt='dtmoney (Logo do site)'
                src={Logo}
                ></img>

                <button
                className='
                    bg-brand-purple-400 px-4 h-[1.8rem] rounded-[5px] text-brand-shape font-semibold text-xs transition duration-300
                    hover:filter hover:brightness-90 
                    md:h-[2.5rem] md:text-base md:px-8
                '
                onClick={event => {openModalFunction(); event.currentTarget.blur()}}
                >
                    Nova transação
                </button>
            </div>
        </header>
    )
}