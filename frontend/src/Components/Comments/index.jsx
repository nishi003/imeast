import React, { useEffect, useState } from 'react';
import Comment from './CommentCard';
import NewComment from './NewComment';
import { access, access_or_login } from '../../Util/access';
import { useNavigate, useParams } from 'react-router-dom';

const Index = ({ lessonID }) => {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([1]);

    const fetchCommentData = async () => {
        try {
            const response = await access_or_login(`/comments/${lessonID}/`, { method: 'GET' }, navigate);
            const json = await response.json();
            if (!response.ok) {
                console.log(json);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCommentData();
    }, [lessonID]);

    return (
        <div className='flex flex-col w-full h-auto gap-1'>
            <p className='poppins-semibold text-lg'>COMMENTS</p>
            <div className='w-full h-[2px] bg-black'></div>
            <div className='flex flex-col gap-3 w-full pt-3'>
                <NewComment lessonID={lessonID} />
                {comments.length === 0 ?
                    <p className='poppins-medium text-[#9F9F9F] pl-[14px]'>No comments yet</p>
                    :
                    comments.map((comment) => (
                        <Comment key={comment?._id} commID={comment?._id} user={comment?.userID} content={comment?.content} timestamp={comment?.timestamp} />
                    ))
                }
            </div>
        </div>
    )
}

export default Index