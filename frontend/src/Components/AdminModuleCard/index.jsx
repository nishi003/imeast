import React from 'react';

const Index = ({ id, title, description, moduleID, setModuleID }) => {
    return (
        <button className='flex flex-col items-center' onClick={() => setModuleID(moduleID)}>
            <div className='h-[106px] w-[106px] rounded-full bg-[#91C28D] mb-[-53px] z-10' />
            <div className={`h-[164px] w-[268px] rounded-[30px] pb-9 flex flex-col justify-end gap-1 ${moduleID === id ? 'bg-[#DEF1DD]' : 'bg-white'}`}>
                <p className='poppins-medium text-2xl'>{title}</p>
                <p className={`text-sm ${moduleID === id ? 'poppins-bold' : 'poppins-medium'}`}>{description}</p>
            </div>
        </button>
    )
}

export default Index