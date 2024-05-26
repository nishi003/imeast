import React, { useEffect, useState } from 'react';
import AdminModuleList from '../../../Components/Admin/AdminModuleList';
import AdminVideo from '../../../Components/Admin/AdminVideo';
import AdminModuleCreate from '../../../Components/Admin/AdminModuleCreate';
import AdminModuleInfo from '../../../Components/Admin/AdminModuleInfo';
import AdminVideoCreate from '../../../Components/Admin/AdminVideoCreate';

import './style.css';
import { useLocation, useParams } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const [isCreate, setIsCreate] = useState(false);
    const [isNewVideo, setIsNewVideo] = useState(false);
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
            case location.pathname.endsWith('/video/create/'):
                setIsNewVideo(true);
                break
            default:
                setIsCreate(false);
                setIsNewVideo(false);
                break;
        }
    }, [moduleID, videoID, commentID, location, isCreate, isNewVideo]);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            {isCreate ?
                <AdminModuleCreate setModule={setModule} moduleNumber={10} />
                :
                (module === -1 ?
                    <AdminModuleList setModule={setModule} />
                    :
                    <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                        {video !== -1 ?
                            <AdminVideo module={module} video={video} setVideo={setVideo} comment={comment} />
                            :
                            <AdminModuleInfo module={module} setModule={setModule} video={video} setVideo={setVideo} isNewVideo={isNewVideo} />
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Index