import React, { useEffect, useState } from 'react';
import { UilFilePlusAlt, UilFileAlt, UilUser } from '@iconscout/react-unicons';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [menu, setMenu] = useState("profile");

    useEffect(() => {
        const path = location.pathname;

        if (path === '/user/') {
            setMenu('user');
        } else if (path === '/user/module/list/') {
            setMenu('modules');
        } else if (/^\/user\/module\/\d+\/$/.test(path)) {
            setMenu('modules');
        } else if (/^\/user\/module\/\d+\/video\/\d+$/.test(path)) {
            setMenu('modules');
        } else if (path === '/user/purchase/list/') {
            setMenu('purchases');
        } else {
            setMenu('user');
        }

        console.log(location);
        console.log(menu);
    }, [location.pathname]);

    return (
        <div className='flex flex-col h-full w-[285px] border-r pt-16 flex-shrink-0'>
            <ul className='flex flex-col w-full px-3'>
                <Link to='/user/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'user' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilUser size='30' />
                    Profile
                </Link>
                <Link to='/user/module/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'modules' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilFileAlt size='30' />
                    My Modules
                </Link>
                <Link to='/user/purchase/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'purchases' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilFilePlusAlt size='30' />
                    Purchase Modules
                </Link>
            </ul>
        </div>
    )
}

export default Index