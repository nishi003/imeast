import React, { useEffect, useState } from 'react';
import AdminModule from '../AdminModuleCard';

const Index = ({ moduleID, setModuleID }) => {
    const [allModules, setAllModules] = useState([]);
    const [id, setId] = useState(0);

    return (
        <div className='flex flex-row gap-4'>
            <AdminModule key={1} id={1} title='MODULE 1' category='TMJ, Bell’s Palsy' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={2} id={2} title='MODULE 2' category='Neck & Shoulder, Shoulder Joint' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={3} id={3} title='MODULE 3' category='Elbow & Wrist' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={4} id={4} title='MODULE 4' category='Back: Lower, Middle, Upper' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={5} id={5} title='MODULE 5' category='Sciatica: Hamstring, Calf' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={6} id={6} title='MODULE 6' category='Knee: Quad' moduleID={moduleID} setModuleID={setModuleID} />
            <AdminModule key={7} id={7} title='MODULE 7' category='Ankle Sprain, Fasciitis' moduleID={moduleID} setModuleID={setModuleID} />
        </div>
    )
}

export default Index