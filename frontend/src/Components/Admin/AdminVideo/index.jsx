import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UilAngleLeft } from '@iconscout/react-unicons';
import Comments from '../../Comments';
import AdminAllVideos from '../AdminAllVideos';

const Index = ({ module, video, setVideo, comment }) => {
    const [videoTitle, setVideoTitle] = useState("Neck & Shoulder, Shoulder Joint");

    return (
        <div className='flex flex-col overflow-hidden gap-4'>
            <Link onClick={() => { setVideo(-1) }} className='w-auto flex h-auto flex-row items-center' to={`/admin/module/${module}/`}>
                <UilAngleLeft color='#505050' />
                <p className='poppins-bold text-[#505050] text-base'>Back</p>
            </Link>
            <div className='h-full w-full flex flex-row overflow-hidden flex-grow-0'>
                <div className='flex flex-col gap-3 overflow-y-scroll custom-scrollbar border-r-2 border-[#9F9F9F] pl-4 pr-12 flex-shrink-0 h-auto'>
                    <div className='w-[1104px] h-[621px] bg-[#D9D9D9] flex-shrink-0' />
                    <div className='flex flex-row items-center gap-2 mb-2'>
                        <p className='poppins-bold text-[30px]'>LESSON {video}:</p>
                        <p className='poppins-semibold text-[30px]'>{videoTitle}</p>
                    </div>
                    <Comments module={module} video={video} comment={comment} />
                </div>
                <AdminAllVideos module={module} setVideo={setVideo} video={video} />
            </div>
        </div>
    )
}

export default Index