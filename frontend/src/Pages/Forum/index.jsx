import React, { useState } from 'react';
import { UilBell, UilFileAlt, UilAngleLeft } from '@iconscout/react-unicons';
import ForumModuleCard from '../../Components/ForumModuleCard';
import NotificationCard from '../../Components/NotificationCard';

import './style.css';

const Index = () => {
    const [type, typeChange] = useState("");
    const [module, setModule] = useState(-1);
    const [category, setCategory] = useState("Neck & Shoulder, Shoulder Joint");
    const [description, setDescription] = useState("Treatment covers a wide range of conditions including general neck and shoulder pain, muscle cramps, and sprains. It also addresses cervical disk issues, straight neck syndrome, turtle neck syndrome, headaches, and numbness or tingling sensations in the arms and hands. Additional focuses include Impingement Syndrome, Frozen Shoulder, and Rotator Cuff tears.");
    const [duration, setDuration] = useState("3 hours");
    const [isVideos, setIsVideos] = useState(false);
    const [notfications, setNotifications] = useState([]);

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        typeChange(newType);
    };

    return (
        <div className='h-full w-full bg-[#DCDCDC] px-9 py-10 overflow-hidden flex flex-col'>
            <div className='bg-white h-full w-full flex flex-col flex-grow-0 overflow-hidden items-center justify-center rounded-[30px]'>
                <div className='w-full h-auto px-14 py-4 border-b border-[#DCDCDC] gap-3 flex flex-row items-baseline justify-between'>
                    <p className='poppins-semibold text-sm text-[#767676] w-[400px]'>User</p>
                    <p className='poppins-semibold text-xs text-[#767676] w-[140px] text-center'>Date</p>
                    <p className='poppins-semibold text-xs text-[#767676] w-[140px] text-center'>Type</p>
                    <select className='poppins-semibold text-xs text-[#767676] bg-white w-[100px]' name='type' value={type} onChange={handleTypeChange}>
                        <option value="" disabled selected hidden>Filter</option>
                        <option value="unread" className="text-xs">Unread</option>
                        <option value="read" className="text-xs">Read</option>
                        <option value="comments" className="text-xs">Comments</option>
                        <option value="purchases" className="text-xs">Pruchases</option>
                    </select>
                </div>
                <div className='h-full w-full overflow-hidden px-8 py-4 justify-center'>
                    <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='comment' status='unread' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='comment' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='unread' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='comment' status='unread' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='comment' status='unread' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                        <NotificationCard name='Eugene Jang' date='2024.05.15' type='purchase' status='read' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index