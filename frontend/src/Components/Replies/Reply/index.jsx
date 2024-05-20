import React from 'react';

const Index = ({ name, date, content, isAdmin }) => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-2 items-baseline'>
                {isAdmin ?
                    <div className='flex px-2 py-[2px] bg-secondary rounded-xl items-center'>
                        <p className='poppins-medium text-xs'>Admin</p>
                    </div>
                    :
                    <p className='poppins-medium text-xs text-[#505050]'>{name}</p>
                }
                <p className='poppins-medium text-[10px] text-[#9F9F9F]'>{date}</p>
            </div>
            <p className='poppins-medium text-sm'>{content}</p>
        </div>
    )
}

export default Index