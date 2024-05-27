import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UilUsersAlt, UilCreditCard } from '@iconscout/react-unicons';

import AdminUserInformation from '../../../Components/Admin/AdminUserInformation';
import AdminTransactions from '../../../Components/Admin/AdminTransactions';

import './style.css';

const Index = () => {
    const [isUsers, setIsUsers] = useState(true);

    return (
        <div className='h-full w-full bg-[#DCDCDC] px-9 py-10 overflow-hidden flex flex-col'>
            <div className='flex flex-row gap-2'>
                <Link className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isUsers ? 'bg-white' : ''}`} onClick={() => { setIsUsers(true) }} to={`/admin/user-info/user/list/`}>
                    {isUsers ?
                        <div className='flex flex-row items-center gap-1'>
                            <UilUsersAlt size='27' color='#2F2F2F' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Users</p>
                        </div>
                        :
                        <div className='flex flex-row items-center gap-1'>
                            <UilUsersAlt size='27' color='#9F9F9F' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Users</p>
                        </div>
                    }
                </Link>
                <Link className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isUsers === false ? 'bg-white' : ''}`} onClick={() => { setIsUsers(false) }} to={`/admin/user-info/transaction/list/`}>
                    {isUsers === false ?
                        <div className='flex flex-row items-center gap-1'>
                            <UilCreditCard size='27' color='#2F2F2F' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Transaction History</p>
                        </div>
                        :
                        <div className='flex flex-row items-center gap-1'>
                            <UilCreditCard size='27' color='#9F9F9F' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Transaction History</p>
                        </div>
                    }
                </Link>
            </div>
            {isUsers ?
                <AdminUserInformation />
                :
                <AdminTransactions />
            }
        </div>
    )
}

export default Index