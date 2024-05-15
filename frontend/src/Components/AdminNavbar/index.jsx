import React, { useState } from 'react';
import logo from '../../Assets/logo-small.png';
import dashboard from '../../Assets/dashboard.png';
import modules from '../../Assets/modules.png';
import user from '../../Assets/user.png';
import forum from '../../Assets/forum.png';
import { Link } from 'react-router-dom';

const Index = () => {
    const [menu, setMenu] = useState("dashboard");

    return (
        <div className='flex flex-col h-screen w-[335px] rounded-r-[30px] border gap-12'>
            <Link to='/' className='flex items-baseline lg:gap-2 align-bottom pl-6 pt-8'>
                <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                <p className='text-text text-5xl kalam-bold'>meast</p>
            </Link>
            <ul className='flex flex-col w-full px-3'>
                {menu === 'dashboard' ?
                    <li className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 bg-[#DEF1DD] rounded-[15px] cursor-default' onClick={() => { setMenu("dashboard") }}>
                        <img src={dashboard} alt='dashboard-logo' className='h-[25px] w-[25px]' />
                        Dashboard
                    </li>
                    :
                    <li className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 hover:scale-105 duration-200 cursor-pointer' onClick={() => { setMenu("dashboard") }}>
                        <img src={dashboard} alt='dashboard-logo' className='h-[25px] w-[25px]' />
                        Dashboard
                    </li>
                }
                {
                    menu === 'modules' ?
                        <li className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 bg-[#DEF1DD] rounded-[15px] cursor-default' onClick={() => { setMenu("modules") }}>
                            <img src={modules} alt='modules-logo' className='h-[25px] w-[25px]' />
                            Modules
                        </li>
                        :
                        <li className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 hover:scale-105 duration-200 cursor-pointer' onClick={() => { setMenu("modules") }}>
                            <img src={modules} alt='modules-logo' className='h-[25px] w-[25px]' />
                            Modules
                        </li>
                }
                {
                    menu === 'user-info' ?
                        <li to='' className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 bg-[#DEF1DD] rounded-[15px] cursor-default' onClick={() => { setMenu("user-info") }}>
                            <div className='flex h-[25px] w-[25px] justify-center'><img src={user} alt='user-logo' className='h-[25px] w-auto' /></div>
                            User Information
                        </li>
                        :
                        <li to='' className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 hover:scale-105 duration-200 cursor-pointer' onClick={() => { setMenu("user-info") }}>
                            <div className='flex h-[25px] w-[25px] justify-center'><img src={user} alt='user-logo' className='h-[25px] w-auto' /></div>
                            User Information
                        </li>
                }
                {menu === 'forum' ?
                    <li to='' className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 bg-[#DEF1DD] rounded-[15px] cursor-default' onClick={() => { setMenu("forum") }}>
                        <img src={forum} alt='forum-logo' className='h-[25px] w-[25px]' />
                        Forum
                    </li>
                    :
                    <li to='' className='w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 hover:scale-105 duration-200 cursor-pointer' onClick={() => { setMenu("forum") }}>
                        <img src={forum} alt='forum-logo' className='h-[25px] w-[25px]' />
                        Forum
                    </li>
                }
            </ul>
        </div>
    )
}

export default Index