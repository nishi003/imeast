import React from 'react';
import UserModulePurchaseCard from '../../../Components/User/UserModulePurchaseCard';
import './style.css';

const Index = () => {

    return (
        <div className='flex h-full w-full overflow-hidden p-8 bg-[#DEF1DD]'>
            <div className='h-full w-full flex flex-wrap justify-center gap-8 overflow-y-scroll custom-scrollbar'>
                <UserModulePurchaseCard id={0} inPersonRegistered={true} onlineRegistered={true} />
                <UserModulePurchaseCard id={1} inPersonRegistered={true} onlineRegistered={false} />
                <UserModulePurchaseCard id={2} inPersonRegistered={false} onlineRegistered={true} />
                <UserModulePurchaseCard id={3} inPersonRegistered={false} onlineRegistered={false} />
                <UserModulePurchaseCard id={4} inPersonRegistered={false} onlineRegistered={false} />
                <UserModulePurchaseCard id={5} inPersonRegistered={false} onlineRegistered={false} />
                <UserModulePurchaseCard id={6} inPersonRegistered={false} onlineRegistered={false} />
            </div>
        </div>
    )
}

export default Index