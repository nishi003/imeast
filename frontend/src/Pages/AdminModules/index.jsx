import React, { useState } from 'react';
import AllModules from '../../Components/AllModules';
import './style.css'

const Index = () => {
    const [moduleID, setModuleID] = useState(1);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex flex-col px-9 py-10 gap-7 overflow-hidden'>
            <div className='w-full flex flex-row overflow-x-scroll pb-4'>
                <AllModules moduleID={moduleID} setModuleID={setModuleID} />
            </div>
        </div>
    )
}

export default Index