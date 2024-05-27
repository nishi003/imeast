import React from 'react';

import AdminUserCard from '../AdminUserCard';

import './style.css';

const index = ({ users }) => {
    return (
        <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
            {users && users.map((user, index) => (
                <AdminUserCard key={index} id={user?._id} firstName={user?.firstName} lastName={user?.lastName} email={user?.email} sex={user?.sex} birthday={user?.birthday} phone={user?.phoneNumber} date={user?.date} college={user?.registeredCollege} license={user?.licenseNumber} location={user?.practiceLocation} profession={user?.professionType} period={user?.practicePeriod} other={user?.other} />
            ))}
        </div>
    )
}

export default index