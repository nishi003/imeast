import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserNavbar from '../UserNavbar';

const Index = () => {
    return (
        <div className='flex h-screen flex-row'>
            <UserNavbar />
            <div className='flex flex-col w-full overflow-hidden'>
                <div className='w-full h-[94px] border-b flex justify-end items-center px-9'>
                    <Link to='/admin/' className='flex flex-row gap-4 justify-center items-center'>
                        <p className='poppins-bold text-xl'>EUGENE JANG</p>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#9F9F9F]' />
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Index