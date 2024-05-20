import React, { useState } from 'react';
import Comment from '../CommentCard';
import NewComment from '../NewComment';

const Index = ({ module, video, commentID }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([1]);

    return (
        <div className='flex flex-col w-full h-auto gap-1'>
            <p className='poppins-semibold text-lg'>COMMENTS</p>
            <div className='w-full h-[2px] bg-black'></div>
            {comments.length === 0 ?
                <p className='poppins-medium text-[#9F9F9F]'>No comments yet</p>
                :
                <div className='flex flex-col gap-6 w-full pt-3'>
                    <NewComment />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={false} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={false} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={true} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={false} isAdmin={true} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} />
                    <Comment name='Eugene Jang' date='2024.05.15' content='At 4:06, what exactly is the needle used for this type of treatment?' hasReplies={true} isAdmin={false} />
                </div>
            }
        </div>
    )
}

export default Index