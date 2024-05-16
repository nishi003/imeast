import React, { useState } from 'react';
import AllModules from '../../Components/AllModules';
import AdminModuleInfo from '../../Components/AdminModuleInfo';
import './style.css'

const Index = () => {
    const [moduleID, setModuleID] = useState(1);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex flex-col px-9 py-10 gap-4 overflow-hidden'>
            <div className='first-container h-auto w-full flex flex-row overflow-x-scroll pb-4'>
                <AllModules moduleID={moduleID} setModuleID={setModuleID} />
            </div>
            <AdminModuleInfo moduleID={moduleID} />
        </div>
    )
}

export default Index