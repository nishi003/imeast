import React from 'react';
import AdminAllTransactions from './AdminAllTransactions';

const Index = () => {
    return (
        <div className='h-full w-full flex-grow-0 flex flex-col overflow-hidden bg-white rounded-[30px]'>
            <div className='w-full h-auto px-14 py-4 border-b border-[#DCDCDC] gap-3 flex flex-row items-baseline justify-between'>
                <p className='poppins-semibold text-sm text-[#767676] w-[400px]'>User</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[140px]'>Transaction Date</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[50px]'>Time</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[350px]'>Module Number & Name</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[60px]'>Total</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[170px]'>Payment Status</p>
            </div>
            <div className='h-full w-full overflow-hidden px-8 py-4 justify-center'>
                <AdminAllTransactions />
            </div>
        </div>
    )
}

export default Index