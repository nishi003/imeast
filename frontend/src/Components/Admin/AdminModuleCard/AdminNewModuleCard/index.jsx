import React from 'react';
import { Link } from 'react-router-dom';
import { UilPlusCircle } from '@iconscout/react-unicons';

const Index = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[480px] w-[480px] bg-secondary rounded-[30px] px-8 pb-8 pt-10'>
            <Link className='w-[300px] h-[300px] rounded-full flex flex-row justify-center items-center shadow-md hover:scale-105 duration-200 bg-[#91C28D] gap-2' to={`/admin/module/create/`}>
                <UilPlusCircle color='#ffffff' size='35' />
                <p className='text-white poppins-semibold text-3xl'>MODULE</p>
            </Link>
        </div>
    )
}

export default Index