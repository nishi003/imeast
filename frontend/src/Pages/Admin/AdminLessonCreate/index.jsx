import React from 'react';

import { UilAngleLeft } from '@iconscout/react-unicons';
import { useNavigate, useParams } from 'react-router-dom';

import './style.css';

const Index = () => {
    const navigate = useNavigate();
    const { moduleID, numLesson } = useParams();

    const handleBack = () => {
        navigate(`/admin/module/${moduleID}/`);
    }

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 overflow-hidden'>
            <div className='w-full h-full rounded-[30px] bg-white flex flex-col flex-grow-0 flex-shrink-0 p-8 overflow-hidden gap-4'>
                <button className='w-auto flex h-auto flex-row items-center flex-shrink-0' onClick={handleBack}>
                    <UilAngleLeft color='#505050' />
                    <p className='poppins-bold text-[#505050] text-base'>Back</p>
                </button>
                <div className='h-full w-full flex flex-col overflow-y-scroll px-6 gap-2 custom-scrollbar'>

                </div>
            </div>
        </div>
    )
}

export default Index