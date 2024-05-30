import React, { useEffect, useState } from 'react';
import Comment from './CommentCard';
import NewComment from './NewComment';
import { access, access_or_login } from '../../Util/access';
import { useNavigate, useParams } from 'react-router-dom';

const Index = ({ lessonID }) => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(false);

    const fetchCommentData = async () => {
        try {
            if (lessonID) {
                const response = await access_or_login(`/comments/${lessonID}/`, { method: 'GET' }, navigate);
                const json = await response.json();
                if (!response.ok) {
                    console.log(json);
                } else {
                    setComments(json.comments);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentAdded = () => {
        setNewComment(!newComment);  // Set newComment to true to trigger re-fetch
    };

    useEffect(() => {
        fetchCommentData();
    }, [lessonID, newComment]);

    return (
        <div className='flex flex-col w-full h-auto gap-1'>
            <p className='poppins-semibold text-lg'>COMMENTS</p>
            <div className='w-full h-[2px] bg-black'></div>
            <div className='flex flex-col gap-3 w-full pt-3'>
                <NewComment lessonID={lessonID} onCommentAdded={handleCommentAdded} />
                {comments.length === 0 ?
                    <p className='poppins-medium text-[#9F9F9F] pl-[14px]'>No comments yet</p>
                    :
                    comments.map((comment) => (
                        <Comment key={comment?._id} commID={comment?._id} user={comment?.userID} name={comment?.displayName} isAdmin={comment?.isAdmin} content={comment?.content} timestamp={comment?.timestamp} />
                    ))
                }
            </div>
        </div>
    )
}

export default Index