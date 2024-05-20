import React, { useState } from 'react';
import Comment from './CommentCard';
import NewComment from './NewComment';

const Index = ({ module, video, comment }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([1]);

    return (
        <div className='flex flex-col w-full h-auto gap-1'>
            <p className='poppins-semibold text-lg'>COMMENTS</p>
            <div className='w-full h-[2px] bg-black'></div>
            {comments.length === 0 ?
                <div className='flex flex-col gap-3 w-full pt-3'>
                    <NewComment />
                    <p className='poppins-medium text-[#9F9F9F] pl-[14px]'>No comments yet</p>
                </div>
                :
                <div className='flex flex-col gap-6 w-full pt-3'>
                    <NewComment />
                    <Comment id={1} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={false} comment={comment} />
                    <Comment id={2} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={false} comment={comment} />
                    <Comment id={3} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={true} comment={comment} />
                    <Comment id={4} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={true} comment={comment} />
                    <Comment id={5} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} comment={comment} />
                    <Comment id={6} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} comment={comment} />
                    <Comment id={7} name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} comment={comment} />
                </div>
            }
        </div>
    )
}

export default Index