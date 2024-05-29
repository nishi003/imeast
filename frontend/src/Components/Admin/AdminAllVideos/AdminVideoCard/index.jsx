import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LessonContext } from '../../../../Contexts/MLCContext';

const Index = ({ index, id, module, title, path, video, thumbnail, description, date }) => {
    const { lessonNumber, setLessonNumber } = useContext(LessonContext);

    return (
        <>
            {lessonNumber === -1 ?
                <Link className='flex flex-row w-full items-start gap-6' onClick={() => { setLessonNumber(index) }} to={`/admin/module/${module}/lesson/${id}/`}>
                    <div className='bg-[#D9D9D9] w-[240px] h-[135px]' />
                    <div className='flex flex-col items-start'>
                        <p className='poppins-bold text-xl'>LESSON {index}:</p>
                        <p className='poppins-regular text-base'>{title}</p>
                    </div>
                </Link>
                :
                <Link className='flex flex-col gap-1' onClick={() => { setLessonNumber(index) }} to={`/admin/module/${module}/lesson/${id}/`}>
                    <div className='bg-[#D9D9D9] w-[263px] h-[148px] flex-shrink-0' />
                    <div className='flex flex-col items-start'>
                        <p className='poppins-semibold text-lg'>LESSON {index}:</p>
                        <p className='poppins-regular text-xs'>{title}</p>
                    </div>
                </Link>
            }
        </>
    )
}

export default Index