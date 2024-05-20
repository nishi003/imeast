import React, { useState } from 'react';
import Reply from './Reply';

const Index = () => {
    const [replies, setReplies] = useState([]);

    return (
        <div className='flex flex-col gap-2 pt-2'>
            <Reply name='Eugene Jang' date='2024.05.15' content='I agree, wow so amazing and cool test' isAdmin={false} />
            <Reply name='Eugene Jang' date='2024.05.15' content='I agree, wow so amazing and cool test' isAdmin={true} />
            <Reply name='Eugene Jang' date='2024.05.15' content='I agree, wow so amazing and cool test' isAdmin={false} />
        </div>
    )
}

export default Index