import React, { useEffect, useState } from 'react';
import AdminModuleList from '../../../Components/Admin/AdminModuleList';
import AdminVideoCard from '../../../Components/Admin/AdminVideoCard';
import AdminVideo from '../../../Components/Admin/AdminVideo';
import Comments from '../../../Components/Comments';
import AdminModuleCreate from '../../../Components/Admin/AdminModuleCreate';
import AdminModuleInfo from '../../../Components/Admin/AdminModuleInfo';

import './style.css';
import { Link, useLocation, useParams } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [isCreate, setIsCreate] = useState(false);
    const { moduleID, videoID, commentID } = useParams();
    const [type, typeChange] = useState("");
    const [module, setModule] = useState(-1);
    const [video, setVideo] = useState(-1);
    const [comment, setComment] = useState(0);

    useEffect(() => {
        if (moduleID && videoID && commentID && !isNaN(moduleID) && !isNaN(videoID) && !isNaN(commentID)) {
            setModule(parseInt(moduleID, 10));
            setVideo(parseInt(videoID, 10));
            setComment(parseInt(commentID, 10));
        } else if (moduleID && videoID && !isNaN(moduleID) && !isNaN(videoID)) {
            setModule(parseInt(moduleID, 10));
            setVideo(parseInt(videoID, 10));
            setComment(0);
        } else if (moduleID && !isNaN(moduleID)) {
            setModule(parseInt(moduleID, 10));
            setComment(0);
        }
        else {
            setModule(-1);
            setComment(0);
        }

        switch (location.pathname) {
            case '/admin/module/create/':
                setIsCreate(true);
                break;
            default:
                setIsCreate(false);
                break;
        }
        console.log(location.pathname);
        console.log(isCreate);
    }, [moduleID, videoID, commentID, location, isCreate]);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            {isCreate ?
                <AdminModuleCreate />
                :
                module === -1 ?
                    <AdminModuleList setModule={setModule} />
                    :
                    <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                        {video !== -1 ?
                            <AdminVideo module={module} video={video} setVideo={setVideo} comment={comment} />
                            :
                            <AdminModuleInfo module={module} setModule={setModule} video={video} setVideo={setVideo} />
                        }
                    </div>
            }
        </div>
    )
}

export default Index