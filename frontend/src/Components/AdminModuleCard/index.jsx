import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Index = ({ id, setModule }) => {
    const [title, setTitle] = useState("MODULE 1");
    const [category, setCategory] = useState("TMJ, Bell’s Palsy");
    const [duration, setDuration] = useState("3 hours");
    const [description, setDescription] = useState("This treatment focuses on alleviating issues in major facial muscles and is specifically designed to address asymmetries in facial expression. It offers relief for conditions associated with the temporomandibular joint and Bell's Palsy, improving muscle function and facial symmetry.");
    return (
        <div className='flex flex-col justify-between items-center h-[460px] w-[460px] bg-white rounded-[30px] p-8'>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex flex-row items-center gap-6'>
                    <div className='h-[80px] w-[80px] bg-[#91C28D] rounded-full' />
                    <div className='flex flex-col'>
                        <p className='poppins-bold text-black text-[30px]'>{title}:</p>
                        <p className='poppins-bold text-black text-[15px]'>{category}</p>
                    </div>
                </div>
                <p className='mt-4 poppins-bold text-[#2F2F2F] text-[15px]'>DURATION: {duration}</p>
                <p className='poppins-bold text-[#2F2F2F] text-[15px]'>{description}</p>
            </div>
            <Link className='w-[300px] h-[40px] rounded-[20px] flex justify-center items-center shadow-md hover:scale-105 duration-200 bg-[#91C28D]' onClick={() => { setModule(id) }} to={`/admin/module/${id}/`}>
                <p className='text-white poppins-semibold text-[15px]'>VIEW</p>
            </Link>
        </div>
    )
}

export default Index