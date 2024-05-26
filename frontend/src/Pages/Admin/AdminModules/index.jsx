import React, { useEffect, useState } from 'react';
import AdminModuleList from '../../../Components/Admin/AdminModuleList';
import AdminVideo from '../../../Components/Admin/AdminVideo';
import AdminModuleCreate from '../../../Components/Admin/AdminModuleCreate';
import AdminModuleInfo from '../../../Components/Admin/AdminModuleInfo';
import { access } from '../../../Util/access';

import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [modules, setModules] = useState([]);
    const [moduleNumber, setModuleNumber] = useState(0);

    const [isCreate, setIsCreate] = useState(false);
    const [isNewVideo, setIsNewVideo] = useState(false);
    const [type, typeChange] = useState("");
    const [module, setModule] = useState(-1);
    const [video, setVideo] = useState(-1);
    const [comment, setComment] = useState(0);

    const { moduleID, videoID, commentID } = useParams();

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
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            {isCreate ?
                <AdminModuleCreate setModule={setModule} moduleNumber={moduleNumber} />
                :
                (module === -1 ?
                    <AdminModuleList modules={modules} setModule={setModule} />
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