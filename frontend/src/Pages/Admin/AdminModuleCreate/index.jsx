import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { access } from '../../../Util/access';

import { UilAngleLeft } from '@iconscout/react-unicons';

import FieldError from '../../../Components/FieldError';

const Index = () => {
    const navigate = useNavigate();
    const { moduleNumber } = useParams();

    const [errors, setErrors] = useState({
        title: '',
        duration: '',
        description: '',
        pdf: '',
        image: '',
        price: '',
        link: '',
    });

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        description: '',
        pdf: '',
        image: '',
        price: '',
        link: '',
    });

    const handleInputChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const fetchUserData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const decrypt_serverErrors = json.errors;
                if (decrypt_serverErrors) {
                    setErrors(decrypt_serverErrors);
                }
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    navigate('/signin/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
        console.log(moduleNumber);
    }, []);

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
            const response = await access('/modules/', requestOptions);
            const json = await response.json();
            if (!response.ok) {
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                navigate('/admin/module/list/');
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        };
    }

    const handleBack = () => {
        navigate('/admin/module/list/')
    }

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            <div className='w-full h-full rounded-[30px] bg-white flex flex-col flex-grow-0 flex-shrink-0 p-8'>
                <div className='flex flex-col overflow-hidden h-full w-full gap-4'>
                    <button className='w-auto flex h-auto flex-row items-center' onClick={handleBack}>
                        <UilAngleLeft color='#505050' />
                        <p className='poppins-bold text-[#505050] text-base'>Back</p>
                    </button>
                    <div className='h-full w-full flex flex-col overflow-y-scroll px-6 gap-2 custom-scrollbar'>
                        <div className='w-full flex flex-row flex-shrink-0 justify-between'>
                            <p className='poppins-medium text-black text-[40px]'>MODULE {moduleNumber}</p>
                            <button onClick={handleSubmit} className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200'>PUBLISH MODULE</button>
                        </div>
                        <div className='h-full w-full flex flex-col px-6 gap-2'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='image' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Picture</label>
                                <input type='file' name='image' onChange={handleInputChangeForm} accept="image/*" className={`w-full rounded-[10px] border border-[#9F9F9F] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] items-center flex flex-row justify-center`} />
                                <FieldError fielderror={errors.image} />
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
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='duration' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Duration</label>
                                    <input type='text' name='duration' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['duration'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add a duration (3 hours etc.)' />
                                    <FieldError fielderror={errors.duration} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='price' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Price</label>
                                    <input type='number' min={0} name='price' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['price'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add a price (in CAD)' />
                                    <FieldError fielderror={errors.price} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='pdf' className='poppins-semibold text-[15px] text-[#767676] pl-2'>PDF Document</label>
                                <input type='file' name='pdf' onChange={handleInputChangeForm} accept='.pdf' className={`w-full rounded-[10px] border border-[#9F9F9F] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] items-center flex flex-row justify-center`} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='link' className='poppins-semibold text-[15px] text-[#767676] pl-2'>In-Person Registration Link</label>
                                <input type='url' name='link' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['link'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Add a link for in-person registration' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index