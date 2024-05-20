import React from 'react';
import { Link } from 'react-router-dom';
import { UilTrashAlt } from '@iconscout/react-unicons';

const Index = ({ name, date, type, status }) => {
    return (
        <Link className={`w-full h-auto px-6 py-2 border rounded-[10px] flex flex-row gap-3 items-center hover:border-[#91C28D] justify-between ${status === 'unread' ? 'bg-[#DEF1DD] border-[#91C28D] hover:border-accent-200' : 'border-[#DCDCDC]'}`}>
            <div className='flex flex-row gap-4 items-center w-[400px] justify-start'>
                <div className='w-[50px] h-[50px] rounded-full bg-[#D9D9D9]' />
                <p className='poppins-semibold text-[15px] text-black'>{name}</p>
            </div>
            <p className='poppins-semibold text-[15px] text-black w-[140px] text-center'>{date}</p>
            <p className='poppins-semibold text-[15px] text-black w-[140px] text-center'>
                {type === 'comment' ?
                    <>New Comment</>
                    :
                    <>New Purchase</>
                }
            </p>
            <div className='flex w-[100px] justify-center'>
                <div className='flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#91C28D] hover:scale-105 hover:duration-200'>
                    <UilTrashAlt color='#ffffff' size='25' />
                </div>
            </div>
        </Link>
    )
}

export default Index