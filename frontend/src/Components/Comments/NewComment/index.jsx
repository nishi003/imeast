import React, { useState } from 'react';
import { access } from '../../../Util/access';
import { useNavigate } from 'react-router-dom';

const Index = ({ lessonID }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: '',
        userID: '',
    });

    const handleInputChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const decrypt_serverErrors = json.errors;
                if (decrypt_serverErrors) {
                    console.log(decrypt_serverErrors);
                }
            } else {
                const jsonInfo = json.info;
                setFormData({ ...formData, userID: jsonInfo.userID });
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                };
                const commentResponse = await access(`/comments/${lessonID}/`, requestOptions);
                const jsonComment = await commentResponse.json();
                if (!commentResponse.ok) {
                    console.log(jsonComment);
                } else {
                    console.log(jsonComment);
                }
            }
        } catch (error) {
            console.log("Error during fetch: ", error);
        }
    }

    return (
        <div className='flex flex-row gap-4 items-start h-full w-full pl-[14px]'>
            <div className='bg-secondary h-[50px] w-[50px] rounded-full flex-shrink-0' />
            <div className='flex flex-col justify-end w-full gap-2'>
                <input type='text' name='content' onChange={handleInputChangeForm} className='outline-none w-full resize-none border-b-2 border-[#505050] bg-white py-[2px] poppins-medium' placeholder='Add a comment...' />
                <div className='flex flex-row w-full justify-end gap-4'>
                    <button onClick={handleSubmit} className='flex px-6 py-1 bg-[#DCDCDC] text-white hover:bg-primary hover:scale-105 hover:duration-200 items-center rounded-full poppins-medium text-sm'>comment</button>
                </div>
            </div>
        </div>
    )
}

export default Index