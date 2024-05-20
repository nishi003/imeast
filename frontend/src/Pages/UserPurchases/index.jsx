import React from 'react';
import UserModulePurchaseCard from '../../Components/UserModulePurchaseCard';
import './style.css';

const Index = () => {

    return (
        <div className='flex h-full w-full overflow-hidden p-8 bg-[#DEF1DD]'>
            <div className='h-full w-full flex flex-wrap justify-center gap-8 overflow-y-scroll custom-scrollbar'>
                <UserModulePurchaseCard id={0} registered={false} />
                <UserModulePurchaseCard id={1} registered={true} />
                <UserModulePurchaseCard id={2} registered={true} />
                <UserModulePurchaseCard id={3} registered={true} />
                <UserModulePurchaseCard id={4} registered={true} />
                <UserModulePurchaseCard id={5} registered={true} />
                <UserModulePurchaseCard id={6} registered={true} />
            </div>
        </div>
    )
}

export default Index