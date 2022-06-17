interface HeaderMobileProps {
    amountOfLogs: number;
}

export function HeaderMobile({amountOfLogs}:HeaderMobileProps) {
    function verifyAmountOfLogs() {
        if(amountOfLogs > 1)
        {
            return `${amountOfLogs} itens`
        } else if(amountOfLogs > 0) {
            return `${amountOfLogs} item`
        } else if(amountOfLogs === 0) {
            return `${amountOfLogs} item`
        }
    }

    return(
        <section className='flex justify-between mb-[15px]'>
            <h2 className="text-xl text-brand-text-title">Listagem</h2>
            <span className="text-sm text-brand-text-body">{verifyAmountOfLogs()}</span>
        </section>
    )
}