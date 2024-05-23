import React, { useState } from 'react';
import { UilEllipsisV } from '@iconscout/react-unicons';

const Index = ({ name, date, time, module, total, status }) => {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className='w-full h-auto px-6 py-2 border border-[#DCDCDC] hover:border-primary rounded-[10px] flex flex-row gap-3 items-center justify-between'>
            <div className='flex flex-row gap-4 items-center w-[400px] justify-start'>
                <div className='w-[50px] h-[50px] rounded-full bg-[#D9D9D9]' />
                <p className='poppins-semibold text-[15px] text-black'>{name}</p>
            </div>
            <p className='poppins-semibold text-[15px] text-black w-[140px]'>{date}</p>
            <p className='poppins-semibold text-[15px] text-black w-[50px]'>{time}</p>
            <p className='poppins-semibold text-[15px] text-black w-[350px]'>{module}</p>
            <p className='poppins-semibold text-[15px] text-black w-[60px]'>${total}</p>
            <div className='w-[170px] flex flex-row justify-between'>
                <p className={`poppins-semibold text-[15px] ${status === 'completed' ? 'text-[#669162]' : 'text-[#C45454]'}`}>
                    {status === 'completed' ?
                        <>Payment Complete</>
                        :
                        <>Refunded</>
                    }
                </p>
                <button>
                    <UilEllipsisV className='mr-[-16px]' />
                </button>
            </div>
        </div>
    )
}

export default Index