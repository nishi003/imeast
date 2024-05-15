import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../AdminNavbar'

const Index = () => {
    return (
        <div className='flex h-screen flex-row'>
            <AdminNavbar />
            <div className='flex flex-col w-full'>
                <div className='w-full h-[94px] border-b flex justify-end items-center px-9'>
                    <div className='flex flex-row gap-4'>
                        <div className='h-[50px] w-[50px] rounded-full bg-[#9F9F9F]' />
                        <div className='flex flex-col justify-center'>
                            <p className='poppins-medium text-xl'>Admin Account Name</p>
                            <p className='poppins-medium text-sm mt-[-6px] text-[#505050]'>Admin</p>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Index