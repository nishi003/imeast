import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModuleContext } from '../../../Contexts/MLCContext';

const Index = ({ id, index, title, image, duration, description }) => {
    const navigate = useNavigate();
    const { setModuleNumber } = useContext(ModuleContext);

    const handleClick = () => {
        navigate(`/admin/module/${id}/`);
        setModuleNumber(index);
    }

    return (
        <div className='flex flex-col justify-between items-center h-[480px] w-[480px] bg-white rounded-[30px] p-8'>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex flex-row items-center gap-6'>
                    <div className='h-[80px] w-[80px] bg-[#91C28D] rounded-full' />
                    <div className='flex flex-col'>
                        <p className='poppins-bold text-black text-[30px]'>MODULE {index}:</p>
                        <p className='poppins-bold text-black text-[15px]'>{title}</p>
                    </div>
                </div>
                <p className='mt-4 poppins-bold text-[#2F2F2F] text-[15px]'>DURATION: {duration}</p>
                <p className='poppins-bold text-[#2F2F2F] text-[15px]'>{description}</p>
            </div>
            <button onClick={handleClick} className='w-[300px] h-[40px] rounded-[20px] flex justify-center items-center shadow-md hover:scale-105 duration-200 bg-[#91C28D]'>
                <p className='text-white poppins-semibold text-[15px]'>VIEW</p>
            </button>
        </div>
    )
}

export default Index