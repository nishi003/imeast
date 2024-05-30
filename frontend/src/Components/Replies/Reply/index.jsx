import React from 'react';

const Index = ({ name, date, content, isAdmin }) => {
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate()).toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className='flex flex-col pl-4'>
            <div className='flex flex-row gap-2 items-baseline'>
                {isAdmin ?
                    <p className='poppins-medium text-xs text-accent-200'>Admin</p>
                    :
                    <p className='poppins-medium text-xs text-[#505050]'>{name}</p>
                }
                <p className='poppins-medium text-[10px] text-[#9F9F9F]'>Posted on {formatDate(date)}</p>
            </div>
            <p className='poppins-medium text-sm'>{content}</p>
        </div>
    )
}

export default Index