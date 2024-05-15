import React, { useEffect, useState } from 'react';
import logo from '../../Assets/logo-small.png';
import dashboard from '../../Assets/dashboard.png';
import modules from '../../Assets/modules.png';
import user from '../../Assets/user.png';
import forum from '../../Assets/forum.png';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [menu, setMenu] = useState("dashboard");

    useEffect(() => {
        console.log(location.pathname); // Log pathname to the console
        switch (location.pathname) {
            case '/admin/module/list/':
                setMenu('modules');
                break;
            case '/admin/user-info/':
                setMenu('user-info');
                break;
            case '/admin/forum/':
                setMenu('forum');
                break;
            default:
                setMenu('dashboard');
        }
        console.log(menu);
    }, [location.pathname]);

    return (
        <div className='flex flex-col h-screen w-[335px] rounded-r-[30px] border gap-12'>
            <Link to='/' className='flex items-baseline lg:gap-2 align-bottom pl-6 pt-8'>
                <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                <p className='text-text text-5xl kalam-bold'>meast</p>
            </Link>
            <ul className='flex flex-col w-full px-3'>
                <Link to='/admin/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'dashboard' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <img src={dashboard} alt='dashboard-logo' className='h-[25px] w-[25px]' />
                    Dashboard
                </Link>
                <Link to='/admin/module/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'modules' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <img src={modules} alt='modules-logo' className='h-[25px] w-[25px]' />
                    Modules
                </Link>
                <Link to='/admin/user-info/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'user-info' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <div className='flex h-[25px] w-[25px] justify-center'><img src={user} alt='user-logo' className='h-[25px] w-auto' /></div>
                    User Information
                </Link>
                <Link to='/admin/forum/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'forum' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <img src={forum} alt='forum-logo' className='h-[25px] w-[25px]' />
                    Forum
                </Link>
            </ul>
        </div>
    )
}

export default Index