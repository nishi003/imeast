import React from 'react';

const Index = ({ title }) => {
    return (
        <div className='flex flex-col h-auto w-full items-start gap-2'>
            <div className='bg-[#D9D9D9] h-[150px] w-full' />
            <p className='poppins-medium text-xs'>{title}</p>
        </div>
    )
}

export default Index