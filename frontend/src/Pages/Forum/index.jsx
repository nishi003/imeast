import React, { useState } from 'react';
import { UilBell, UilFileAlt, UilAngleLeft } from '@iconscout/react-unicons';
import ForumModuleCard from '../../Components/ForumModuleCard';
import NotificationCard from '../../Components/NotificationCard';

import './style.css';

const Index = () => {
    const [isNotifications, setIsNotifications] = useState(true);
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
            <div className='flex flex-row gap-2'>
                <button className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isNotifications ? 'bg-white' : ''}`} onClick={() => { setIsNotifications(true) }}>
                    {isNotifications ?
                        <div className='flex flex-row items-center gap-1'>
                            <UilBell size='27' color='#2F2F2F' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Notifications</p>
                        </div>
                        :
                        <div className='flex flex-row items-center gap-1'>
                            <UilBell size='27' color='#9F9F9F' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Notifications</p>
                        </div>
                    }
                </button>
                <button className={`flex flex-row gap-2 items-center justify-center p-4 rounded-t-[20px] ${isNotifications === false ? 'bg-white' : ''}`} onClick={() => { setIsNotifications(false) }}>
                    {isNotifications === false ?
                        <div className='flex flex-row items-center gap-1'>
                            <UilFileAlt size='27' color='#2F2F2F' />
                            <p className='poppins-semibold text-xl text-[#2F2F2F]'>Modules</p>
                        </div>
                        :
                        <div className='flex flex-row items-center gap-1'>
                            <UilFileAlt size='27' color='#9F9F9F' />
                            <p className='poppins-semibold text-xl text-[#9F9F9F]'>Modules</p>
                        </div>
                    }
                </button>
            </div>
            <div className={`h-full w-full flex flex-col flex-grow-0 overflow-hidden items-center justify-center bg-white ${isNotifications ? 'rounded-b-[30px] rounded-r-[30px]' : 'rounded-[30px] p-8'} `}>
                {isNotifications ?
                    <>
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
                    </>
                    :
                    (module === -1 ?
                        <div className='h-full w-auto flex flex-wrap gap-8 overflow-y-scroll custom-scrollbar justify-center'>
                            <ForumModuleCard id={1} setModule={setModule} />
                            <ForumModuleCard id={2} setModule={setModule} />
                            <ForumModuleCard id={3} setModule={setModule} />
                            <ForumModuleCard id={4} setModule={setModule} />
                            <ForumModuleCard id={5} setModule={setModule} />
                            <ForumModuleCard id={6} setModule={setModule} />
                        </div>
                        :
                        (isVideos ?
                            <div className='flex h-full w-full'>
                                hello
                                <button onClick={() => { setIsVideos(false) }}>Module</button>
                            </div>
                            :
                            <div className='flex h-full w-full flex-col'>
                                <button onClick={() => { setModule(-1) }} className='w-auto flex h-auto flex-row items-center'>
                                    <UilAngleLeft color='#505050' />
                                    <p className='poppins-medium text-[#505050] text-[15px]'>Back</p>
                                </button>
                                <div className='h-full w-full'>
                                    <div className='h-full w-[555px] border-r border-[#505050] p-2'>

                                    </div>
                                    <div className='h-full w-full'></div>
                                </div>
                                {/* <button onClick={() => { setIsVideos(true) }}>Video</button> */}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Index