import React from 'react';
import AdminTransactionCard from '../AdminTransactionCard';

import './style.css';

const Index = () => {
    return (
        <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='completed' />
            <AdminTransactionCard name='Eugene Jang' date='2024.05.15' time='15:27' module='Module 2: Neck & Shoulder, Shoulder Joint' total={149.99} status='refunded' />
        </div>
    )
}

export default Index