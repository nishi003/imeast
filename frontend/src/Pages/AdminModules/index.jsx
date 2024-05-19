import React, { useState } from 'react';
import AllModules from '../../Components/AllModules';
import AdminModuleInfo from '../../Components/AdminModuleInfo';
import './style.css';

const Index = () => {
    const [moduleID, setModuleID] = useState(1);

    return (
        <div className='h-full w-full bg-[#DEF1DD] flex p-8 flex-col gap-4 overflow-hidden'>
            <div className='h-auto w-full flex flex-row flex-shrink-0 overflow-x-scroll pb-4'>
                <AllModules moduleID={moduleID} setModuleID={setModuleID} />
            </div>
            <AdminModuleInfo moduleID={moduleID} />
        </div>
    )
}

export default Index