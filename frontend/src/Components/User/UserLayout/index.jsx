import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserNavbar from '../UserNavbar';
import logo from '../../../Assets/logo-small.png';
import DropdownMenu from '../../DropdownMenu';

const Index = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div className='flex h-screen flex-col w-screen overflow-hidden'>
            <div className='w-full h-[94px] flex-shrink-0 border-b flex justify-between items-center px-20 py-6'>
                <Link to='/' className='flex items-baseline lg:gap-2 align-bottom'>
                    <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                    <p className='text-text text-5xl kalam-bold'>meast</p>
                </Link>
                <button className='flex flex-col relative' onClick={() => setMenu(!menu)}>
                    <div className='flex flex-row gap-4 justify-center items-center px-2'>
                        <p className='poppins-bold text-xl'>EUGENE JANG</p>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#DEF1DD]' />
                    </div>
                    {menu ? <DropdownMenu /> : <></>}
                </button>
            </div>
            <div className='w-full h-full flex flex-row overflow-hidden'>
                <UserNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Index