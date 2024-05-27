import React from 'react';
import AdminAllUsers from './AdminAllUsers';

const Index = () => {
    return (
        <div className='h-full w-full flex-grow-0 flex flex-col overflow-hidden bg-white rounded-b-[30px] rounded-r-[30px]'>
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
                <AdminAllUsers />
            </div>
        </div>
    )
}

export default Index