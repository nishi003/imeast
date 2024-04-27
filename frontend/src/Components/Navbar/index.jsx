import React from 'react'
import logo from '../Assets/logo-small.png'

const Index = () => {
    return (
        <div className='flex w-full items-baseline justify-between px-20 py-6'>
            <div className='flex items-baseline gap-2'>
                <div className='h-[34px] w-[10.84px]'>
                    <img src={logo} alt='logo' className='object-cover' />
                </div>
                <p className='text-text text-5xl kalam-bold'>meast</p>
            </div>
            <ul className='text-text flex items-center text-xl font-semibold roboto-bold gap-9'>
                <li className=''>INFORMATION</li>
                <li className=''>MODULES</li>
                <li className=''>ABOUT US</li>
                <li className=''>SIGN UP</li>
            </ul>
        </div>
    )
}

export default Index;