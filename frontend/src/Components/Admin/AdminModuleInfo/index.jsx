import React, { useState } from 'react';
import AdminVideoCard from '../AdminVideoCard';
import AdminAllVideos from '../../Components/AdminAllVideos';

import './style.css';

const Index = (moduleID) => {
    const [title, setTitle] = useState("MODULE 1");
    const [category, setCategory] = useState("TMJ, Bell’s Palsy");
    const [price, setPrice] = useState(149.99);
    const [duration, setDuration] = useState(3);
    const [description, setDescription] = useState("This treatment focuses on alleviating issues in major facial muscles and is specifically designed to address asymmetries in facial expression. It offers relief for conditions associated with the temporomandibular joint and Bell's Palsy, improving muscle function and facial symmetry.");

    const [videos, setVideos] = useState([]);

    return (
        <div className='w-full h-full bg-white rounded-[30px] flex flex-row overflow-hidden'>
            <div className='w-[384px] h-full flex flex-col'>
                <div className='flex flex-row items-center p-6 gap-3 border-b border-dashed'>
                    <div className='h-[80px] w-[80px] bg-[#91C28D] rounded-full' />
                    <div className='flex flex-col'>
                        <p className='poppins-medium text-[30px]'>{title}</p>
                        <p className='poppins-bold text-sm mt-[-6px]'>{category}</p>
                    </div>
                </div>
                <div className='h-full w-full flex flex-col p-8 justify-between'>
                    <div className='h-auto w-full flex flex-col gap-5'>
                        <p className='poppins-bold text-sm'>PRICE: ${price}</p>
                        <p className='poppins-bold text-sm'>DURATION: {duration} HOURS</p>
                        <p className='poppins-bold text-sm'>DESCRIPTION: {description}</p>
                    </div>
                    <input type='file' accept='.pdf' className='border border-[#9F9F9F] rounded-md p-2 poppins-semibold text-[#767676] text-sm' />
                </div>
            </div>
            <div className='w-auto h-full p-4 border-x overflow-hidden'>
                <div className='w-auto h-full flex flex-col flex-shrink-0 overflow-y-scroll custom-scrollbar'>
                    <AdminAllVideos moduleID={moduleID} />
                </div>
            </div>
        </div>
    )
}

export default Index