import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UilAngleLeft } from '@iconscout/react-unicons';

import FieldError from '../../../Components/FieldError';

import './style.css';
import { access } from '../../../Util/access';

const Index = () => {
    const navigate = useNavigate();
    const { moduleID, numLesson } = useParams();

    const handleBack = () => {
        navigate(`/admin/module/${moduleID}/`);
    };

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        thumbnail: '',
        path: '',
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        path: '',
    });

    const handleInputChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };

        try {
            const response = await access(`/lessons/${moduleID}/lesson/`, requestOptions);
            const json = await response.json();
            if (!response.ok) {
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                navigate(`/admin/module/${moduleID}/`);
            }
        } catch (error) {
            console.log("Error during fetch: ", error);
        };
    };

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 overflow-hidden'>
            <div className='w-full h-full rounded-[30px] bg-white flex flex-col flex-grow-0 flex-shrink-0 p-8 overflow-hidden gap-4'>
                <button className='w-auto flex h-auto flex-row items-center flex-shrink-0' onClick={handleBack}>
                    <UilAngleLeft color='#505050' />
                    <p className='poppins-bold text-[#505050] text-base'>Back</p>
                </button>
                <div className='h-full w-full flex flex-col overflow-y-scroll px-6 gap-2 custom-scrollbar'>
                    <div className='w-full flex flex-row flex-shrink-0 justify-between'>
                        <p className='poppins-medium text-black text-[40px]'>LESSON {numLesson}</p>
                        <button onClick={handleSubmit} className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200'>PUBLISH LESSON</button>
                    </div>
                    <div className='h-full w-full flex flex-col px-6 gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='thumbnail' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Thumbnail</label>
                            <input type='file' name='thumbnail' onChange={handleInputChangeForm} accept="image/*" className={`w-full rounded-[10px] border border-[#9F9F9F] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] items-center flex flex-row justify-center`} />
                            <FieldError fielderror={errors.thumbnail} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='title' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Title</label>
                            <input type='text' name='title' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['title'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add a title' />
                            <FieldError fielderror={errors.title} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='description' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Description</label>
                            <textarea type='text' name='description' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] resize-none ${errors['description'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add a description here...' rows={4} maxLength={500} />
                            <FieldError fielderror={errors.description} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='path' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Path</label>
                            <input type='text' name='path' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['path'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='SHIFT + RIGHT CLICK and COPY AS PATH' />
                            <FieldError fielderror={errors.path} />
                        </div>
                        {/* <div className='flex flex-col gap-1'>
                            <label htmlFor='videoURL' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Video URL</label>
                            <input type='text' name='videoURL' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['videoURL'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add the video URL from VIMEO' />
                            <FieldError fielderror={errors.videoURL} />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index