import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UilAngleLeft, UilLinkH, UilEditAlt } from '@iconscout/react-unicons';
import FieldError from '../../../Components/FieldError';

const Index = ({ setModule, moduleNumber }) => {
    const navigate = useNavigate();

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

    return (
        <div className='w-full h-full rounded-[30px] bg-white flex flex-col flex-grow-0 flex-shrink-0 p-8'>
            <div className='flex flex-col overflow-hidden h-full w-full gap-4'>
                <Link onClick={() => setModule(-1)} className='w-auto flex h-auto flex-row items-center' to={`/admin/module/list/`}>
                    <UilAngleLeft color='#505050' />
                    <p className='poppins-bold text-[#505050] text-base'>Back</p>
                </Link>
                <div className='h-full w-full flex flex-col overflow-hidden px-6 gap-4'>
                    <div className='w-full justify-start flex flex-col flex-shrink-0'>
                        <p className='poppins-medium text-black text-[40px]'>MODULE {moduleNumber}</p>
                    </div>
                    <div className='h-full w-full flex flex-col px-8 gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='title' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Title</label>
                            <input type='text' name='title' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['title'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Type in the title of this module' />
                            <FieldError fielderror={errors.title} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='description' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Description</label>
                            <textarea type='text' name='description' onChange={handleInputChangeForm} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] resize-none ${errors['description'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Type in the description of this module' rows={4} maxLength={500} />
                            <FieldError fielderror={errors.description} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index