import React from 'react';
import UserModuleCard from '../../Components/UserModuleCard';
import './style.css';

const Index = () => {

    return (
        <div className='flex h-full w-full overflow-hidden py-14 px-8 bg-[#DEF1DD]'>
            <div className='h-full w-full flex flex-wrap justify-center gap-8 overflow-y-scroll custom-scrollbar'>
                <UserModuleCard id={0} registered={false} />
                <UserModuleCard id={1} registered={true} />
                <UserModuleCard id={2} registered={true} />
                <UserModuleCard id={3} registered={true} />
                <UserModuleCard id={4} registered={true} />
                <UserModuleCard id={5} registered={true} />
            </div>
        </div>
    )
}

export default Index