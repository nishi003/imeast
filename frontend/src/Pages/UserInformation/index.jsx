import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import users from '../../Assets/users.png';
import { UilUsersAlt, UilCreditCard } from '@iconscout/react-unicons';
import users_inactive from '../../Assets/users-i.png';
import transaction from '../../Assets/transaction.png';
import transaction_inactive from '../../Assets/transaction-i.png';
import UserCard from '../../Components/UserCard';
import TransactionCard from '../../Components/TransactionCard';

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
            <div className={`h-full w-full flex-grow-0 flex flex-col overflow-hidden bg-white ${isUsers ? 'rounded-b-[30px] rounded-r-[30px]' : 'rounded-[30px]'} `}>
                {isUsers ?
                    <>
                        <div className='w-full h-auto px-10 py-4 border-b border-[#DCDCDC] justify-between flex flex-row items-baseline'>
                            <p className='poppins-semibold text-sm text-[#767676] w-[80px]'>15 Users</p>
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
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                                <UserCard name='Eugene Jang' birthday='2003.06.24' email='emailoverhere@gmail.com' phone='604-459-3405' address='405-889 West Pender St. Vancouver, BC. V6C 3B2' profession='Naturopathic Doctor' period='Less than 1 year' license='CAMD-9999-9999' college='University of Waterloo' sex='Female' purchases={8} registered='2024.03.07' />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='w-full h-auto px-14 py-4 border-b border-[#DCDCDC] gap-3 flex flex-row items-baseline justify-between'>
                            <p className='poppins-semibold text-sm text-[#767676] w-[400px]'>User</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[140px]'>Transaction Date</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[50px]'>Time</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[350px]'>Module Number & Name</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[60px]'>Total</p>
                            <p className='poppins-semibold text-xs text-[#767676] w-[170px]'>Payment Status</p>
                        </div>
                        <div className='h-full w-full overflow-hidden px-8 py-4 justify-center'>
                            <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='processing' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='incomplete' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='processing' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='incomplete' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='processing' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='incomplete' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='processing' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
                                <TransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='incomplete' />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Index