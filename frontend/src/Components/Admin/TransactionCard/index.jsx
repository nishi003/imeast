import React from 'react'

const Index = ({ name, date, time, module, total, status }) => {
    return (
        <div className='w-full h-auto px-6 py-2 border border-[#DCDCDC] hover:border-primary rounded-[10px] flex flex-row gap-3 items-center justify-between'>
            <div className='flex flex-row gap-4 items-center w-[400px] justify-start'>
                <div className='w-[50px] h-[50px] rounded-full bg-[#D9D9D9]' />
                <p className='poppins-semibold text-[15px] text-black'>{name}</p>
            </div>
            <p className='poppins-semibold text-[15px] text-black w-[140px]'>{date}</p>
            <p className='poppins-semibold text-[15px] text-black w-[50px]'>{time}</p>
            <p className='poppins-semibold text-[15px] text-black w-[350px]'>{module}</p>
            <p className='poppins-semibold text-[15px] text-black w-[60px]'>${total}</p>
            {status === 'processing' ?
                <p className='poppins-semibold text-[15px] text-[#5466C4] w-[170px]'>Payment Processing</p>
                :
                <></>
            }
            {status === 'completed' ?
                <p className='poppins-semibold text-[15px] text-[#669162] w-[170px]'>Payment Complete</p>
                :
                <></>
            }
            {status === 'refunded' ?
                <p className='poppins-semibold text-[15px] text-[#C49754] w-[170px]'>Refunded</p>
                :
                <></>
            }
            {status === 'incomplete' ?
                <p className='poppins-semibold text-[15px] text-[#C45454] w-[170px]'>Payment Incomplete</p>
                :
                <></>
            }
        </div>
    )
}

export default Index