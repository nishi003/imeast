import React, { useContext, useState } from 'react';

import AdminVideoCard from './AdminVideoCard';
import AdminNewVideoCard from './AdminNewVideoCard';
import { LessonContext } from '../../../Contexts/MLCContext';

const Index = ({ module, isVideo, setVideo, video }) => {
    const [videos, setVideos] = useState([]);

    const { lessonNumber } = useContext(LessonContext);

    return (
        <div className={`h-full w-full flex flex-col gap-8 overflow-y-scroll custom-scrollbar ${lessonNumber !== -1 ? 'items-center mr-[-32px]' : ''}`}>
            <AdminNewVideoCard module={module} video={video} setVideo={setVideo} />
            <AdminVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
            <AdminVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
        </div>
    )
}

export default Index