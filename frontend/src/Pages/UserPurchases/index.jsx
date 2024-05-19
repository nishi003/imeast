import React, { useState } from 'react';

const Index = () => {
    const [modules, setModules] = useState([]);

    return (
        <div className='h-full w-full bg-[#DEF1DD] flex flex-wrap p-4'>
            User Purchases, accessed at /user/purchase/list/
        </div>
    )
}

export default Index