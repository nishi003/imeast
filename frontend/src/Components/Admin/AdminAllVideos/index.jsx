import React, { useContext, useEffect, useState } from 'react';

import AdminNewVideoCard from './AdminNewVideoCard';
import AdminVideoCard from './AdminVideoCard';
import { LessonContext } from '../../../Contexts/MLCContext';
import { useNavigate } from 'react-router-dom';
import { access, access_or_login } from '../../../Util/access';

const Index = ({ moduleID }) => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [numLessons, setNumLesson] = useState();

    const { lessonNumber } = useContext(LessonContext);

    const [isAdmin, setIsAdmin] = useState();

    const fetchUserData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const decrypt_serverErrors = json.errors;
                console.log(decrypt_serverErrors);
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                    const lessonsResponse = await access_or_login(`/lessons/${moduleID}/lesson/`, { method: 'GET' }, navigate);
                    const jsonLessons = await lessonsResponse.json();
                    const lessons = jsonLessons.lessons;
                    setLessons(lessons);
                    setNumLesson(lessons.length + 1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [moduleID]);

    return (
        <div className={`h-full w-full flex flex-col gap-8 overflow-y-scroll min-h-full custom-scrollbar ${lessonNumber !== -1 ? 'items-center mr-[-32px]' : ''}`}>
            {isAdmin ?
                <AdminNewVideoCard moduleID={moduleID} numLesson={numLessons} />
                :
                <></>
            }
            {lessons && lessons.map((lesson, index) => (
                <AdminVideoCard key={lesson?._id} index={index + 1} id={lesson?._id} module={lesson?.moduleID} title={lesson?.title} path={lesson?.path} video={lesson?.videoURL} thumbnail={lesson?.thumbnail} description={lesson?.description} date={lesson?.date} />
            ))}
        </div>
    )
}

export default Index