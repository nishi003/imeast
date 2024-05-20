import React, { useEffect, useState } from 'react';
import { UilBell, UilUser, UilFileAlt } from '@iconscout/react-unicons';
import { Link, useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [menu, setMenu] = useState("dashboard");

    useEffect(() => {
        switch (location.pathname) {
            case '/admin/module/list/':
                setMenu('modules');
                break;
            case '/admin/user-info/user/list/':
                setMenu('user-info');
                break;
            case '/admin/user-info/transaction/list/':
                setMenu('user-info');
                break;
            case '/admin/notifications/':
                setMenu('notifications');
                break;
            default:
                setMenu('modules');
        }
    }, [location.pathname, menu]);

    return (
        <div className='flex flex-col h-full w-[285px] border-r pt-16 flex-shrink-0'>
            <ul className='flex flex-col w-full px-3'>
                <Link to='/admin/module/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'modules' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilFileAlt size='30' />
                    Modules
                </Link>
                <Link to='/admin/user-info/user/list/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'user-info' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilUser size='30' />
                    User Information
                </Link>
                <Link to='/admin/notifications/' className={`w-full h-[54px] poppins-semibold flex px-4 justify-left items-center gap-4 ${menu === 'notifications' ? 'bg-[#DEF1DD] rounded-[15px] cursor-default' : 'hover:scale-105 duration-200 cursor-pointer'}`}>
                    <UilBell size='30' />
                    Notifications
                </Link>
            </ul>
        </div>
    )
}

export default Index