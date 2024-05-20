import React from 'react';
import UserModuleCard from '../../Components/UserModuleCard';
import './style.css';

const Index = () => {

    return (
        <div className='flex h-full w-full overflow-hidden p-8 bg-[#DEF1DD]'>
            <div className='h-full w-full flex flex-wrap justify-center gap-8 overflow-y-scroll custom-scrollbar'>
                <UserModuleCard />
                <UserModuleCard />
                <UserModuleCard />
                <UserModuleCard />
                <UserModuleCard />
                <UserModuleCard />
            </div>
        </div>
    )
}

export default Index