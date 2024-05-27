import React, { useEffect, useState } from 'react';
import AdminAllUsers from './AdminAllUsers';

import { access, access_or_login } from '../../../Util/access';
import { useNavigate } from 'react-router-dom';


const Index = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [numUsers, setNumUsers] = useState(0);

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
                    const userResponse = await access_or_login('/users/user/', { method: 'GET' });
                    const jsonUser = await userResponse.json();
                    if (!userResponse.ok) {
                        console.log(jsonUser);
                    } else {
                        if (jsonUser) {
                            setUsers(jsonUser.users);
                            setNumUsers(jsonUser.users.length);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='h-full w-full flex-grow-0 flex flex-col overflow-hidden bg-white rounded-b-[30px] rounded-r-[30px]'>
            <div className='w-full h-auto px-10 py-4 border-b border-[#DCDCDC] justify-between flex flex-row items-baseline'>
                <p className='poppins-semibold text-sm text-[#767676] w-[80px]'>{numUsers} {numUsers === 1 ? <>User</> : <>Users</>}</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[300px]'>User</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[200px]'>Profession</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[140px]'>Practicing Period</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[150px]'>License Number</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[190px]'>Registered College</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[70px]'>Sex</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[100px]'># of Purchases</p>
                <p className='poppins-semibold text-xs text-[#767676] w-[120px]'>Resgistration Date</p>
            </div>
            <div className='h-full w-full overflow-hidden px-8 py-4 justify-center'>
                <AdminAllUsers users={users} />
            </div>
        </div>
    )
}

export default Index