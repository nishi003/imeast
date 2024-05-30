import React, { useEffect, useState } from 'react';
import Reply from './Reply';
import { access, access_or_login } from '../../Util/access';
import { useNavigate } from 'react-router-dom';

const Index = ({ commentID, refresh }) => {
    const navigate = useNavigate();
    const [replies, setReplies] = useState([]);

    const fetchReplyData = async () => {
        try {
            if (commentID) {
                const response = await access_or_login(`/comments/reply/${commentID}/`, { method: 'GET' }, navigate);
                const json = await response.json();
                if (!response.ok) {
                    console.log(json.error);
                } else {
                    setReplies(json.replies);
                }
            }
        } catch (error) {
            console.log("Error during reply list get: ", error.message);
        }
    }

    useEffect(() => {
        fetchReplyData();
    }, [commentID, refresh])

    return (
        <div className='flex flex-col gap-2 pt-2'>
            {replies && replies.map((reply, index) => (
                <Reply key={index} id={reply?._id} name={reply?.displayName} date={reply?.timestamp} content={reply?.content} isAdmin={reply?.isAdmin} />
            ))}
        </div>
    )
}

export default Index