import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { access } from '../../../Util/access';

import AdminNewModuleCard from '../../../Components/Admin/AdminModuleCard/AdminNewModuleCard';
import AdminModuleCard from '../../../Components/Admin/AdminModuleCard';

import './style.css';

const Index = () => {
    const navigate = useNavigate();

    const [modules, setModules] = useState([]);
    const [moduleNumber, setModuleNumber] = useState(0);
    const [module, setModule] = useState();

    const fetchUserData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) });
            const json = await response.json();
            if (!response.ok) {
                console.log(json);
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    navigate('/signin/');
                } else {
                    const moduleResponse = await access('/modules/admin/module/', { method: 'GET' });
                    const jsonModule = await moduleResponse.json();
                    if (!moduleResponse.ok) {
                        console.log(jsonModule);
                    } else {
                        const modules = jsonModule.modules;
                        setModuleNumber(modules.length + 1);
                        setModules(modules);
                        setModule(-1);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [module]);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden justify-center'>
            <div className='h-full w-auto grid grid-cols-3 gap-8 overflow-y-scroll custom-scrollbar justify-center'>
                <AdminNewModuleCard moduleNumber={moduleNumber} />
                {modules && modules.map((module, index) => (
                    <AdminModuleCard key={module._id} index={index + 1} id={module._id} title={module.title} image={module.image} duration={module.duration} description={module.description} />
                ))}
            </div>
        </div>
    )
}

export default Index