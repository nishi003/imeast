import React from 'react';
import { Link } from 'react-router-dom';
import { UilPlusCircle } from '@iconscout/react-unicons';

const Index = ({ module, video, setVideo }) => {
    return (
        <>
            {video === -1 ?
                <Link className='flex flex-col gap-1' to={`/admin/module/${module}/video/create/`} onClick={() => { setVideo(-1) }}>
                    <div className='bg-primary w-[240px] h-[135px] flex flex-col justify-center items-center flex-shrink-0'>
                        <UilPlusCircle color="#ffffff" size='40' />
                        <p className='text-white poppins-semibold text-2xl'>VIDEO</p>
                    </div>
                </Link>
                :
                <Link className='flex flex-col gap-1' to={`/admin/module/${module}/video/create/`} onClick={() => { setVideo(-1) }}>
                    <div className='bg-primary w-[263px] h-[148px] flex flex-col justify-center items-center flex-shrink-0'>
                        <UilPlusCircle color="#ffffff" size='40' />
                        <p className='text-white poppins-semibold text-2xl'>VIDEO</p>
                    </div>
                </Link>
            }
        </>
    )
}

export default Index