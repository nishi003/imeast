import React from 'react'
import logo from '../Assets/logo-small.png'
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <header className='sticky top-0 flex w-full items-baseline justify-between px-20 pt-6'>
            <Link to='' className='flex items-baseline lg:gap-2 align-bottom'>
                <img src={logo} alt='logo' className='h-[34px] w-[10.84px]' />
                <p className='text-text text-5xl kalam-bold'>meast</p>
            </Link>
            <div className='text-text flex items-center text-xl font-semibold poppins-bold gap-9'>
                <Link to='' className='hover:scale-105 duration-200'>INFORMATION</Link>
                <Link to='module/list/' className='hover:scale-105 duration-200'>MODULES</Link>
                <Link to='' className='hover:scale-105 duration-200'>ABOUT US</Link>
                <Link to='' className='hover:scale-105 duration-200'>LOG IN</Link>
                <Link to='' className='hover:scale-105 duration-200'>SIGN UP</Link>
            </div>
        </header>
    )
}

export default Index;