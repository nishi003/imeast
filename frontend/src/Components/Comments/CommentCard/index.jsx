import React, { useContext, useEffect, useRef, useState } from 'react';
import { UilAngleDown } from '@iconscout/react-unicons';
import Replies from '../../Replies';
import { CommentContext } from '../../../Contexts/MLCContext';
import { access, access_or_login } from '../../../Util/access';

import './style.css';
import { useNavigate } from 'react-router-dom';

const Index = ({ commID, user, name, isAdmin, content, timestamp }) => {
    const navigate = useNavigate();
    const { commentID, setCommentID } = useContext(CommentContext);
    const [isReply, setIsReply] = useState(false);
    const [isReplies, setIsReplies] = useState(false);
    const [comment, setComment] = useState();
    const [refresh, setRefresh] = useState(false);

    const fetchCommentData = async () => {
        try {
            if (commID) {
                const response = await access_or_login(`/comments/comment/${commID}/`, { method: 'GET' }, navigate);
                const json = await response.json();
                if (!response.ok) {
                    console.log(json);
                } else {
                    setComment(json.comment);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCommentData();
    }, [commID]);

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate()).toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

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
                if (commID) {
                    const jsonInfo = json.info;
                    setFormData({ ...formData, userID: jsonInfo.userID });
                    if (formData['userID'] !== '') {
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        };
                        console.log(`/comments/reply/${commID}/`);
                        const replyResponse = await access(`/comments/reply/${commID}/`, requestOptions);
                        const jsonReply = await replyResponse.json();
                        if (!replyResponse) {
                            console.log(jsonReply);
                        } else {
                            setFormData({ ...formData, content: '' });
                            setIsReply(false);
                            setRefresh(!refresh);
                        }
                    }
                }
            }
        } catch (error) {
            console.log('Error while creating a new reply: ', error.message);
        }
    }

    return (
        <div className={`flex flex-row gap-4 items-start h-full w-full pl-[14px] ${commentID === commID ? 'bg-[#def1dd59] p-2 rounded-3xl' : ''}`}>
            <div className='bg-secondary h-[50px] w-[50px] rounded-full flex-shrink-0' />
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex flex-row gap-3 items-baseline'>
                    {isAdmin ?
                        <div className='flex px-2 py-[2px] bg-secondary rounded-xl items-center'>
                            <p className='poppins-medium text-sm'>Admin</p>
                        </div>
                        :
                        <p className='poppins-medium text-sm text-[#505050]'>{name}</p>
                    }
                    <p className='poppins-medium text-xs text-[#9F9F9F]'>Posted on {formatDate(timestamp)}</p>
                </div>
                <p className="poppins-medium text-base">{content}</p>
                <div className='flex flex-row items-baseline gap-4'>
                    <button className='poppins-semibold text-xs text-[#505050]' onClick={() => { setIsReply(!isReply); setIsReplies(false); }}>reply</button>
                    {comment?.hasReplies ?
                        <button className='flex flex-row items-end' onClick={() => { setIsReplies(!isReplies); setIsReply(false); }}>
                            <p className='poppins-semibold text-xs text-accent-200'>view replies</p>
                            <UilAngleDown size='15' color='#669162' />
                        </button>
                        :
                        <></>
                    }
                </div>
                {isReply ?
                    <div className='flex flex-col justify-end w-full gap-2 pt-2'>
                        <input type='text' name='content' onChange={handleInputChangeForm} value={formData.content} className='outline-none w-full resize-none border-b-2 border-[#505050] bg-white py-[2px] poppins-medium text-xs' placeholder='Add a reply...' />
                        <div className='flex flex-row w-full justify-end gap-4'>
                            <button className='poppins-medium text-xs hover:scale-105 hover:duration-200' onClick={() => setIsReply(false)}>cancel</button>
                            <button onClick={handleSubmit} className='flex px-6 py-1 bg-[#DCDCDC] text-xs text-white hover:bg-primary hover:scale-105 hover:duration-200 items-center rounded-full poppins-medium'>reply</button>
                        </div>
                    </div>
                    :
                    <></>
                }
                {isReplies ?
                    <Replies commentID={commID} />
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Index