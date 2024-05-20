import React from 'react';

const TransactionCard = ({ date, time, module, total, status }) => {
    return (
        <div className='w-full h-auto p-6 bg-secondary rounded-[10px] flex flex-row gap-3 items-center justify-between'>
            <p className='poppins-semibold text-xl text-black'>{module}</p>
            <p className='poppins-semibold text-base text-black w-[140px] text-center'>{date}</p>
            <p className='poppins-semibold text-base text-black w-[50px]'>{time}</p>
            <p className='poppins-semibold text-base text-black w-[50px]'>{total}</p>
            {status === 'completed' && (
                <p className='poppins-semibold text-base text-accent-200 w-[170px]'>Payment Complete</p>
            )}
            {status === 'refunded' && (
                <p className='poppins-semibold text-base text-[#C49754] w-[170px]'>Refunded</p>
            )}
        </div>
    );
}

export default TransactionCard;