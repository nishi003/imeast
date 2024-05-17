import React, { useEffect, useState } from 'react';
import logo from '../../Assets/logo-small.png';
import user from '../../Assets/user.png';
import modules from '../../Assets/modules.png';
import purchases from '../../Assets/purchases.png';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [menu, setMenu] = useState("profile");

    useEffect(() => {
        switch (location.pathname) {
            case '/user/':
                setMenu('user');
                break;
            case '/user/module/list/':
                setMenu('modules');
                break;
            case '/user/purchase/list/':
                setMenu('purchases');
                break;
            default:
                setMenu('user');
        }
        console.log(location);
        console.log(menu);
    }, [location.pathname, menu]);

    return (
        <div className='flex flex-col h-screen w-[335px] rounded-tr-[30px] border-t border-l border-r gap-12'>
            <Link to='/' className='flex items-baseline lg:gap-2 align-bottom pl-6 pt-8'>
                <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                <p className='text-text text-5xl kalam-bold'>meast</p>
            </Link>
            <ul className='flex flex-col w-full px-3'>
                <Link to='/user/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'user' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <div className='flex h-[27.75px] w-[29.17px] justify-end items-center'><img src={user} alt='user-logo' className='h-[25px] w-auto' /></div>
                    My Information
                </Link>
                <Link to='/user/module/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'modules' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <div className='flex h-[27.75px] w-[29.17px] justify-end items-center'><img src={modules} alt='modules-logo' className='h-[23.75px] w-[24.17px]' /></div>
                    My Modules
                </Link>
                <Link to='/user/purchase/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'purchases' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <img src={purchases} alt='purchases-logo' className='h-[27.75px] w-[29.17px]' />
                    Purchase Modules
                </Link>
            </ul>
        </div>
    )
}

export default Index