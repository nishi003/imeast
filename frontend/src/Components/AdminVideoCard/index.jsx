import React from 'react';

const Index = ({ lesson, title, setVideo }) => {
    return (
        <button className='flex flex-row w-full items-start gap-6' onClick={() => { setVideo(lesson) }}>
            <div className='bg-[#D9D9D9] w-[240px] h-[135px]' />
            <div className='flex flex-col items-start'>
                <p className='poppins-bold text-xl'>LESSON {lesson}:</p>
                <p className='poppins-regular text-base'>{title}</p>
            </div>
        </button>
    )
}

export default Index