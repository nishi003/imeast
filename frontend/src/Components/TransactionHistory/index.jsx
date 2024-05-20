import React, { useState } from 'react';
import './style.css';
import TransactionCard from './UserTransactionCard';

const Index = ({ id }) => {
    const [transactions, setTransactions] = useState([]);

    return (
        <div className='h-full w-full overflow-hidden justify-center'>
            <div className='h-full w-full flex flex-col gap-4 overflow-y-scroll custom-scrollbar'>
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='completed' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='refunded' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='completed' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='completed' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='refunded' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='completed' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='refunded' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='refunded' />
                <TransactionCard date='2024.05.20' time='05:34' module='Module 2: Neck & Shoulder, Shoulder Joint' total='149.99' status='refunded' />
            </div>
        </div>
    )
}

export default Index