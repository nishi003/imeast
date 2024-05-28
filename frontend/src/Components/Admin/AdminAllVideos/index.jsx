import React, { useContext, useEffect, useState } from 'react';

import AdminVideoCard from './AdminVideoCard';
import AdminNewVideoCard from './AdminNewVideoCard';
import { LessonContext } from '../../../Contexts/MLCContext';
import { useNavigate } from 'react-router-dom';
import { access, access_or_login } from '../../../Util/access';

const Index = ({ moduleID }) => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [numLessons, setNumLesson] = useState();

    const { lessonNumber } = useContext(LessonContext);

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
                    navigate('/signin/');
                } else {
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
    }, []);


    return (
        <div className={`h-full w-full flex flex-col gap-8 overflow-y-scroll custom-scrollbar ${lessonNumber !== -1 ? 'items-center mr-[-32px]' : ''}`}>
            <AdminNewVideoCard moduleID={moduleID} numLesson={numLessons} />
            <AdminVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' module={module} />
            <AdminVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' module={module} />
        </div>
    )
}

export default Index