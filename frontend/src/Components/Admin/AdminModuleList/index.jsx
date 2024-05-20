import React from 'react';
import AdminNewModuleCard from '../AdminModuleCard/AdminNewModuleCard';
import AdminModuleCard from '../AdminModuleCard';

const Index = ({ setModule }) => {
    return (
        <div className='h-full w-auto flex flex-wrap gap-8 overflow-y-scroll custom-scrollbar justify-center'>
            <AdminNewModuleCard />
            <AdminModuleCard id={1} setModule={setModule} />
            <AdminModuleCard id={2} setModule={setModule} />
            <AdminModuleCard id={3} setModule={setModule} />
            <AdminModuleCard id={4} setModule={setModule} />
            <AdminModuleCard id={5} setModule={setModule} />
            <AdminModuleCard id={6} setModule={setModule} />
            <AdminModuleCard id={7} setModule={setModule} />
            <AdminModuleCard id={8} setModule={setModule} />
            <AdminModuleCard id={9} setModule={setModule} />
        </div>
    )
}

export default Index