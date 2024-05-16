import React from 'react'

const Index = ({ name, birthday, email, address, profession, period, license, college, sex, purchases, registered }) => {
    return (
        <div className='w-full h-auto p-2 border border-[#DCDCDC] rounded-[10px] flex flex-row gap-3'>
            <div className='flex items-center w-[80px]'>
                <div className='h-[70px] w-[70px] rounded-full bg-[#D9D9D9]' />
            </div>
            <div className='flex flex-col h-auto justify-between w-[300px]'>
                <p className='poppins-semibold text-[15px] text-black'>{name}</p>
                <div className='flex flex-col'>
                    <p className='poppins-semibold text-[10px] text-[#767676]'>{birthday}</p>
                    <p className='poppins-semibold text-[10px] text-[#767676] mt-[-1px]'>{email}</p>
                    <p className='poppins-semibold text-[10px] text-[#767676] mt-[-1px]'>{address}</p>
                </div>
            </div>
            <div className='h-full flex items-center w-[200px]'>
                <p className='poppins-semibold text-[15px] text-black'>{profession}</p>
            </div>
            <div className='h-full flex items-center w-[140px]'>
                <p className='poppins-semibold text-[15px] text-black'>{period}</p>
            </div>
            <div className='h-full flex items-center w-[150px]'>
                <p className='poppins-semibold text-[15px] text-black'>{license}</p>
            </div>
            <div className='h-full flex items-center w-[190px]'>
                <p className='poppins-semibold text-[15px] text-black'>{college}</p>
            </div>
            <div className='h-full flex items-center w-[70px]'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{sex}</p>
            </div>
            <div className='h-full flex items-center w-[100px] justify-center'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{purchases}</p>
            </div>
            <div className='h-full flex items-center w-[120px] justify-center'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{registered}</p>
            </div>
        </div>
    )
}

export default Index