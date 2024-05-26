import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UilPlusCircle } from '@iconscout/react-unicons';

const Index = (moduleNumber) => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/admin/module/create/${moduleNumber.moduleNumber}/`);
    }

    return (
        <div className='flex flex-col justify-center items-center h-[480px] w-[480px] bg-secondary rounded-[30px] px-8 pb-8 pt-10'>
            <button className='w-[300px] h-[300px] rounded-full flex flex-row justify-center items-center shadow-md hover:scale-105 duration-200 bg-[#91C28D] gap-2' onClick={handleCreate}>
                <UilPlusCircle color='#ffffff' size='35' />
                <p className='text-white poppins-semibold text-3xl'>MODULE</p>
            </button>
        </div>
    )
}

export default Index