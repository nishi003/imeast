import React, { useState } from 'react';
import users from '../../Assets/users.png';
import users_inactive from '../../Assets/users-i.png';
import transaction from '../../Assets/transaction.png';
import transaction_inactive from '../../Assets/transaction-i.png';
import UserCard from '../../Components/UserCard';

import './style.css';

const Index = () => {
    const [isUsers, setIsUsers] = useState(true);

    return (
        <div className='h-full w-full bg-[#DCDCDC] px-9 py-10 overflow-hidden flex flex-col'>
            <div className='flex flex-row gap-2'>
                <button className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isUsers ? 'bg-white' : ''}`} onClick={() => { setIsUsers(true) }}>
                    {isUsers ?
                        <>
                            <img src={users} alt='users' className='w-[28.3px] h-[22.5px]' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Users</p>
                        </>
                        :
                        <>
                            <img src={users_inactive} alt='users' className='w-[28.3px] h-[22.5px]' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Users</p>
                        </>
                    }
                </button>
                <button className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isUsers === false ? 'bg-white' : ''}`} onClick={() => { setIsUsers(false) }}>
                    {isUsers === false ?
                        <>
                            <img src={transaction} alt='users' className='w-[28.3px] h-[22.5px]' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Transaction History</p>
                        </>
                        :
                        <>
                            <img src={transaction_inactive} alt='users' className='w-[28.3px] h-[22.5px]' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Transaction History</p>
                        </>
                    }
                </button>
            </div>
            <div className={`h-full w-full flex-grow-0 flex flex-col overflow-hidden bg-white ${isUsers ? 'rounded-b-[30px] rounded-r-[30px]' : 'rounded-[30px]'} `}>
                {isUsers ?
                    <>
                        <div className='w-full h-auto px-8 py-4 border-b border-[#DCDCDC] gap-3 flex flex-row items-baseline'>
                            <p className='poppins-semibold text-sm text-[#767676] w-[80px] mr-2 text-center'># Users</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[300px]'>User</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[200px]'>Profession</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[140px]'>Practicing Period</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[150px]'>License Number</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[190px]'>Registered College</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[70px]'>Sex</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[100px]'># of Purchases</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[120px] ml-2'>Resgistration Date</p>
                        </div>
                        <div className='h-full w-full overflow-hidden px-8 py-4 justify-center'>
                            <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                            </div>
                        </div>
                    </>
                    :
                    <></>
                }

            </div>
        </div>
    )
}

export default Index