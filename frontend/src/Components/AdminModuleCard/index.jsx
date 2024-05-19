import React from 'react';

const Index = ({ id, title, category, moduleID, setModuleID }) => {
    return (
        <button className='flex flex-col items-center' onClick={() => setModuleID(id)}>
            <div className={`h-[106px] w-[106px] rounded-full bg-[#91C28D] mb-[-53px] z-10 ${moduleID === id ? 'border' : ''}`} />
            <div className={`h-[164px] w-[268px] rounded-[30px] pb-9 flex flex-col justify-end gap-1 bg-white ${moduleID === id ? 'border' : ''}`}>
                <p className='poppins-medium text-2xl'>{title}</p>
                <p className={`text-sm ${moduleID === id ? 'poppins-bold' : 'poppins-medium'}`}>{category}</p>
            </div>
        </button>
    )
}

export default Index