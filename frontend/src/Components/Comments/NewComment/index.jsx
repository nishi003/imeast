import React from 'react'

const Index = () => {
    return (
        <div className='flex flex-row gap-4 items-start h-full w-full pl-[14px]'>
            <div className='bg-secondary h-[50px] w-[50px] rounded-full flex-shrink-0' />
            <div className='flex flex-col justify-end w-full gap-2'>
                <textarea className='outline-none w-full resize-none border-b-2 border-[#505050] bg-white py-[2px] poppins-medium' rows={1} placeholder='Add a comment...' />
                <div className='flex flex-row w-full justify-end gap-4'>
                    {/* <button className='poppins-medium text-sm hover:scale-105 hover:duration-200'>cancel</button> */}
                    <button className='flex px-6 py-1 bg-[#DCDCDC] text-white hover:bg-primary hover:scale-105 hover:duration-200 items-center rounded-full poppins-medium text-sm'>comment</button>
                </div>
            </div>
        </div>
    )
}

export default Index