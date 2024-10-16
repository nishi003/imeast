import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import logo from '../../../Assets/logo-small.png';

const Index = () => {
    return (
        <div className='flex flex-col h-screen w-screen overflow-hidden'>
            <div className='w-full h-[94px] flex-shrink-0 border-b flex justify-between items-center px-20 py-6'>
                <Link to='/' className='flex items-baseline lg:gap-2 align-bottom'>
                    <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                    <p className='text-text text-5xl kalam-bold'>meast</p>
                </Link>
                <div className='flex flex-row gap-4 pl-4 border-l border-[#DCDCDC]'>
                    <div className='h-[50px] w-[50px] rounded-full bg-[#9F9F9F]' />
                    <div className='flex flex-col justify-center'>
                        <p className='poppins-medium text-xl'>Admin Account Name</p>
                        <p className='poppins-medium text-sm mt-[-6px] text-[#505050]'>Admin</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex flex-row overflow-hidden'>
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Index