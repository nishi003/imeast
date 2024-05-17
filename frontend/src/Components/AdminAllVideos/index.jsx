import React from 'react';
import AdminVideoCard from '../AdminVideoCard';

const Index = ({ moduleID }) => {
    return (
        <div className='flex flex-col gap-4 w-auto'>
            <AdminVideoCard lesson={1} title='Video Title 1' />
            <AdminVideoCard lesson={2} title='Video Title 2' />
            <AdminVideoCard lesson={3} title='Video Title 3' />
            {/* <AdminVideoCard lesson={4} title='Video Title 4' />
            <AdminVideoCard lesson={5} title='Video Title 5' />
            <AdminVideoCard lesson={6} title='Video Title 6' />
            <AdminVideoCard lesson={7} title='Video Title 7' /> */}
        </div>
    )
}

export default Index