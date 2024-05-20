import React, { useState } from 'react';

const Index = ({ module, video }) => {
    const [comments, setComments] = useState([1]);
    return (
        <div className='flex flex-col w-full h-auto gap-1'>
            <p className='poppins-semibold text-lg'>COMMENTS</p>
            <div className='w-full h-[2px] bg-black'></div>
            {comments.length === 0 ?
                <p className='poppins-medium text-[#9F9F9F]'>No comments yet</p>
                :
                <></>
            }
        </div>
    )
}

export default Index