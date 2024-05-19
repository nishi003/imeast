import React from 'react';

const Index = ({ lesson, title }) => {
    return (
        <div className='flex flex-col h-auto w-[208px] items-start gap-1'>
            <div className='bg-[#D9D9D9] h-[117px] w-full' />
            <div className='flex flex-col items-start'>
                <p className='poppins-medium text-[12px]'>Lesson {lesson}:</p>
                <p className='poppins-medium text-[8px] mt-[-2px]'>{title}</p>
            </div>
        </div>
    )
}

export default Index