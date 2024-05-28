import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UilPlusCircle } from '@iconscout/react-unicons';

import { LessonContext } from '../../../../Contexts/MLCContext';

const Index = ({ moduleID, numLesson }) => {
    const navigate = useNavigate();
    const { lessonNumber, setLessonNumber } = useContext(LessonContext);

    const handleCreate = (() => {
        setLessonNumber(-1);
        navigate(`/admin/module/${moduleID}/lesson/create/${numLesson}/`);
    });

    return (
        <button className='flex flex-col gap-1' onClick={handleCreate}>
            <div className={`bg-primary flex flex-col justify-center items-center flex-shrink-0 ${lessonNumber === -1 ? 'w-[240px] h-[135px]' : 'w-[263px] h-[148px]'}`}>
                <UilPlusCircle color="#ffffff" size='40' />
                <p className='text-white poppins-semibold text-2xl'>VIDEO</p>
            </div>
        </button>
    )
}

export default Index