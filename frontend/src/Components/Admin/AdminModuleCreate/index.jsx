import React from 'react';
import { Link } from 'react-router-dom';
import { UilAngleLeft } from '@iconscout/react-unicons';

const Index = ({ setModule }) => {
    return (
        <div className='w-full h-full rounded-[30px] bg-white flex flex-col flex-grow-0 flex-shrink-0 p-8'>
            <div className='flex flex-col overflow-hidden'>
                <Link onClick={() => setModule(-1)} className='w-auto flex h-auto flex-row items-center' to={`/admin/module/list/`}>
                    <UilAngleLeft color='#505050' />
                    <p className='poppins-bold text-[#505050] text-base'>Back</p>
                </Link>
                <div className='h-full w-full flex flex-row overflow-hidden'>
                </div>
            </div>
        </div>
    )
}

export default Index