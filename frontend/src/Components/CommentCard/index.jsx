import React, { useEffect, useRef, useState } from 'react';
import { UilAngleDown } from '@iconscout/react-unicons';

import './style.css';

const Index = ({ name, date, content, hasReplies, isAdmin }) => {
    const [isReply, setIsReply] = useState(false);
    const [isReplies, setIsReplies] = useState(false);

    return (
        <div className='flex flex-row gap-4 items-start h-full w-full pl-[14px]'>
            <div className='bg-secondary h-[50px] w-[50px] rounded-full flex-shrink-0' />
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex flex-row gap-3 items-baseline'>
                    {isAdmin ?
                        <div className='flex px-2 py-[2px] bg-secondary rounded-xl items-center'>
                            <p className='poppins-medium text-sm'>Admin</p>
                        </div>
                        :
                        <p className='poppins-medium text-sm text-[#505050]'>{name}</p>
                    }
                    <p className='poppins-medium text-xs text-[#9F9F9F]'>Posted on {date}</p>
                </div>
                <p className="poppins-medium text-base">{content}</p>
                <div className='flex flex-row items-baseline gap-4'>
                    <button className='poppins-semibold text-xs text-[#505050]' onClick={() => { setIsReply(!isReply); setIsReplies(false); }}>reply</button>
                    {hasReplies ?
                        <button className='flex flex-row items-end' onClick={() => { setIsReplies(!isReplies); setIsReply(false); }}>
                            <p className='poppins-semibold text-xs text-accent-200'>view replies</p>
                            <UilAngleDown size='15' color='#669162' />
                        </button>
                        :
                        <></>
                    }
                </div>
                {isReply ?
                    <div className='flex flex-col justify-end w-full gap-2 pt-2'>
                        <textarea className='outline-none w-full resize-none border-b-2 border-[#505050] bg-white py-[2px] poppins-medium text-xs' rows={1} placeholder='Add a reply...' />
                        <div className='flex flex-row w-full justify-end gap-4'>
                            <button className='poppins-medium text-xs hover:scale-105 hover:duration-200' onClick={() => setIsReply(false)}>cancel</button>
                            <button className='flex px-6 py-1 bg-[#DCDCDC] text-xs text-white hover:bg-primary hover:scale-105 hover:duration-200 items-center rounded-full poppins-medium'>reply</button>
                        </div>
                    </div>
                    :
                    <></>
                }
                {isReplies ?
                    <></>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Index