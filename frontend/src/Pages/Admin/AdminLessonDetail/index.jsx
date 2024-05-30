import React, { useContext, useEffect, useState } from 'react';
import { UilAngleLeft } from '@iconscout/react-unicons';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonContext } from '../../../Contexts/MLCContext';
import { access, access_or_login } from '../../../Util/access';

import AdminAllVideos from '../../../Components/Admin/AdminAllVideos';
import Comments from '../../../Components/Comments';

const Index = () => {
    const navigate = useNavigate();
    const { moduleID, lessonID } = useParams();
    const { lessonNumber, setLessonNumber } = useContext(LessonContext);

    const [lesson, setLesson] = useState(null);

    const handleBack = (() => {
        navigate(`/admin/module/${moduleID}/`);
        setLessonNumber(-1);
    });

    const [src, setSrc] = useState(null);

    const fetchLessonData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                console.log(json.errors);
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    navigate('/signin/');
                } else {
                    const lessonResponse = await access_or_login(`/lessons/${lessonID}/`, { method: 'GET' }, navigate);
                    const jsonLesson = await lessonResponse.json();
                    if (!lessonResponse.ok) {
                        console.log(jsonLesson.error);
                    } else {
                        setLesson(jsonLesson.lesson);
                        const videoID = jsonLesson.lesson.path.split("/").pop();
                        setSrc('https://player.vimeo.com/video/' + videoID);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLessonData();
    }, [lessonID]);


    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                <div className='flex flex-col overflow-hidden gap-4'>
                    <button onClick={handleBack} className='w-auto flex h-auto flex-row items-center'>
                        <UilAngleLeft color='#505050' />
                        <p className='poppins-bold text-[#505050] text-base'>Back</p>
                    </button>
                    <div className='h-full w-full flex flex-row overflow-hidden flex-grow-0'>
                        <div className='flex flex-col gap-3 overflow-y-scroll custom-scrollbar border-r-2 border-[#9F9F9F] pl-4 pr-12 flex-shrink-0 min-h-full h-auto'>
                            <iframe src={src} width="1104" height="621" frameborder="0" title={lesson?.title} className='flex flex-shrink-0 bg-black' allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            <div className='flex flex-row items-center gap-2 mb-2'>
                                <p className='poppins-bold text-[30px]'>LESSON {lessonNumber}:</p>
                                <p className='poppins-semibold text-[30px]'>{lesson?.title}</p>
                            </div>
                            {/* <p className='flex w-full h-full poppins-medium'>{lesson?.description}</p> */}
                            <Comments lessonID={lessonID} />
                        </div>
                        <AdminAllVideos moduleID={moduleID} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index